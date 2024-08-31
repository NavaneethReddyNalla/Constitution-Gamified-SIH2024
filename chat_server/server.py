from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()

@app.post("/question")
async def question():
    pass

@app.get("/")
async def test():
    return {"message": "Hello"}