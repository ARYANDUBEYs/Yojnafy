import json
import os

SCHEMES_PATH = os.path.join(os.path.dirname(__file__), "schemes.json")

def load_schemes():
    with open(SCHEMES_PATH, "r") as f:
        return json.load(f)

def check_eligibility(user, scheme):
    if user["age"] < scheme["min_age"] or user["age"] > scheme["max_age"]:
        return False

    if user["income"] > scheme["max_income"]:
        return False

    if scheme["occupation"] != "all" and user["occupation"] != scheme["occupation"]:
        return False

    if scheme["state"] != "all" and user["state"] != scheme["state"]:
        return False

    # User's intent must match the scheme category
    if scheme["category"] != "all" and user["intent"] != scheme["category"]:
        return False

    return True

def get_matching_schemes(user):
    schemes = load_schemes()
    return [s for s in schemes if check_eligibility(user, s)]