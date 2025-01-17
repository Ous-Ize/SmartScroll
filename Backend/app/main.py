'''To run the app use "uvicorn main:app --reload" in the app folder'''
from fastapi import FastAPI
from routes.RESTApiHandler import FlashcardsRoutes, QuizzesRoutes, SummariesRoutes, UsersRoutes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS Middleware for cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize routes
flashcards_routes = FlashcardsRoutes()
summaries_routes = SummariesRoutes()
quizzes_routes = QuizzesRoutes()
users_routes = UsersRoutes()

# Include routers
app.include_router(flashcards_routes.router, prefix="/flashcards")
app.include_router(summaries_routes.router, prefix="/summaries")
app.include_router(quizzes_routes.router, prefix="/quizzes")

@app.get("/")
def read_root():
    return {"message": "Welcome to the SmartScroll Backend API!"}
