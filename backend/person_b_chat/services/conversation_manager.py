from uuid import uuid4

from models.conversation import UserProfile
from utils.session_store import sessions


# These are the FIVE eligibility questions.
QUESTION_ORDER = [
    "age",
    "occupation",
    "income",
    "state",
    "category"
]


QUESTIONS = {
    "age": "What is your age?",
    "occupation": "What is your occupation?",
    "income": "What is your annual family income?",
    "state": "Which state do you live in?",
    "category": "What is your category?"
}


class ConversationManager:

    def create_session(self) -> str:
        """
        Creates a new conversation session.
        """

        session_id = str(uuid4())

        sessions[session_id] = {
            "profile": UserProfile()
        }

        return session_id


    def get_session(self, session_id: str) -> dict:
        """
        Returns an existing session.
        Raises an error if session doesn't exist.
        """

        if session_id not in sessions:
            raise ValueError("Session not found")

        return sessions[session_id]


    def get_profile(self, session_id: str) -> UserProfile:
        """
        Returns the user's profile.
        """

        session = self.get_session(session_id)

        return session["profile"]


    def update_profile(
        self,
        session_id: str,
        extracted_data: dict
    ):
        """
        Updates the user profile with newly extracted information.

        Example:
        {
            "age": 20,
            "occupation": "student"
        }
        """

        profile = self.get_profile(session_id)

        for field, value in extracted_data.items():

            # Ignore unknown fields
            if field not in profile.model_fields:
                continue

            # Don't overwrite existing information with None
            if value is None:
                continue

            setattr(profile, field, value)

        return profile


    def get_next_field(self, session_id: str):
        """
        Finds the next missing eligibility field.
        """

        profile = self.get_profile(session_id)

        for field in QUESTION_ORDER:

            value = getattr(profile, field)

            if value is None:
                return field

        return None


    def get_next_question(self, session_id: str):
        """
        Returns the next question that should be asked.
        """

        next_field = self.get_next_field(session_id)

        if next_field is None:
            return None

        return QUESTIONS[next_field]


    def is_complete(self, session_id: str) -> bool:
        """
        Returns True when all five eligibility fields
        have been collected.
        """

        return self.get_next_field(session_id) is None


    def get_conversation_state(self, session_id: str):
        """
        Returns useful information about the current conversation.
        """

        profile = self.get_profile(session_id)

        next_field = self.get_next_field(session_id)

        return {
            "session_id": session_id,
            "profile": profile.model_dump(),
            "next_field": next_field,
            "next_question": (
                QUESTIONS[next_field]
                if next_field
                else None
            ),
            "completed": next_field is None
        }


# Create one reusable manager instance
conversation_manager = ConversationManager()