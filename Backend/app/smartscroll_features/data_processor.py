from Backend.app.smartscroll_features.features_generator import OpenAIFeaturesGenerator
from Backend.app.file_handler.pdf_reader import *
from Backend.app.database.mongoDBHandler import MongoDBHandler
from Backend.app.config import config


class DataProcessor:
    def __init__(self, file_path: str):

        self._file_path = file_path
        self._db_handler = MongoDBHandler()
        self._pdf_reader = PDFReader(file_path, self._db_handler)
        self._feature_generator = OpenAIFeaturesGenerator(config.OPENAI_API_KEY)




    def generate_content(self):
        pdf_as_string = self._pdf_reader.read_pdf_as_string()
        file_id = self._pdf_reader.store_pdf()

        self._feature_generator.generate_all_features(pdf_as_string)
        summary, flashcards, quizzes = self._feature_generator.get_learning_material(source=file_id)


        summary_document = summary.to_dictionary()
        flashcards_documents = [flashcard.to_dictionary() for flashcard in flashcards]
        quizzes_documents = [quizz.to_dictionary() for quizz in quizzes]

        print(summary_document)
        print(flashcards_documents)
        print(quizzes_documents)

        self._db_handler.insert_flashcards(flashcards_documents)
        self._db_handler.insert_summary(summary_document)
        self._db_handler.insert_quizzes(quizzes_documents)



if __name__ == '__main__':
    dp = DataProcessor("/Users/oussamaizelgue/SmartScroll/Backend/app/pdfs/Introduction to Software Engineering.pdf")

    dp.generate_content()
