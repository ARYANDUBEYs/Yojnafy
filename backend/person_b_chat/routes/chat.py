from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from services.conversation_manager import conversation_manager


router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


class ChatRequest(BaseModel):
    session_id: str | None = None
    message: str


@router.post("")
def chat(request: ChatRequest):

    #  Create a new session if needed


    if request.session_id is None:
        session_id = conversation_manager.create_session()
    else:
        session_id = request.session_id

        # Check whether session exists
        try:
            conversation_manager.get_session(session_id)
        except ValueError:
            raise HTTPException(
                status_code=404,
                detail="Session not found"
            )


    # 2. TEMPORARY message extraction
    #  NOT using Groq/Gemini yet.
    # For testing, the message itself is
    # converted into the expected field.
    #

    next_field = conversation_manager.get_next_field(session_id)

    extracted_data = {}

    if next_field == "age":
        try:
            extracted_data["age"] = int(request.message)
        except ValueError:
            return {
                "session_id": session_id,
                "reply": "Please enter your age as a number.",
                "completed": False
            }

    elif next_field == "occupation":
        extracted_data["occupation"] = request.message.strip()

    elif next_field == "income":
        try:
            extracted_data["income"] = int(request.message)
        except ValueError:
            return {
                "session_id": session_id,
                "reply": "Please enter your annual family income as a number.",
                "completed": False
            }

    elif next_field == "state":
        extracted_data["state"] = request.message.strip()

    elif next_field == "category":
        extracted_data["category"] = request.message.strip()


    # 3. Update conversation


    if extracted_data:
        conversation_manager.update_profile(
            session_id,
            extracted_data
        )


    # 4. Check whether conversation
    #    is complete

    if conversation_manager.is_complete(session_id):

        profile = conversation_manager.get_profile(session_id)

        return {
            "session_id": session_id,
            "reply": "Thank you. We have collected all the required information.",
            "completed": True,
            "profile": profile.model_dump()
        }

    # 5. Ask next question

    next_question = conversation_manager.get_next_question(
        session_id
    )

    return {
        "session_id": session_id,
        "reply": next_question,
        "completed": False
    }