import openai
import json
import re
from typing import List, Dict
from smartscroll_features.learning_materials import Summary, Flashcard, Quiz


class OpenAIFeaturesGenerator:

    def __init__(self, api_key):
        """
        Initializes the OpenAI Features Generator with the provided API key.

        :param api_key: The API key to authenticate with OpenAI's API.
        """
        openai.api_key = api_key
        self.__text: str = ""
        self.__summary: Dict = dict()
        self.__flashcards: List[Dict] = list()
        self.__quizzes: List[Dict] = list()

    # Getter and Setter for __summary
    @property
    def summary(self):
        return self.__summary

    @summary.setter
    def summary(self, value):
        if isinstance(value, dict):  # Ensure it's a dictionary
            self.__summary = value
        else:
            raise ValueError("Summary must be a dictionary.")

    # Getter and Setter for __flashcards
    @property
    def flashcards(self):
        return self.__flashcards

    @flashcards.setter
    def flashcards(self, value):
        if isinstance(value, list):  # Ensure it's a dictionary
            self.__flashcards = value
        else:
            raise ValueError("Flashcards must be a list of dictionaries.")

    # Getter and Setter for __quizzes
    @property
    def quizzes(self):
        return self.__quizzes

    @quizzes.setter
    def quizzes(self, value):
        if isinstance(value, list):  # Ensure it's a dictionary
            self.__quizzes = value
        else:
            raise ValueError("Quizzes must be a list of dictionaries.")


    def get_openai_response(self, prompt: str, max_tokens: int = 500, temperature: float = 0.7) -> str:
        """
        Sends a prompt to OpenAI's API and retrieves the response.

        :param prompt: The prompt to send to OpenAI.
        :param max_tokens: The maximum number of tokens to generate in the response (default is 500).
        :param temperature: Controls the randomness of the generated response (default is 0.7).

        :return: The generated response from OpenAI (str).
        :raises: openai.error.OpenAIError if OpenAI API fails.
        :raises: Exception for other unexpected errors.
        """
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=max_tokens,
                temperature=temperature,
            )
            return response['choices'][0]['message']['content'].strip()
        except Exception as e:
            return f"An unexpected error occurred: {str(e)}"


    def generate_prompt(self, task: str, text: str) -> str:
        """
        Generates a prompt for different tasks (summary, flashcards, quizzes).

        :param task: The task to generate a prompt for (summary, flashcards, quizzes).
        :param text: The text to be used in the prompt.

        :return: str: The generated prompt.
        """
        if task == "summary":
            return f"""
            Please summarize the following text in an engaging, storytelling manner similar to Medium articles. The summary should be informative yet captivating, using a narrative approach to keep the reader interested. 

            Please return the output in JSON format with the key 'summary'. 

            Example:
            {{ "summary":
              {{"summary_text": "A well-structured summary that highlights the key points while maintaining an engaging and readable flow",
              "title": "A compelling, click-worthy title summarizing the essence of the text"}}
            }}

            Ensure the title is concise yet attention-grabbing, and the summary text should be between 300-500 words, capturing the core ideas while maintaining a smooth, engaging reading experience.
            Format the text naturally with proper paragraph spacing.
            Text to summarize: {text}
            """
        elif task == "flashcards":
            return f"""
            Generate 3 flashcards from the following text. Each flashcard should have a clear front (question/term)
            and back (answer/definition). 
            Return the output in JSON format with the key 'flashcards', containing an array of flashcard objects.
            Each flashcard object should have the following structure:
            {{"front": "Front 1", "back": "Back 1"}}
            
            Example:
            {{
              "flashcards": [
                {{"front": "Front 1", "back": "Back 1"}},
                {{"front": "Front 2", "back": "Back 2"}},
                {{"front": "Front 3", "back": "Back 3"}}
              ]
            }}
            
            Text:
            {text}
            """
        elif task == "quizzes":
            return f"""
            Generate 3 multiple-choice questions from the following text.
            Each question should have 4 choices (a, b, c, d) and a clearly 
            indicated correct answer. 
            Return the output in JSON format with the key 'quizzes', containing an array of quiz objects. 
            Each quiz object should have the following structure:
            {{
            "question": "The question text",
            "choices": {{
            "a": "Choice A",
            "b": "Choice B",
            "c": "Choice C",
            "d": "Choice D"
            }},
            "correct_answer": "The correct answer (a, b, c, or d)"
        }}

     Example:
        {{
          "quizzes": [
            {{
              "question": "What is the capital of France?",
              "choices": {{
                "a": "Berlin",
                "b": "Madrid",
                "c": "Paris",
                "d": "Rome"
              }},
              "correct_answer": "c"
            }}
            // ... more quizzes
          ]
        }}
        
        Text:
        {text}
        """
        return ""


    def clean_response(self, response: str) -> dict:
        """
        Cleans the response string and extracts the JSON portion if present.

        :param response: The response string containing potential JSON content.

        :return: The parsed JSON content as a Python dictionary.
        :raises: ValueError if no JSON content is found or if parsing fails.
        """
        # Use regex to find the JSON-like structure in the response
        json_match = re.search(r'\{.*\}', response, re.DOTALL)

        if json_match:
            json_string = json_match.group()  # Extract the JSON portion

            try:
                # Parse the JSON string into a Python dictionary
                return json.loads(json_string)
            except json.JSONDecodeError:
                # Handle cases where the JSON is malformed
                raise ValueError("The response contains invalid JSON.")
        else:
            # Handle cases where no JSON content is found
            raise ValueError("No JSON content found in the response.")


    def generate_feature(self, task: str, text: str, temperature: float = 0.7,
                         max_tokens: int = 500) -> bool:
        """
        Generates a specific feature (summary, flashcards, or quizzes) from the given text.

        :param task: The task to be performed ('summary', 'flashcards', or 'quizzes').
        :param text: The text to generate the task from.
        :param temperature: Controls the randomness of the generated response (default is 0.7).
        :param max_tokens: The maximum number of tokens to generate in the response (default is 500).

        :return: Boolean indicating whether the task was performed successfully.
        :raises: Exception for any unexpected errors during generation.
        """
        max_token_settings = {
        "summary": 5000,  
        "flashcards": 500,  
        "quizzes": 500, 
        }
        max_tokens = max_token_settings.get(task, 500)
        
        try:
            prompt = self.generate_prompt(task, text)
            response = self.get_openai_response(prompt, max_tokens=max_tokens,
                                                temperature=temperature)
            
            print("Raw OpenAI Response:\n", response)

            cleaned_response = self.clean_response(response)


            # Store the result in the appropriate attribute
            if task == "summary":
                self.summary = cleaned_response.get("summary",
                                                    "Error: Summary not found.")
            elif task == "flashcards":
                self.flashcards = cleaned_response.get("flashcards",
                                                       "Error: Flashcards not found.")
            elif task == "quizzes":
                self.quizzes = cleaned_response.get("quizzes",
                                                    "Error: Quizzes not found.")
            else:
                raise ValueError("Invalid task specified.")

            return True
        except Exception as e:
            print(f"Error: {str(e)}")
            return False


    def generate_all_features(self, text: str, max_tokens: int = 500, temperature: float = 0.7):
        tasks = ["summary", "flashcards", "quizzes"]
        for task in tasks:
            self.generate_feature(task, text=text, max_tokens=max_tokens, temperature=temperature)


    def get_learning_material(self, source):
        summary = Summary(source, self.__text, self.__summary.get("title"), self.__summary.get("summary_text"))
        flashcards = []
        quizzes = []
        for card in self.__flashcards:
            flashcard_front = card.get("front")
            flashcard_back = card.get("back")
            flashcard = Flashcard(source, self.__text, flashcard_front, flashcard_back)
            flashcards.append(flashcard)
        for quiz in self.__quizzes:
            question = quiz.get("question")
            choices = quiz.get("choices")
            answer = quiz.get("correct_answer")
            quizz_material = Quiz(source, self.__text, question, choices, answer)
            quizzes.append(quizz_material)
        return summary, flashcards, quizzes




