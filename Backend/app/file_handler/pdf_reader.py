import os
import fitz  # PyMuPDF
from typing import List, Dict


class PDFReaderError(Exception):
    """
    A custom exception for errors encountered in the PDFReader class.
    """
    def __init__(self, message: str):
        super().__init__(message)


class PDFReader:
    def __init__(self, file_path: str):
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
