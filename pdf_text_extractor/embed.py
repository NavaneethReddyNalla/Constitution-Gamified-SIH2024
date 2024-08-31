import numpy as np
import faiss
import json
from sentence_transformers import SentenceTransformer


def generate_embeddings(texts):
    embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
    embeddings = embedding_model.encode(texts, show_progress_bar=True)

    return embeddings


def create_and_save_index(embeddings: np.ndarray, save_path):
    dimension = embeddings.shape[1]
    faiss_index = faiss.IndexFlatL2(dimension)
    faiss_index.add(embeddings)
    faiss.write_index(faiss_index, save_path)


def save_metadata(texts):
    metadata = []
    for i, text in enumerate(texts):
        # Example: Extract the first few words as a section title or use other heuristics
        section_title = text.split('\n')[0] if '\n' in text else f"Section {i+1}"
        metadata.append({"section_title": section_title, "part": "V or VI", "index": i})

    # Save metadata alongside the embeddings
    with open("constitution/constitution_metadata.json", "w", encoding="utf-8") as meta_file:
        json.dump(metadata, meta_file, ensure_ascii=False, indent=4)


def preprocess(texts):
    texts = texts.split("\n")
    texts = [text for text in texts if len(text) > 5]

    return texts


if __name__ == "__main__":
    text_path = "constitution/extracted.txt"

    with open(text_path, "r", encoding="utf-8") as file:
        texts = file.read()
    
    texts = preprocess(texts)
    embeddings = generate_embeddings(texts)

    embeddings_path = "constitution/embeddings.npy"
    np.save(embeddings_path, embeddings)
    texts_path = "constitution/constitution_texts.txt"
    with open(text_path, "w", encoding="utf-8") as file:
        file.write("\n".join(texts))

    print("Embeddings are saved.")
    
    index_path = "constitution/constitution.index"
    create_and_save_index(embeddings, index_path)
    print("Index is created and saved successfully.")

    save_metadata(texts)
    print("Metadata storage complete.")
