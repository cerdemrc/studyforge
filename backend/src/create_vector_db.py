import json
import chromadb

client = chromadb.PersistentClient(path="data/chroma_db")

client.delete_collection(name="studyforge")

collection = client.create_collection(
    name="studyforge",
    metadata={"hnsw:space": "cosine"}
)

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

print(f"ChromaDB'de eklenen chunk sayısı: {collection.count()}")


