import json
from sentence_transformers import SentenceTransformer

with open("data/chunks.json", "r", encoding="utf-8") as file:
    chunks = json.load(file)

model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")

texts = [chunk["text"] for chunk in chunks]

embeddings = model.encode(
    texts,
    batch_size=32,
    show_progress_bar=True
)

for chunk, embedding in zip(chunks, embeddings):
    chunk["embedding"] = embedding.tolist()

with open("data/embedded_chunks.json", "w", encoding="utf-8") as file:
    json.dump(chunks, file, ensure_ascii=False)

print("Embedding dosyası oluşturuldu!")