from pymongo import MongoClient
from pymongo.errors import CollectionInvalid
from Backend.app.config import config

class MongoDBHandler:
    '''Base class for accessing the MongoDB database'''
    def __init__(self):
        try:
            self.client = MongoClient(config.DB_URI, serverSelectionTimeoutMS=5000)
            # Check if the server is available
            self.client.admin.command('ping')
            self.db = self.client[config.DB_NAME]  # Use your database name from config
            print("Connected to MongoDB.")
        except Exception as e:
            print(f"Error connecting to MongoDB: {e}")
        
        self.__flashcard_required_fields = ["front", "back", "source"]
        self.__summary_required_fields = ["summary", "title", "source"]
        self.__quiz_required_fields = ["question", "choices", "correct_answer", "source"]
        self.__user_required_fields = ["username", "first_name", "last_name", "birth_date", "email", "password"]
        self.__user_files_required_fields = ["userId", "fileId"]



    def create_collection_if_not_exists(self, collection_name: str):
        '''Create a collection if it doesn't already exist'''
        if collection_name not in self.db.list_collection_names():
            try:
                self.db.create_collection(collection_name)
                print(f"Collection '{collection_name}' created.")
            except CollectionInvalid:
                print(f"Collection '{collection_name}' already exists or can't be created.")
        else:
            print(f"Collection '{collection_name}' already exists.")


    def init_collections(self):
        self.create_collection_if_not_exists("flashcards")
        self.create_collection_if_not_exists("summaries")
        self.create_collection_if_not_exists("quizzes")
        self.create_collection_if_not_exists("users")

    def get_collection(self, collection_name: str):
        '''Fetch a collection by name'''
        return self.db[collection_name]  # Access a specific collection
    

    def validate_document(self, document: dict, required_fields: list):
        '''Validate that the document contains all the required fields'''
        missing_fields = [field for field in required_fields if field not in document]
        if missing_fields:
            print(f"Missing required fields: {', '.join(missing_fields)}")
            return False
        return True
        
    
    def insert_document(self, collection_name: str, document: dict, required_fields: list, unique_field: str):
        '''Insert a document into a collection'''
        # Validate the document before insertion
        if self.validate_document(document, required_fields):
            collection = self.get_collection(collection_name)
            if collection.find_one({unique_field: document[unique_field]}):
                print(f"Duplicate document found based on '{unique_field}', insertion skipped.")
                return
            collection.insert_one(document)
            print(f"Document inserted into '{collection_name}' collection.")
        else:
            print(f"Document not inserted into '{collection_name}' collection due to validation failure.")


    def insert_documents(self, collection: str, documents: list, required_fields: list, unique_field: str):
        '''Insert multiple documents into the database.'''
        for document in documents:
            self.insert_document(collection, document, required_fields, unique_field)


    def insert_flashcard(self, document: dict):
        '''Insert a flashcard into the database'''
        self.insert_document("flashcards", document, self.__flashcard_required_fields, "front")

    
    def insert_summary(self, document: dict):
        '''Insert a summary into the database'''
        self.insert_document("summaries", document, self.__summary_required_fields, "summary")


    def insert_quiz(self, document: dict):
        '''Insert a quiz into the database'''
        self.insert_document("quizzes", document, self.__quiz_required_fields, "question")

    
    def insert_user(self, document: dict):
        '''Insert a user into the database'''
        self.insert_document("users", document, self.__user_required_fields, "email")


    def insert_flashcards(self, documents: list):
        '''Insert multiple flashcards into the database.'''
        self.insert_documents("flashcards", documents, self.__flashcard_required_fields, "front")

    def insert_summaries(self, documents: list):
        '''Insert multiple summaries into the database.'''
        self.insert_documents("summaries", documents, self.__summary_required_fields, "summary")

    def insert_quizzes(self, documents: list):
        '''Insert multiple quizzes into the database.'''
        self.insert_documents("quizzes", documents, self.__quiz_required_fields, "question")


    def update_document(self, collection_name: str, filter: dict, update: dict, required_fields: list):
        '''Update documents in a collection with validation'''
        # Validate the update fields before updating
        if self.validate_document(update, required_fields):
            collection = self.get_collection(collection_name)
            result = collection.update_many(filter, {'$set': update})
            self.log_operation('Update', collection_name)
            print(f"{result.modified_count} document(s) updated in '{collection_name}' collection.")
        else:
            print(f"Update operation failed due to validation failure.")


    def update_flashcards(self, filter: dict, update: dict):
        self.update_document("flashcards", filter, update, self.__flashcard_required_fields)

    

    def update_summaries(self, filter: dict, update: dict):
        self.update_document("summaries", filter, update, self.__summary_required_fields)



    def update_quizzes(self, filter: dict, update: dict):
        self.update_document("quizzes", filter, update, self.__quiz_required_fields)


    def update_users(self, filter: dict, update: dict):
        self.update_document("users", filter, update, self.__user_required_fields)



    def delete_document(self, collection_name: str, filter: dict):
        '''Delete documents from a collection'''
        collection = self.get_collection(collection_name)
        result = collection.delete_many(filter)
        self.log_operation('Delete', collection_name)
        print(f"{result.deleted_count} document(s) deleted from '{collection_name}' collection.")
    

    def serialize_document(self, document):
        '''Convert MongoDB document to a serializable format'''
        if document and "_id" in document:
            document["_id"] = str(document["_id"])  # Convert ObjectId to string
        return document


    def find_documents(self, collection_name: str, filter: dict = None):
        '''Find documents in a collection'''
        collection = self.get_collection(collection_name)
        results = collection.find(filter or {})
        return [self.serialize_document(doc) for doc in results]

    def aggregate_documents(self, collection_name: str, pipeline: list):
        '''Run aggregation pipeline on a collection'''
        collection = self.get_collection(collection_name)
        result = collection.aggregate(pipeline)
        return [self.serialize_document(doc) for doc in result]
    
    

# Initialize the MongoDB connection
db = MongoDBHandler()

