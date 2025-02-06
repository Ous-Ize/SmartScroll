import openai
from fastapi import HTTPException


class Chatbot:
    def __init__(self, api_key: str):
        """
        Initializes the Chatbot with the provided OpenAI API key.
        """
        openai.api_key = api_key
        # Optionally, you can initialize a conversation history
        self.conversation_history = [
            {"role": "system", "content": "You are a helpful assistant."}]

    def ask(self, message: str, temperature: float = 0.7,
            max_tokens: int = 150) -> str:
        """
        Sends a user message to OpenAI and returns the assistant's response.

        :param message: The user's message.
        :param temperature: Controls randomness.
        :param max_tokens: Maximum tokens to return.
        :return: Chatbot's answer as a string.
        """
        try:
            # Append the new user message to the conversation
            self.conversation_history.append(
                {"role": "user", "content": message})

            # Call OpenAI ChatCompletion API
            response = openai.ChatCompletion.create(
                model="gpt-4o",  # Change this if needed
                messages=self.conversation_history,
                temperature=temperature,
                max_tokens=max_tokens,
            )
            answer = response['choices'][0]['message']['content'].strip()

            # Append the assistant's response to the conversation history
            self.conversation_history.append(
                {"role": "assistant", "content": answer})
            return answer
        except Exception as e:
            raise HTTPException(status_code=500,
                                detail=f"OpenAI error: {str(e)}")
