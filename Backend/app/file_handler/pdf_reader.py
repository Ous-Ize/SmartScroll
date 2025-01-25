import os
import fitz  # PyMuPDF
from typing import List, Dict
from pymongo import MongoClient
from gridfs import GridFS
from Backend.app.database.mongoDBHandler import MongoDBHandler


class PDFReaderError(Exception):
    """
    A custom exception for errors encountered in the PDFReader class.
    """
    def __init__(self, message: str):
        super().__init__(message)


class PDFReader:
    def __init__(self, file_path: str, mongodb_handler: MongoDBHandler):
        """
        Initialize the PDFReader with the path to the PDF file.

        :param file_path: The path to the PDF file.
        :raises PDFReaderError: If the file path is invalid or the file does not exist.
        """
        if not os.path.exists(file_path):
            raise PDFReaderError(f"File not found: {file_path}")
        if not file_path.lower().endswith('.pdf'):
            raise PDFReaderError(
                f"Invalid file type. Expected a PDF file: {file_path}")
        self.file_path = file_path
        self.client = mongodb_handler.client
        self.db = mongodb_handler.db
        self.fs = GridFS(self.db)

    def store_pdf(self):
        """
        Store the entire PDF file in MongoDB using GridFS.
        :param file_path: The path to the PDF file.
        """
        if not os.path.exists(self.file_path):
            raise PDFReaderError(f"File not found: {self.file_path}")
        if not self.file_path.lower().endswith('.pdf'):
            raise PDFReaderError(
                f"Invalid file type. Expected a PDF file: {self.file_path}")

        with open(self.file_path, "rb") as pdf_file:
            file_id = self.fs.put(pdf_file,
                                  filename=os.path.basename(self.file_path))
            print(f"PDF stored successfully in MongoDB with ID: {file_id}")
            return file_id

    def retrieve_pdf(self, pdf_name: str, output_path: str):
        """
        Retrieve the entire PDF file from MongoDB and save it locally.
        :param pdf_name: The name of the PDF file to retrieve.
        :param output_path: The path to save the retrieved PDF.
        """
        file_data = self.fs.find_one({"filename": pdf_name})
        if not file_data:
            raise PDFReaderError(f"No file found with name: {pdf_name}")

        with open(output_path, "wb") as output_file:
            output_file.write(file_data.read())
        print(f"PDF retrieved and saved to: {output_path}")

    def read_pdf_content_from_db(self, pdf_name: str) -> str:
        """
        Read the content of the PDF stored in MongoDB.
        :param pdf_name: The name of the PDF file to read.
        :return: Extracted text content from the PDF.
        """
        file_data = self.fs.find_one({"filename": pdf_name})
        if not file_data:
            raise PDFReaderError(f"No file found with name: {pdf_name}")

        # Read the PDF content directly from the binary data
        with fitz.open(stream=file_data.read(), filetype="pdf") as pdf:
            text = ""
            for page in pdf:
                text += page.get_text()
        return text.strip()

    def read_pdf_as_string(self) -> str:
        """
        Read the entire PDF and return the content as a single string.

        :return: A string containing all text from the PDF.
        :raises PDFReaderError: If there is an error reading the PDF.
        """
        try:
            text = ""
            with fitz.open(self.file_path) as pdf:
                for page in pdf:
                    text += page.get_text()
            return text.strip()
        except Exception as e:
            raise PDFReaderError(f"Error reading PDF as string: {e}")

    def get_metadata(self) -> Dict[str, str]:
        """Returns the metadata of the PDF."""
        try:
            with fitz.open(self.file_path) as pdf:
                return pdf.metadata
        except Exception as e:
            raise PDFReaderError(f"Failed to retrieve metadata: {e}")

    def extract_images(self) -> List[bytes]:
        """Extracts images from the PDF."""
        images = []
        try:
            with fitz.open(self.file_path) as pdf:
                for page in pdf:
                    for img in page.get_images(full=True):
                        xref = img[0]
                        base_image = pdf.extract_image(xref)
                        images.append(base_image["image"])
        except Exception as e:
            raise PDFReaderError(f"Failed to extract images: {e}")
        return images


if __name__ == '__main__':

    path = "/Users/oussamaizelgue/SmartScroll/Backend/app/pdfs/Introduction to Software Engineering.pdf"
    mngodb_handler = MongoDBHandler()
    pdf_reader = PDFReader(path, mngodb_handler)
    #+pdf_reader.store_pdf()

    pdf_reader.retrieve_pdf()


