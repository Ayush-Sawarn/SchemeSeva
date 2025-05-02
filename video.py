import boto3
import subprocess
import os
import re
import tempfile
from symspellpy.symspellpy import SymSpell, Verbosity

s3 = boto3.client('s3')

# Spelling correction setup
sym_spell = SymSpell(max_dictionary_edit_distance=2, prefix_length=7)
dictionary_path = "frequency_dictionary_en_82_765.txt"
sym_spell.load_dictionary(dictionary_path, term_index=0, count_index=1)

# Scheme code and keywords
scheme_keywords = {
    "AIF": ["aif", "agricultural infrastructure", "post-harvest", "loan", "machine", "modernize", "50 lakh", "2 crore"],
    "PKKKY": ["prakritik", "natural", "zero-budget", "organic", "cow dung", "cow urine", "non-chemical", "environment"],
    "FIS": ["flow", "irrigation", "borewell", "sloped", "dry", "remote", "water", "subsidy", "terrain"],
    "RKPY": ["yantrikaran", "mechanization", "machine", "tiller", "modern equipment", "custom hiring", "subsidy", "tools"],
    "JSKKBY": ["jal", "bal", "rainwater", "harvesting", "solar pump", "lift", "irrigation", "tribal", "stored water"],
    "HIMUY": ["unnati", "micro-enterprise", "skill", "tailoring", "carpentry", "sc", "bpl", "training", "income", "livelihood"]
}

STOPWORDS = set(["and", "the", "for", "in", "of", "a", "to", "or", "on", "at", "with", "by", "from"])

def correct_text(text):
    suggestions = sym_spell.lookup_compound(text, max_edit_distance=2)
    return suggestions[0].term if suggestions else text

def identify_scheme(user_input):
    corrected = correct_text(user_input.lower())
    tokens = re.findall(r'\b\w+\b', corrected)
    filtered_tokens = [token for token in tokens if token not in STOPWORDS]

    for scheme, keywords in scheme_keywords.items():
        for kw in keywords:
            kw_tokens = re.findall(r'\b\w+\b', kw.lower())
            if all(token in filtered_tokens for token in kw_tokens):
                return scheme
    return None

def download_videos(scheme_code):
    stages = [
        ('DESCRIPTION', '3description3'),
        ('BENEFITS', '3benefits3'),
        ('ELIGIBILITY', '3eligibility3')
    ]
    local_paths = []
    for stage, bucket in stages:
        key = f"{scheme_code}_{stage}.mp4"
        path = os.path.join(tempfile.gettempdir(), key)
        s3.download_file(bucket, key, path)
        local_paths.append(path)
    return local_paths

def merge_videos(paths, output_path):
    list_path = os.path.join(tempfile.gettempdir(), "input_list.txt")
    with open(list_path, "w") as f:
        for path in paths:
            safe_path = path.replace('\\', '/')
            f.write(f"file '{safe_path}'\n")

    ffmpeg_path = "ffmpeg"
    subprocess.run([
        ffmpeg_path, "-f", "concat", "-safe", "0", "-i", list_path,
        "-c:v", "libx264", "-preset", "ultrafast", "-crf", "23", output_path
    ], check=True)

def upload_final(scheme_code, output_path):
    s3.upload_file(output_path, "3final3", f"{scheme_code}_final.mp4")

if __name__ == "__main__":
    try:
        user_input = input("Enter your message about the scheme: ")
        if not user_input.strip():
            print({"error": "Missing user input"})
        else:
            scheme_code = identify_scheme(user_input)
            if not scheme_code:
                print({"error": "Could not match a scheme to your input"})
            else:
                print(f"Identified Scheme: {scheme_code}")  # <--- Display the selected scheme
                input_files = download_videos(scheme_code)
                final_output = os.path.join(tempfile.gettempdir(), f"{scheme_code}_final.mp4")
                merge_videos(input_files, final_output)
                upload_final(scheme_code, final_output)
                print({
                    "message": f"Final video for {scheme_code} uploaded successfully",
                    "s3_url": f"s3://3final3/{scheme_code}_final.mp4"
                })
    except subprocess.CalledProcessError as e:
        print({"error": f"FFmpeg failed: {e}"})
    except Exception as e:
        print({"error": str(e)})