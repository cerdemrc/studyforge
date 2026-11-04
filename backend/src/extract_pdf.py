import json
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

output_path = "data/chunks.json"

with open(output_path, "w", encoding="utf-8") as file:
    json.dump(all_chunks, file, ensure_ascii=False, indent=2)

print(f"Toplam parça: {len(all_chunks)}")
print(f"JSON dosyası oluşturuldu: {output_path}")