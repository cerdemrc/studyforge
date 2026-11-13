import json
import pymupdf

from src.chunk_text import chunk_text

def extract_pdf(pdf_path: str, output_path: str = "data/chunks.json"):
    all_chunks = []

    with pymupdf.open(pdf_path) as document:
        for page_number, page in enumerate(document, start=1):
            text = page.get_text()
            chunks = chunk_text(text)

            for chunk in chunks:
                all_chunks.append({
                    "page": page_number,
                    "text": chunk
                })

    with open(output_path, "w", encoding="utf-8") as file:
        json.dump(all_chunks, file, ensure_ascii=False, indent=2)

    return all_chunks
