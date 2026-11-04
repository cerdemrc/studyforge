import json
from sentence_transformers import SentenceTransformer
from sentence_transformers.util import cos_sim

model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")

with open("data/embedded_chunks.json", "r", encoding="utf-8") as file:
    chunks = json.load(file)

def search_chunks(query, top_k=5, threshold=0.5):
    query_embedding = model.encode(query)

    chunk_embeddings = [chunk["embedding"] for chunk in chunks]

    similarities = cos_sim(query_embedding, chunk_embeddings)[0]

    top_results = similarities.argsort(descending=True)[:top_k]

    results = []

    for index in top_results:
        score = similarities[index].item()

        if score >= threshold:
            chunk = chunks[index]

            results.append({
                "page": chunk["page"],
                "text": chunk["text"],
                "similarity": score
            })

    return results