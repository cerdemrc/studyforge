
import json
from sentence_transformers import SentenceTransformer


def create_embeddings(
    input_path: str = "data/chunks.json",
    output_path: str = "data/embedded_chunks.json"
):
    with open(input_path, "r", encoding="utf-8") as file:
        chunks = json.load(file)

    if not chunks:
        raise ValueError("PDF içerisinde işlenecek metin bulunamadı.")

    model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")

    texts = [chunk["text"] for chunk in chunks]

    embeddings = model.encode(
        texts,
        batch_size=32,
        show_progress_bar=False
    )

    for chunk, embedding in zip(chunks, embeddings):
        chunk["embedding"] = embedding.tolist()

    with open(output_path, "w", encoding="utf-8") as file:
        json.dump(chunks, file, ensure_ascii=False)

    return chunks
