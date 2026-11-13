
import ollama
import random
import json


def generate_questions(
    input_path: str = "data/embedded_chunks.json",
    output_path: str = "data/generated_questions.json",
    question_count: int = 5
):
    with open(input_path, "r", encoding="utf-8") as file:
        chunks = json.load(file)

    if not chunks:
        raise ValueError("Soru üretmek için yeterli kaynak bulunamadı.")

    selected_chunks = random.sample(
        chunks,
        min(question_count, len(chunks))
    )

    questions = []

    for selected_chunk in selected_chunks:
        context = f"""
        Sayfa {selected_chunk['page']}:
        {selected_chunk['text']}
        """

        response = ollama.chat(
            model="qwen2.5:7b",
            format="json",
            messages=[
                {
                    "role": "system",
                    "content": """
                    Sen bir sınav hazırlama asistanısın.
                    Yalnızca verilen kaynak metinleri kullanarak soru üret.
                    Kaynakta bulunmayan hiçbir bilgiyi kullanma.
                    Bir adet çoktan seçmeli soru oluştur.
                    4 seçenek sun ve yalnızca bir doğru cevap olsun.
                    """
                },
                {
                    "role": "user",
                    "content": f"""
                    Kaynak metinler:

                    {context}

                    Bu kaynaklara dayanarak bir soru oluştur.

                    Çıktıyı şu JSON yapısında ver:
                    {{
                        "question": "Soru metni",
                        "options": {{
                            "A": "Seçenek",
                            "B": "Seçenek",
                            "C": "Seçenek",
                            "D": "Seçenek"
                        }},
                        "correct_answer": "A",
                        "explanation": "Doğru cevabın açıklaması",
                        "source_pages": [{selected_chunk['page']}]
                    }}
                    """
                }
            ]
        )

        questions.append(
            json.loads(response["message"]["content"])
        )

    with open(output_path, "w", encoding="utf-8") as file:
        json.dump(questions, file, ensure_ascii=False, indent=4)

    return questions
