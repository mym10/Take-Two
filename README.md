# 🎬 Take Two – Your Personalized Movie Experience

**Take Two** is a full-stack Netflix-inspired movie website built using React and FastAPI. It integrates machine learning to recommend movies based on users’ favourite genres and ratings, all managed with MongoDB. Users can search, play trailers, add favourites, and get tailored movie suggestions in real-time.

---

## 🔧 Tech Stack

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: FastAPI (Python), Uvicorn
- **Database**: MongoDB (via MongoDB Compass)
- **ML**: Scikit-learn for recommender system
- **External API**: OMDb API

---

## 🚀 Features

- 🔐 User authentication (Signup/Login)
- ⭐ Favourites list with movie ratings
- 🎯 Personalized movie recommendations
- 🔍 Smart search by title or genre
- 🎥 Trailer support with interactive modal
- 🌓 Light/Dark mode toggle
- 🧠 ML-powered genre-based recommender system

---

## 🛠️ Installation & Run

### 1. Clone the repo
```bash
git clone https://github.com/your-username/take-two.git
cd take-two
```

### 2. Setup Backend
```bash
cd backend
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
Make sure MongoDB is running locally and OMDb API key is set in your main.py.

### 3. Setup Frontend
```bash
cd ../login-react-app
npm install
npm start
```
The site will be live at http://localhost:3000

## 🤖 Recommender System
- Uses collaborative-style filtering based on genre similarity and user preferences
- Powered by cosine_similarity from scikit-learn
- Dynamically fetches similar movies from OMDb API

Made with ❤️ by Mythri
