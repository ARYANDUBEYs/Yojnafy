from services.conversation_manager import conversation_manager


# Create session
session_id = conversation_manager.create_session()

print("SESSION:", session_id)


# Initial intent
conversation_manager.update_profile(
    session_id,
    {
        "intent": "scholarship"
    }
)

print(
    "QUESTION:",
    conversation_manager.get_next_question(session_id)
)


# Age
conversation_manager.update_profile(
    session_id,
    {
        "age": 20
    }
)

print(
    "QUESTION:",
    conversation_manager.get_next_question(session_id)
)


# Occupation
conversation_manager.update_profile(
    session_id,
    {
        "occupation": "student"
    }
)

print(
    "QUESTION:",
    conversation_manager.get_next_question(session_id)
)


# Income
conversation_manager.update_profile(
    session_id,
    {
        "income": 200000
    }
)

print(
    "QUESTION:",
    conversation_manager.get_next_question(session_id)
)


# State
conversation_manager.update_profile(
    session_id,
    {
        "state": "Uttar Pradesh"
    }
)

print(
    "QUESTION:",
    conversation_manager.get_next_question(session_id)
)


# Category
conversation_manager.update_profile(
    session_id,
    {
        "category": "OBC"
    }
)


print(
    "COMPLETE:",
    conversation_manager.is_complete(session_id)
)


print(
    "FINAL PROFILE:",
    conversation_manager.get_profile(session_id)
)