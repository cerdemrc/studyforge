import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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