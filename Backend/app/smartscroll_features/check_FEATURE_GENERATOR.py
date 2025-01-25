from features_generator import OpenAIFeaturesGenerator
from Backend.app.file_handler.pdf_reader import PDFReader
from Backend.app.database.mongoDBHandler import MongoDBHandler

mongodb_handler = MongoDBHandler()
pdf_reader = PDFReader("/Users/oussamaizelgue/SmartScroll/Backend/app/pdfs/Introduction to Software Engineering.pdf", mongodb_handler)
text = pdf_reader.read_pdf_as_string()
metadata = pdf_reader.get_metadata()

print(metadata)

openai_generator = OpenAIFeaturesGenerator("sk-proj-a2g8UC0dQAORg6ZWpPaPnWpKw"
                                           "mQelVagcB5Xmx3lt6mvOhRPAadaqz1g6o0"
                                           "GVRz8etLo3evK3tT3BlbkFJp75YWToY6"
                                           "HYYBzZd7u4cqfXBYKkg4KbOLendyFjXQcL"
                                           "YYQmWyXRWXj6OCByKZ4H-PQ_0mxEegA")

openai_generator.generate_feature("summary", text)

print("---------summary-----------")
print(openai_generator.summary)



