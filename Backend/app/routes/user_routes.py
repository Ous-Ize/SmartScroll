from fastapi import APIRouter, HTTPException
from database.mongoDBHandler import db
from user_management import User
from user_management import Authenticator

users_collection = db.get_collection("users")

class UserRoutes:
    def __init__(self):
        self.router = APIRouter()
        self.authenticator = Authenticator()
        self.router.post("/register")(self.register)
        self.router.post("/login")(self.login)

    def register(self, user: User):
        """Register a new user."""
        existing_user = users_collection.find_one({"username": user.username})
        if existing_user:
            raise HTTPException(status_code=400, detail="Username already exists")

        hashed_password = self.authenticator.hash_password(user.password)
        users_collection.insert_one({"username": user.username, "password": hashed_password, "email": user.email})
        return {"message": "User registered successfully"}

    def login(self, user: User):
        """Authenticate user login."""
        existing_user = users_collection.find_one({"username": user.username})
        if not existing_user or not self.authenticator.verify_password(user.password, existing_user["password"]):
            raise HTTPException(status_code=401, detail="Invalid username or password")

        return {"message": "Login successful"}
