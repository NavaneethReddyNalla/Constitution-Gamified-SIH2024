import fitz
import re

v_start, v_end = 57, 100
vi_start, vi_end = 101, 141


def extract_pages(document, start, end):
    text = ""
    
    for page_number in range(start - 1, end):
        page = document.load_page(page_number)
        text += page.get_text() + "\n"
    
    return text


def clean_text(text):
    # text = re.sub(r'\d+\s+PART\s+[V|VI]\s+[A-Z\s]+', '\n', text)
    text = re.sub(r'_{5,}', '', text)
    # text = re.sub(r'\s+', ' ', text)
    # text = "\n".join(line.strip() for line in text.splitlines())

    return text



if __name__ == "__main__":
    pdf_path = "constitution/constitution.pdf"
    pdf_file = fitz.open(pdf_path)
    part_v = extract_pages(pdf_file, v_start, v_end)
    part_vi = extract_pages(pdf_file, vi_start, vi_end)

    extracted_constitution = part_v + "\n" + part_vi
    cleaned_extract = clean_text(extracted_constitution)

    save_path = "constitution/extracted.txt"
    with open(save_path, "w", encoding="utf-8") as file:
        file.write(cleaned_extract)
    print("Extraction complete")
