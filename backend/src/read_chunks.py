import json

with open("data/chunks.json", "r", encoding="utf-8") as file:
    chunks = json.load(file)

print(f"Toplam parça: {len(chunks)}")

for chunk in chunks[:3]:
    print(f"\nSayfa: {chunk['page']}")
    print(f"Metin: {chunk['text']}")