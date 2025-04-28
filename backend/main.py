import openai
import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Load .env from the main project folder (explicit path)
dotenv_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../.env"))
load_dotenv(dotenv_path)

# Retrieve API Key
api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    print("⚠️ ERROR: OPENAI_API_KEY is missing! Check .env file location.")
    raise ValueError("⚠️ ERROR: OPENAI_API_KEY is missing! Make sure .env is properly set.")

# Initialize OpenAI Client
client = openai.OpenAI(api_key=api_key)

# Initialize FastAPI App
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://coding-tutor-woad.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Welcome"])
def read_root():
    return {"message": "Welcome to codingTutor API"}

class AskRequest(BaseModel):
    question: str
    language: str

class DebugRequest(BaseModel):
    code: str
    language: str

class ReviewRequest(BaseModel):
    code: str
    language: str

@app.post("/ask", tags=["Tutor"])
def ask_question(request: AskRequest):
    """Handles user coding questions and returns an AI-generated response."""
    try:
        system_prompt = f"You are a helpful coding tutor who specializes in {request.language}."
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.question}
            ]
        )
        return {"response": response.choices[0].message.content}

    except openai.OpenAIError as e:
        raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")

@app.post("/debug", tags=["Tutor"])
def debug_code(request: DebugRequest):
    try:
        system_prompt = (
            f"You are an expert software developer with deep knowledge of {request.language}. "
            "Analyze the user's code, identify bugs or logic issues, and return a corrected version along with a clear explanation."
        )
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Here is my broken {request.language} code:\n\n{request.code}"}
            ]
        )
        return {"response": response.choices[0].message.content}

    except openai.OpenAIError as e:
        raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")

@app.post("/review", tags=["Tutor"])
def review_code(request: ReviewRequest):
    try:
        system_prompt = (
            f"You are a senior software engineer who reviews {request.language} code for readability, maintainability, and best practices. "
            "Review the user's code and offer helpful, actionable suggestions without changing the code's functionality."
        )
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Please review the following {request.language} code:\n\n{request.code}"}
            ]
        )
        return {"response": response.choices[0].message.content}

    except openai.OpenAIError as e:
        raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
