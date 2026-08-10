# import os
# import json

# from dotenv import load_dotenv
# from groq import Groq


# load_dotenv()

# GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# if not GROQ_API_KEY:
#     raise RuntimeError("GROQ_API_KEY is not set in .env")


# client = Groq(api_key=GROQ_API_KEY)


# SYSTEM_PROMPT = """
# You are an information extraction assistant for an Indian government
# scheme navigator.

# Your job is ONLY to extract information from the user's message.

# The user may speak:
# - English
# - Hindi
# - Hinglish
# - informal language
# - code-mixed language
# - simple regional-language phrases

# Extract these fields when they are explicitly present:

# intent:
# - scholarship
# - agriculture
# - employment
# - housing
# - pension
# - healthcare
# - unknown

# age:
# - integer
# - null if not mentioned

# occupation:
# - normalized English value such as:
#   farmer
#   student
#   self_employed
#   unemployed
#   employee
#   worker
#   homemaker
# - null if not mentioned

# income:
# - annual family income in Indian rupees
# - convert lakh/lac notation
# - example: 2 lakh = 200000
# - example: 1.5 lakh = 150000
# - null if not mentioned

# state:
# - normalize to the Indian state name
# - example: UP -> Uttar Pradesh
# - null if not mentioned

# category:
# - SC
# - ST
# - OBC
# - General
# - EWS
# - Other
# - null if not mentioned

# IMPORTANT:
# - Never invent information.
# - If a field is not present, return null.
# - Return ONLY valid JSON.
# """


# def extract_user_information(message: str) -> dict:

#     response = client.chat.completions.create(
#         model="openai/gpt-oss-20b",
#         messages=[
#             {
#                 "role": "system",
#                 "content": SYSTEM_PROMPT
#             },
#             {
#                 "role": "user",
#                 "content": message
#             }
#         ],
#         response_format={
#             "type": "json_object"
#         },
#         temperature=0
#     )

#     content = response.choices[0].message.content

#     return json.loads(content)


#  Hardning the llm

import json
import os
from typing import Optional

from dotenv import load_dotenv
from groq import Groq
from pydantic import BaseModel, Field, field_validator


from pathlib import Path
load_dotenv(dotenv_path=Path(__file__).resolve().parent.parent / ".env")

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY is not set in .env")

client = Groq(api_key=GROQ_API_KEY)

# 1. Validated structure returned by the LLM

class ExtractedUserData(BaseModel):
    intent: Optional[str] = None
    age: Optional[int] = Field(default=None)
    occupation: Optional[str] = None
    income: Optional[int] = Field(default=None)
    state: Optional[str] = None
    category: Optional[str] = None

    @field_validator("age")
    @classmethod
    def validate_age(cls, value):
        if value is not None and not 0 < value <= 120:
            raise ValueError("Age must be between 1 and 120")
        return value

    @field_validator("income")
    @classmethod
    def validate_income(cls, value):
        if value is not None and value < 0:
            raise ValueError("Income cannot be negative")
        return value


# 2. System prompt

SYSTEM_PROMPT = """
You are an information extraction assistant for an Indian
government scheme navigator.

The user may speak in:
- English
- Hindi
- Hinglish
- informal language
- code-mixed language

Your ONLY job is to extract user information.

Extract:

intent:
- scholarship
- agriculture
- employment
- housing
- pensionload_dotenv
- healthcare
- unknown

age:
- integer
- null if not mentioned

occupation:
Normalize to one of:
- farmer
- student
- self_employed
- unemployed
- employee
- worker
- homemaker
- unknown

income:
- annual family income in Indian rupees
- 2 lakh = 200000
- 1.5 lakh = 150000
- 50 thousand = 50000
- null if not mentioned

state:
Normalize Indian states.
Examples:
- UP -> Uttar Pradesh
- MP -> Madhya Pradesh
- WB -> West Bengal
- Maharashtra -> Maharashtra

category:
Normalize to:
- SC
- ST
- OBC
- General
- EWS
- Other
- unknown

RULES:
1. Never invent information.
2. If information is not present, return null.
3. Do not guess age, income, state or category.
4. Return ONLY valid JSON.
5. Do not return explanations.
"""

# 3. Normalization helpers

def normalize_intent(intent: Optional[str]) -> Optional[str]:

    if not intent:
        return None

    value = intent.strip().lower()
    if value in ["unknown", "not mentioned", "none", "null", "n/a"]:
        return None

    mapping = {
        "education": "scholarship",
        "study": "scholarship",
        "student scholarship": "scholarship",

        "farming": "agriculture",
        "farmer": "agriculture",

        "job": "employment",
        "jobs": "employment",

        "home": "housing",
        "house": "housing",

        "medical": "healthcare",
        "health": "healthcare",

        "pension scheme": "pension",
    }

    return mapping.get(value, value)


def normalize_occupation(
    occupation: Optional[str]
) -> Optional[str]:

    if not occupation:
        return None

    value = occupation.strip().lower()
    if value in ["unknown", "not mentioned", "none", "null", "n/a"]:
        return None

    mapping = {
        "student": "student",
        "college student": "student",
        "school student": "student",

        "farmer": "farmer",
        "kisan": "farmer",

        "businessman": "self_employed",
        "business owner": "self_employed",
        "business": "self_employed",
        "self employed": "self_employed",

        "job": "employee",
        "employee": "employee",
        "private employee": "employee",
        "government employee": "employee",

        "labour": "worker",
        "labor": "worker",
        "worker": "worker",

        "housewife": "homemaker",
        "homemaker": "homemaker",

        "unemployed": "unemployed",
        "jobless": "unemployed",
    }

    return mapping.get(value, value)


# def normalize_category(
#     category: Optional[str]
# ) -> Optional[str]:

#     if not category:
#         return None

#     value = category.strip().lower()

# few changes in normalize_category

def normalize_category(
    category: Optional[str]
) -> Optional[str]:

    if not category:
        return None

    value = category.strip().lower()

    if value in ["unknown", "not mentioned", "none", "null", "n/a"]:
        return None

    mapping = {
        "obc": "OBC",
        "other backward class": "OBC",

        "sc": "SC",
        "scheduled caste": "SC",

        "st": "ST",
        "scheduled tribe": "ST",

        "general": "General",
        "gen": "General",

        "ews": "EWS",
        "economically weaker section": "EWS",

        "other": "Other",
    }

    return mapping.get(value, value)


def normalize_state(
    state: Optional[str]
) -> Optional[str]:

    if not state:
        return None

    value = state.strip().lower()
    if value in ["unknown", "not mentioned", "none", "null", "n/a"]:
        return None

    mapping = {
        "up": "Uttar Pradesh",
        "uttar pradesh": "Uttar Pradesh",

        "mp": "Madhya Pradesh",
        "madhya pradesh": "Madhya Pradesh",

        "wb": "West Bengal",
        "west bengal": "West Bengal",

        "rj": "Rajasthan",
        "rajasthan": "Rajasthan",

        "bihar": "Bihar",

        "mh": "Maharashtra",
        "maharashtra": "Maharashtra",

        "gujarat": "Gujarat",

        "punjab": "Punjab",

        "haryana": "Haryana",

        "delhi": "Delhi",
        "nct of delhi": "Delhi",
    }

    return mapping.get(value, state.strip())


# 4. Main extraction function

def extract_user_information(message: str) -> dict:

    if not message or not message.strip():
        return {}

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",

        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            },
            {
                "role": "user",
                "content": message.strip()
            }
        ],

        response_format={
            "type": "json_object"
        },

        temperature=0
    )

    content = response.choices[0].message.content


    # Parse JSON

    try:
        raw_data = json.loads(content)

    except json.JSONDecodeError:
        raise ValueError(
            "LLM returned invalid JSON"
        )

    # Validate structure

    validated = ExtractedUserData.model_validate(
        raw_data
    )

    # Normalize values


    data = validated.model_dump()

    data["intent"] = normalize_intent(
        data["intent"]
    )

    data["occupation"] = normalize_occupation(
        data["occupation"]
    )

    data["state"] = normalize_state(
        data["state"]
    )

    data["category"] = normalize_category(
        data["category"]
    )

    # Return only useful fields

    return {
        key: value
        for key, value in data.items()
        if value is not None
    }