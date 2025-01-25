from typing import Dict


class LearningMaterial:
    """
    Base class for learning materials (Summary, Flashcard, Quiz).

    :param id: Unique identifier for the learning material.
    :param source: Source of the text.
    :param text: The original text content.
    """

    def __init__(self, source: str, text: str):
        self.__source: str = source
        self.__text: str = text

    @property
    def source(self):
        return self.__source

    @source.setter
    def source(self, value):
        if not isinstance(value, str):
            raise TypeError("Source must be a string")
        self.__source = value

    @property
    def text(self):
        return self.__text

    @text.setter
    def text(self, value):
        if not isinstance(value, str):
            raise TypeError("Text must be a string")
        self.__text = value

    def __repr__(self):
        return f"{self.__class__.__name__}(source='{self.__source}')"


class Summary(LearningMaterial):
    """
    Represents a text summary.

    :param id: Unique identifier.
    :param source: Source of the text.
    :param text: The original text.
    :param summary_text: The summarized text.
    """

    def __init__(self, source: str, text: str, title: str, summary_text: str):
        super().__init__(source, text)
        self._title = title
        self._summary_text: str = summary_text

    @property
    def title(self):
        return self._title

    @title.setter
    def title(self, value):
        if not isinstance(value, str):
            raise TypeError("title must be a string")
        self._title = value

    @property
    def summary_text(self):
        return self._summary_text

    @summary_text.setter
    def summary_text(self, value):
        if not isinstance(value, str):
            raise TypeError("Summary text must be a string")
        self._summary_text = value

    def to_dictionary(self):
        document = {
            "title": self.title,
            "summary": self.summary_text,
            "source": self.source
        }
        return document

    def __repr__(self):
        summary_preview = self._summary_text[:50] + "..." if len(
            self._summary_text) > 50 else self._summary_text
        return f"{self.__class__.__name__}(source='{self.source}', summary='{summary_preview}...')"


class Flashcard(LearningMaterial):
    """
    Represents a flashcard with a front and back.

    :param id: Unique identifier.
    :param source: Source of the text.
    :param text: The original text.
    :param front: The front (question/term) of the flashcard.
    :param back: The back (answer/definition) of the flashcard.
    """

    def __init__(self, source: str, text: str, front: str, back: str):
        super().__init__(source, text)
        self._front: str = front
        self._back: str = back

    @property
    def front(self):
        return self._front

    @front.setter
    def front(self, value):
        if not isinstance(value, str):
            raise TypeError("Front text must be a string")
        self._front = value

    @property
    def back(self):
        return self._back

    @back.setter
    def back(self, value):
        if not isinstance(value, str):
            raise TypeError("Back text must be a string")
        self._back = value

    def to_dictionary(self):
        document = {
            "front": self.front,
            "back": self.back,
            "source": self.source
        }
        return document

    def __repr__(self):
        return f"{self.__class__.__name__}(source='{self.source}', front='{self._front[:10]}...', back='{self._back[:10]}...')"


class Quiz(LearningMaterial):
    """
    Represents a multiple-choice quiz question.

    :param id: Unique identifier.
    :param source: Source of the text.
    :param text: The original text.
    :param question: The quiz question.
    :param choices: A dictionary of choices (e.g., {"a": "Choice A", "b": "Choice B"}).
    :param answer: The correct answer (key from the choices dictionary).
    """

    def __init__(self, source: str, text: str, question: str, choices: Dict[str, str], answer: str):
        super().__init__(source, text)
        self._question: str = question
        self._choices: Dict[str, str] = choices
        self._answer: str = answer

    @property
    def question(self):
        return self._question

    @question.setter
    def question(self, value):
        if not isinstance(value, str):
            raise TypeError("Question must be a string")
        self._question = value

    @property
    def choices(self):
        return self._choices

    @choices.setter
    def choices(self, value):
        if not isinstance(value, dict):
            raise TypeError("Choices must be a dictionary")
        self._choices = value

    @property
    def answer(self):
        return self._answer

    @answer.setter
    def answer(self, value):
        if not isinstance(value, str):
            raise TypeError("Answer must be a string")
        if value not in self._choices.keys():
            raise ValueError("Answer must be a valid key from choices")
        self._answer = value


    def to_dictionary(self):
        document = {
            "question": self.question,
            "choices": self.choices,
            "correct_answer": self.answer,
            "source": self.source
        }
        return document

    def __repr__(self):
        return f"{self.__class__.__name__}(source='{self.source}', question='{self._question}', answer='{self._answer}')"
