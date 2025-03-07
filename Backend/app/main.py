'''To run the backend app use "uvicorn main:app --reload" in the app folder. the app will run on http://127.0.0.1:8000
'''
from fastapi import FastAPI
from routes.RESTApiHandler import FlashcardsRoutes, QuizzesRoutes, SummariesRoutes, ExtraRoutes
from routes.user_routes import UserRoutes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS Middleware for cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize routes
flashcards_routes = FlashcardsRoutes()
summaries_routes = SummariesRoutes()
quizzes_routes = QuizzesRoutes()
user_routes = UserRoutes()
extra_routes = ExtraRoutes()


# Include routers
app.include_router(flashcards_routes.router, prefix="/flashcards")
app.include_router(summaries_routes.router, prefix="/summaries")
app.include_router(quizzes_routes.router, prefix="/quizzes")
app.include_router(extra_routes.router) # /newsfeed und /upload-pdf
app.include_router(user_routes.router) # /register und /login

@app.get("/")
def read_root():
    return {"message": "Welcome to the SmartScroll Backend API!"}
