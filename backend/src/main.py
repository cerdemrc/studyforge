
import json
import os

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from src.extract_pdf import extract_pdf
from src.create_embeddings import create_embeddings
from src.generate_question import generate_questions

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/questions")
def get_questions():
    with open("data/generated_questions.json", "r", encoding="utf-8") as file:
        questions = json.load(file)

    return questions


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Sadece PDF dosyaları yüklenebilir."
        )

    os.makedirs("data/uploads", exist_ok=True)

    file_path = os.path.join("data/uploads", "sample.pdf")

    content = await file.read()

    if not content.startswith(b"%PDF"):
        raise HTTPException(
            status_code=400,
            detail="Geçerli bir PDF dosyası yükleyin."
        )

    with open(file_path, "wb") as pdf_file:
        pdf_file.write(content)

    try:
        extract_pdf(file_path)
        create_embeddings()
        questions = generate_questions()

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"PDF işlenirken hata oluştu: {str(error)}"
        )

    return {
        "message": "PDF başarıyla yüklendi ve sorular oluşturuldu.",
        "question_count": len(questions)
    }
