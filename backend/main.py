from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
import shutil
import requests

app = FastAPI()   # ✅ THIS MUST COME FIRST
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend working"}

# Upload from file
@app.post("/upload/")
async def upload(file: UploadFile = File(...)):
    with open("cloth.jpg", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"message": "File uploaded"}

# Upload from link
@app.post("/upload-link/")
async def upload_link(data: dict):
    url = data["url"]

    img = requests.get(url).content

    with open("cloth.jpg", "wb") as f:
        f.write(img)

    return {"message": "Image downloaded"}