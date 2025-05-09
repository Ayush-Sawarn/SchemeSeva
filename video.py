import boto3
import subprocess
import os
import re
import tempfile
from symspellpy.symspellpy import SymSpell, Verbosity
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

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
    s3.upload_file(
        output_path,
        "3final3",
        f"{scheme_code}_final.mp4",
        ExtraArgs={'ACL': 'public-read'}
    )
    url = f"https://3final3.s3.eu-north-1.amazonaws.com/{scheme_code}_final.mp4"
    print(f"Uploaded video URL: {url}")
    return url

# FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify ["http://localhost:8081"] for more security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate-video")
async def generate_video(request: Request):
    try:
        data = await request.json()
        user_input = data.get("user_input")
        if not user_input or not user_input.strip():
            return JSONResponse({"error": "Missing user input"}, status_code=400)
        scheme_code = identify_scheme(user_input)
        if not scheme_code:
            return JSONResponse({"error": "Could not match a scheme to your input"}, status_code=404)
        input_files = download_videos(scheme_code)
        final_output = os.path.join(tempfile.gettempdir(), f"{scheme_code}_final.mp4")
        merge_videos(input_files, final_output)
        s3_url = upload_final(scheme_code, final_output)
        return JSONResponse({
            "message": f"Final video for {scheme_code} uploaded successfully",
            "s3_url": s3_url
        })
    except subprocess.CalledProcessError as e:
        return JSONResponse({"error": f"FFmpeg failed: {e}"}, status_code=500)
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

# Uncomment below to run locally for testing
if __name__ == "__main__":
     uvicorn.run(app, host="0.0.0.0", port=8000)