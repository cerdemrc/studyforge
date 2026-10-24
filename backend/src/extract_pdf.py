import pymupdf
from chunk_text import chunk_text

pdf_path = "data/yapay_zekaya_giris.pdf"

all_chunks = []

with pymupdf.open(pdf_path) as document:
    print(f"Toplam sayfa: {len(document)}")

    for page_number, page in enumerate(document, start=1):
        text = page.get_text()

        chunks = chunk_text(text)

        for chunk in chunks:
            all_chunks.append({
                "page": page_number,
                "text": chunk
            })

print(f"Toplam parça sayısı: {len(all_chunks)}")

for index, chunk in enumerate(all_chunks, start=1):
    print(f"\n--- Parça {index} | Sayfa {chunk['page']} ---")
    print(chunk["text"])