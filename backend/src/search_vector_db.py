import chromadb
from sentence_transformers import SentenceTransformer

client = chromadb.PersistentClient(path="data/chroma_db")
collection = client.get_collection(name="studyforge")

model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")

query = "Makine öğrenmesi nedir?"

query_embedding = model.encode(query).tolist()

results = collection.query(
    query_embeddings=[query_embedding],
    n_results=5
)

for i in range(len(results["ids"][0])):
    print(f"\nBenzerlik: {1 - results['distances'][0][i]:.4f}")
    print(f"Sayfa: {results['metadatas'][0][i]['page']}")
    print(f"Metin: {results['documents'][0][i]}")