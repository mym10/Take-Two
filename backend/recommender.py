from pymongo import MongoClient
from collections import defaultdict
import requests
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Setup MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["users"]
favourites_collection = db["favourites"]

OMDB_API_KEY = "592e86cd"

def build_genre_profile(favorites):
    genre_weights = defaultdict(float)
    for movie in favorites:
        genres = [g.strip() for g in movie["genre"].split(",")]
        rating = movie["rating"]
        for g in genres:
            genre_weights[g] += rating
    return genre_weights

def genre_profile_to_vector(profile, all_genres):
    return [profile.get(g, 0) for g in all_genres]

def fetch_movies_by_genre_from_omdb(genres, max_per_genre=3):
    movie_list = []
    seen_titles = set()
    for genre in genres:
        for i in range(max_per_genre):
            response = requests.get(
                f"http://www.omdbapi.com/?s={genre}&type=movie&page={i+1}&apikey={OMDB_API_KEY}"
            )
            data = response.json()
            if data.get("Response") == "True":
                for movie in data["Search"]:
                    if movie["Title"] not in seen_titles:
                        movie_list.append({
                            "imdb_id": movie["imdbID"],
                            "title": movie["Title"],
                            "genre": genre,  # Placeholder until more info is fetched
                        })
                        seen_titles.add(movie["Title"])
    return movie_list

def fetch_movie_details(imdb_id):
    url = f"http://www.omdbapi.com/?i={imdb_id}&apikey={OMDB_API_KEY}"
    response = requests.get(url)
    return response.json() if response.status_code == 200 else None


def recommend_movies_for_user(username, top_n=5):
    # Fetch user favorites
    user_doc = favourites_collection.find_one({"username": username})
    if not user_doc:
        return []

    favorites = user_doc.get("favorites", [])
    genre_profile = build_genre_profile(favorites)

    all_genres = sorted(set(g for movie in favorites for g in movie["genre"].split(",")))
    user_vector = np.array(genre_profile_to_vector(genre_profile, all_genres)).reshape(1, -1)

    # Fetch candidate movies
    candidate_movies = fetch_movies_by_genre_from_omdb(all_genres)

    recs = []
    for movie in candidate_movies:
        movie_genres = {g: 1 for g in movie["genre"].split(",") if g in all_genres}
        movie_vector = np.array(genre_profile_to_vector(movie_genres, all_genres)).reshape(1, -1)
        sim = cosine_similarity(user_vector, movie_vector)[0][0]
        movie["similarity"] = sim
        if movie["imdb_id"] not in [fav["imdb_id"] for fav in favorites]:
            full_movie = fetch_movie_details(movie["imdb_id"])
            if full_movie and full_movie.get("Response") == "True":
                full_movie["similarity"] = sim
                recs.append(full_movie)

    recs = sorted(recs, key=lambda x: x["similarity"], reverse=True)
    return recs[:top_n]

# recommended = recommend_movies_for_user("alex")
# for movie in recommended:
#     print(movie["title"], "-", movie["similarity"])
