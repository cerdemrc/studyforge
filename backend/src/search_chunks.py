import json
from sentence_transformers import SentenceTransformer
from sentence_transformers.util import cos_sim

model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")

with open("data/embedded_chunks.json", "r", encoding="utf-8") as file:
    chunks = json.load(file)

query = "Yapay zeka nedir?"

query_embedding = model.encode(query)

chunk_embeddings = [chunk["embedding"] for chunk in chunks]

similarities = cos_sim(query_embedding, chunk_embeddings)[0]

top_results = similarities.argsort(descending=True)[:5]

result_count = 0

for index in top_results:
    score = similarities[index].item()

    if score < 0.50:
        continue

    chunk = chunks[index]
    result_count += 1

    print(f"\nBenzerlik: {score:.4f}")

if result_count == 0:
    print("Bu soruyu cevaplayacak yeterli kaynak bulunamadı.")