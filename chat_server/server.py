from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from model.llm import get_model_response
from chat_server.models import Query

app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"])

@app.post("/question")
async def question(query: Query):
    model_response = get_model_response(query.query)
    response = {"query": query.query, "response": model_response}
    return JSONResponse(content=response)

@app.get("/")
async def test():
    return {"message": "Hello"}