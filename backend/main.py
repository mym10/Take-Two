from pymongo import MongoClient
from fastapi import FastAPI
import requests
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import HTTPException
from fastapi import Request
from recommender import recommend_movies_for_user

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace with your frontend origin in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Setup MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["users"]
users = db["user_details"]
favourites_collection = db["favourites"]

class SignupRequest(BaseModel):
    username: str
    email: str
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str

API_KEY = "592e86cd"

@app.get("/movie/{title}")
def get_movie(title: str):
    url = f"http://www.omdbapi.com/?t={title}&apikey={API_KEY}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Movie not found or API error"}
    
@app.post("/signup")
def signup(data: SignupRequest):
    if users.find_one({"username": data.username}):
        raise HTTPException(status_code=400, detail="Username already exists")
    
    users.insert_one({
        "username": data.username,
        "email": data.email,
        "password": data.password
    })
    return {"message": "User created successfully"}

@app.post("/login")
def login(data: LoginRequest):
    user = users.find_one({
        "username": data.username,
        "password": data.password
    })
    if user:
        return {
            "message": "Login successful",
            "user": {
                "username": user["username"],
                "email": user["email"]
            }
        }
    else:
        return {"error": "Invalid username or password"}
    
@app.get("/recommendations/{username}")
def recommend_movies(username: str):
    recommendations = recommend_movies_for_user(username)
    return {"recommended_movies": recommendations}

@app.get("/favourites/{username}")
def get_favourites(username: str):
    user_doc = favourites_collection.find_one({"username": username})
    if user_doc and "favorites" in user_doc:
        return {"favourites": user_doc["favorites"]}
    return {"favourites": []}
