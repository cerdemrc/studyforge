import pymupdf

pdf_path = "data/yapay_zekaya_giris.pdf"

with pymupdf.open(pdf_path) as document:
    print(f"Toplam sayfa: {len(document)}")

    for page_number, page in enumerate(document, start=1):
        text = page.get_text()

        print(f"\n--- Sayfa {page_number} ---")
        print(text)