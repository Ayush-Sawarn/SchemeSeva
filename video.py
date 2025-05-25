import boto3
import subprocess
import os
import re
import tempfile
import logging
from symspellpy.symspellpy import SymSpell, Verbosity
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from botocore.exceptions import ClientError

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize S3 client with error handling
try:
    s3 = boto3.client('s3')
    # Test S3 connection
    s3.list_buckets()
    logger.info("Successfully connected to S3")
except Exception as e:
    logger.error(f"Failed to initialize S3 client: {str(e)}")
    raise

# Spelling correction setup
sym_spell = SymSpell(max_dictionary_edit_distance=2, prefix_length=7)
dictionary_path = "frequency_dictionary_en_82_765.txt"
sym_spell.load_dictionary(dictionary_path, term_index=0, count_index=1)

# Scheme code and keywords
scheme_keywords = {
    "JSKKBY": [
        "jal", "bal", "rainwater", "harvesting", "solar pump", "lift", "irrigation", "tribal", "stored water"
    ],
    "HIMUY": [
        "unnati", "micro-enterprise", "skill", "tailoring", "carpentry", "sc", "bpl", "training", "income", "livelihood"
    ],
    "MPY": [
        "medha", "Medha Prostahan Yojana", "prostahan", "coaching", "neet", "jee", "nda", "upsc", "financial aid",
        "meritorious", "graduate", "10+2", "science", "commerce", "arts", "bonafide himachal",
        "professional exam", "government exam", "online coaching", "offline coaching", "1 lakh",
        "pariksha", "shiksha"
    ],
    "AIF": [
        "aif", "Agricultural Infrastructure Fund", "agricultural infrastructure", "farm-gate infrastructure",
        "post-harvest", "construction", "machinery purchase", "loan", "interest subsidy", "3% subsidy", "modern agriculture",
        "project contribution", "APMC", "PACS", "FPO", "SHG", "PMU", "moratorium", "loan tenure", "agriinfra.dac.gov.in",
        "krishi avsanrachna", "rin", "byaj subsidy", "prasanskaran", "pariyojana lagat", "aavedan portal", "rin maaf",
        "kheti", "anudan", "lagat", "krishi", "krishak", "modernize", "50 lakh", "2 crore"
    ],
    "PKKKY": [
        "PKKKY", "Prakritik Kheti Khushhal Kisan Yojana", "prakritik", "natural", "natural farming", "zero-budget farming",
        "zero-budget", "cow dung", "cow urine", "organic", "non-chemical", "desi cow", "cattle shed", "₹25000 subsidy",
        "₹8000 support", "climate resilient", "SC/ST", "women farmers", "cooperative groups",
        "naturalfarming.hp.gov.in", "prakritik kheti", "gaumutra", "gay ka gobar", "zero budget kheti", "desi gay",
        "jaivik kheti", "krishak samuha", "mahila kisan", "beej", "krishi", "yojana", "environment"
    ],
    "FIS": [
        "flow", "Flow Irrigation Scheme", "irrigation", "bore well", "borewell", "shallow well", "HP terrain",
        "sloped", "dry", "remote", "hilly area", "50% subsidy", "100% subsidy", "marginal farmer", "multiple cropping",
        "water", "water use efficiency", "land ownership", "water User Associations", "agriculture department",
        "himachalforms.nic.in", "sinchai yojana", "koop nirmaan", "chhote kisan", "jal upyog dakshata",
        "parvatiya kshetra", "bhumi swamitva", "kheti", "krishi", "anudan", "krishak", "yojana", "subsidy", "terrain"
    ],
    "RKPY": [
        "RKPY", "Rajya Krishi Yantrikaran Programme", "yantrikaran", "mechanization", "farm machinery", "equipment",
        "power tiller", "weeder", "custom hiring centre", "CHC", "40% subsidy", "80% subsidy", "modern equipment",
        "FPO", "cooperative", "Block Agriculture Office", "machine purchase", "himachalforms.nic.in",
        "krishi yantra", "custom hiring", "aadhunik upkaran", "chhote kisan", "sahkari samiti",
        "rajya krishi yantrikaran", "kheti", "yojana", "krishi", "anudan", "krishak", "tiller", "tools", "subsidy"
    ]
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
    
    # Return AIF as default if no scheme matches
    return "AIF"

def download_videos(scheme_code):
    stages = [
        ('DESCRIPTION', '3description3'),
        ('BENEFITS', '3benefits3'),
        ('ELIGIBILITY', '3eligibility3')
    ]
    local_paths = []
    for stage, bucket in stages:
        try:
            key = f"{scheme_code}_{stage}.mp4"
            path = os.path.join(tempfile.gettempdir(), key)
            logger.info(f"Downloading {key} from bucket {bucket}")
            s3.download_file(bucket, key, path)
            if not os.path.exists(path):
                raise FileNotFoundError(f"Failed to download {key}")
            local_paths.append(path)
            logger.info(f"Successfully downloaded {key}")
        except ClientError as e:
            logger.error(f"AWS S3 error downloading {key}: {str(e)}")
            raise
        except Exception as e:
            logger.error(f"Error downloading {key}: {str(e)}")
            raise
    return local_paths

def merge_videos(paths, output_path):
    try:
        list_path = os.path.join(tempfile.gettempdir(), "input_list.txt")
        with open(list_path, "w") as f:
            for path in paths:
                safe_path = path.replace('\\', '/')
                f.write(f"file '{safe_path}'\n")

        ffmpeg_path = "ffmpeg"
        logger.info("Starting video merge process")
        result = subprocess.run([
            ffmpeg_path, "-y", "-f", "concat", "-safe", "0", "-i", list_path,
            "-c:v", "libx264", "-preset", "ultrafast", "-crf", "23", output_path
        ], capture_output=True, text=True, check=True)
        logger.info("Video merge completed successfully")
    except subprocess.CalledProcessError as e:
        logger.error(f"FFmpeg error: {e.stderr}")
        raise
    except Exception as e:
        logger.error(f"Error during video merge: {str(e)}")
        raise

def upload_final(scheme_code, output_path):
    try:
        if not os.path.exists(output_path):
            raise FileNotFoundError(f"Output video file not found at {output_path}")
            
        logger.info(f"Uploading final video for scheme {scheme_code}")
        s3.upload_file(
            output_path,
            "3final3",
            f"{scheme_code}_final.mp4",
            ExtraArgs={'ACL': 'public-read'}
        )
        url = f"https://3final3.s3.eu-north-1.amazonaws.com/{scheme_code}_final.mp4"
        logger.info(f"Successfully uploaded video. URL: {url}")
        return url
    except ClientError as e:
        logger.error(f"AWS S3 error uploading final video: {str(e)}")
        raise
    except Exception as e:
        logger.error(f"Error uploading final video: {str(e)}")
        raise

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
            
        logger.info(f"Processing request for input: {user_input}")
        scheme_code = identify_scheme(user_input)
        if not scheme_code:
            return JSONResponse({"error": "Could not match a scheme to your input"}, status_code=404)
            
        logger.info(f"Identified scheme code: {scheme_code}")
        input_files = download_videos(scheme_code)
        final_output = os.path.join(tempfile.gettempdir(), f"{scheme_code}_final.mp4")
        merge_videos(input_files, final_output)
        s3_url = upload_final(scheme_code, final_output)
        
        return JSONResponse({
            "message": f"Final video for {scheme_code} uploaded successfully",
            "s3_url": s3_url
        })
    except subprocess.CalledProcessError as e:
        logger.error(f"FFmpeg failed: {str(e)}")
        return JSONResponse({"error": f"Video processing failed: {str(e)}"}, status_code=500)
    except ClientError as e:
        logger.error(f"AWS S3 error: {str(e)}")
        return JSONResponse({"error": f"Storage service error: {str(e)}"}, status_code=500)
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return JSONResponse({"error": str(e)}, status_code=500)

# Uncomment below to run locally for testing
if __name__ == "__main__":
     uvicorn.run(app, host="0.0.0.0", port=8000)