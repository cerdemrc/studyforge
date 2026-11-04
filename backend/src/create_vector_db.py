import json
import chromadb

client = chromadb.PersistentClient(path="data/chroma_db")

collection = client.get_or_create_collection(name="studyforge")

with open("data/embedded_chunks.json", "r", encoding="utf-8") as file:
    chunks = json.load(file)

collection.add(
    ids=[str(index) for index in range(len(chunks))],
    embeddings=[chunk["embedding"] for chunk in chunks],
    documents=[chunk["text"] for chunk in chunks],
    metadatas=[
        {"page": chunk["page"]}
        for chunk in chunks
    ]
)

print(f"ChromaDB'ye eklenen chunk sayısı: {collection.count()}")