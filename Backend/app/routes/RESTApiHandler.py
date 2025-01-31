from fastapi import APIRouter, HTTPException, Query, UploadFile, File
from database.mongoDBHandler import db  # MongoDBHandler instance
from typing import Optional
import random
import os
import shutil
from config import config


class BaseRoutes:
    def __init__(self, collection_name, db_handler):
        self.router = APIRouter()
        self.collection_name = collection_name
        self.db_handler = db_handler
        self.setup_routes()

    def setup_routes(self):
        @self.router.get("/", tags=[self.collection_name.capitalize()])
        async def get_all(source: Optional[str] = Query(None), category: Optional[str] = Query(None)):
            """
            Fetch all documents or filter by source/category.
            """
            filter_query = {}
            if source:
                filter_query["source"] = source
            if category:
                filter_query["category"] = category
            
            # Example : /flashcards/?category=math or /summaries?source=/home/user/docs/example.pdf
            
            try:
                documents = list(self.db_handler.find_documents(self.collection_name, filter_query))
                return [{"_id": str(doc["_id"]), **doc} for doc in documents]
            except Exception as e:
                raise HTTPException(status_code=500, detail=str(e))

        @self.router.post("/", tags=[self.collection_name.capitalize()])
        async def create_document(document: dict):
            """Create a new document."""
            if self.collection_name == "flashcards":
                self.db_handler.insert_flashcard(document)
            elif self.collection_name == "summaries":
                self.db_handler.insert_summary(document)
            elif self.collection_name == "quizzes":
                self.db_handler.insert_quiz(document)
            elif self.collection_name == "users":
                self.db_handler.insert_user(document)
            else:
                raise HTTPException(status_code=400, detail="Unknown collection")
            return {"message": f"{self.collection_name.capitalize()} created successfully."}

        @self.router.put("/", tags=[self.collection_name.capitalize()])
        async def update_documents(filter: dict, update: dict):
            """Update documents based on a filter."""
            if self.collection_name == "flashcards":
                self.db_handler.update_flashcards(filter, update)
            elif self.collection_name == "summaries":
                self.db_handler.update_summaries(filter, update)
            elif self.collection_name == "quizzes":
                self.db_handler.update_quizzes(filter, update)
            elif self.collection_name == "users":
                self.db_handler.update_users(filter, update)
            else:
                raise HTTPException(status_code=400, detail="Unknown collection")
            return {"message": f"{self.collection_name.capitalize()} updated successfully."}

        @self.router.delete("/", tags=[self.collection_name.capitalize()])
        async def delete_documents(filter: dict):
            """Delete documents based on a filter."""
            self.db_handler.delete_document(self.collection_name, filter)
            return {"message": f"{self.collection_name.capitalize()} deleted successfully."}



class ExtraRoutes:
    def __init__(self):
        self.router = APIRouter()
        self.setup_routes()

    def setup_routes(self):
        @self.router.get("/newsfeed", tags=["Newsfeed"])
        async def get_random_content():
            """
            Fetch two random flashcards, two random quizzes, and two random summaries.
            """
            try:
                flashcards = list(db.find_documents("flashcards"))
                quizzes = list(db.find_documents("quizzes"))
                summaries = list(db.find_documents("summaries"))

                selected_flashcards = random.sample(flashcards, min(2, len(flashcards)))
                selected_quizzes = random.sample(quizzes, min(2, len(quizzes)))
                selected_summaries = random.sample(summaries, min(2, len(summaries)))

                combined_results = selected_flashcards + selected_quizzes + selected_summaries
                random.shuffle(combined_results)  # Shuffle to randomize order

                return [{"_id": str(doc["_id"]), **doc} for doc in combined_results]
            except Exception as e:
                raise HTTPException(status_code=500, detail=str(e))

        @self.router.post("/upload-pdf", tags=["Upload"])
        async def upload_pdf(file: UploadFile = File(...)):
            """
            Upload a PDF file and store it localy.
            """
            if not file.filename.lower().endswith(".pdf"):
                raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

            try:
                file_path = os.path.join(config.UPLOAD_FOLDER, file.filename)

                # Save file locally
                with open(file_path, "wb") as buffer:
                    shutil.copyfileobj(file.file, buffer)

                return {"message": "File uploaded successfully", "filename": file.filename, "path": file_path}

            except Exception as e:
                raise HTTPException(status_code=500, detail=str(e))




class FlashcardsRoutes(BaseRoutes):
    def __init__(self):
        super().__init__("flashcards", db)

class SummariesRoutes(BaseRoutes):
    def __init__(self):
        super().__init__("summaries", db)

class QuizzesRoutes(BaseRoutes):
    def __init__(self):
        super().__init__("quizzes", db)


class UsersRoutes(BaseRoutes):
    def __init__(self):
        super().__init__("users", db)
