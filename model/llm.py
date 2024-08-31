import faiss
import json
import numpy as np
from langchain_ollama import OllamaLLM
# from langchain.prompts import PromptTemplate
from langchain_core.prompts import PromptTemplate
from sentence_transformers import SentenceTransformer
from time import sleep


index_path = "constitution/constitution.index"
constitution_index = faiss.read_index(index_path)

embedding_path = "constitution/embeddings.npy"
embeddings = np.load(embedding_path)

texts_path = "constitution/extracted.txt"
with open(texts_path, 'r', encoding='utf-8') as file:
    texts = file.read().splitlines()

metadata_path = "constitution/constitution_metadata.json"
with open(metadata_path, 'r', encoding='utf-8') as file:
    metadata = json.load(file)

model = OllamaLLM(model="llama3.1", temperature=0.7, model_kwargs={"n_gpu_layers": 1})
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")


template = """
    You are a legal expert on the Indian Constitution. Based on the relevant sections provided below:

    {context}

    Question: {query}

    In case the sections provided above aren't relevant to the query or you find there is a mix up, don't include that part in your final answer.
    Your final answer should only include the answer to the question.
    
    Answer in a simplified manner:
    """

prompt = PromptTemplate.from_template(template)
# model_prompt = prompt.invoke({"context": context, "query": query})

rag_chain = prompt | model


def retrieve_relevant_chunks(query, top_k=5):
    query_embedding = embedding_model.encode(query).reshape(1, -1)
    distances, indices = constitution_index.search(query_embedding, top_k)
    relevant_chunks = [(texts[i], metadata[i], distances[0][j]) for j, i in enumerate(indices[0])]
    
    return relevant_chunks


def get_model_response(query):
    relevant_chunks = retrieve_relevant_chunks(query)
    context = ""
    for chunk, meta, dist in relevant_chunks:
        context += f"{meta['section_title']}\n"
        # context += f"Section: {meta['section_title']}, Distance: {dist}\n"
        context += chunk + "\n"
        context += ("-" * 50) + "\n"

    return rag_chain.invoke({"context": context, "query": query})


if __name__ == "__main__":
    query = "How is the president of India elected?"

    relevant_chunks = retrieve_relevant_chunks(query)
    context = ""
    for chunk, meta, dist in relevant_chunks:
        context += f"Section: {meta['section_title']}\n"
        # context += f"Section: {meta['section_title']}, Distance: {dist}\n"
        context += chunk + "\n"
        context += ("-" * 50) + "\n"

    # response = rag_chain.invoke({"context": context, "query": query})
    # print(response)

    print("MODEL RESPONSE:")
    for r in rag_chain.stream({"context": context, "query": query}):
        print(r, end="")
