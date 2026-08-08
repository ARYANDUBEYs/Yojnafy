# from services.llm_service import extract_user_information


# message = """
# Meri age 20 hai aur main student hoon.
# Mere family ki income 2 lakh hai.
# Main UP se hoon aur OBC category mein hoon.
# Mujhe scholarship chahiye.
# """


# result = extract_user_information(message)

# print(result)

# Test 02

from services.llm_service import extract_user_information


tests = [
    "Meri age 20 hai aur main student hoon",

    "Mujhe scholarship chahiye. Main 20 saal ka student hoon, "
    "meri family income 2 lakh hai, main UP se hoon aur OBC category mein hoon.",

    "Main kisan hoon, meri income 1.5 lakh hai aur main MP se hoon.",

    "I am a college student from Maharashtra. My annual income is 3 lakh."
]


for message in tests:

    print("\nUSER:")
    print(message)

    try:

        result = extract_user_information(message)

        print("EXTRACTED:")
        print(result)

    except Exception as e:

        print("ERROR:")
        print(e)