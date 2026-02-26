import pdfplumber
from io import BytesIO


def extract_text_from_pdf(pdf_bytes) -> str:
    text_chunks = []

    with pdfplumber.open(BytesIO(pdf_bytes)) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text_chunks.append(page_text)

    text = "\n".join(text_chunks).strip()

    if not text:
        raise ValueError("No extractable text found in PDF. Note: Scanned images/OCRs are not currently supported.")

    return text
