import json
import os


class EligibilityEngine:

    def __init__(self):
        # Look for schemes.json in person_b_chat
        self.schemes_path = os.path.join(
            os.path.dirname(os.path.dirname(__file__)),
            "schemes.json"
        )

        self.schemes = self.load_schemes()

    def load_schemes(self):
        with open(self.schemes_path, "r", encoding="utf-8") as f:
            return json.load(f)

    def check_eligibility(self, user, scheme):

        # Age
        if user["age"] < scheme["min_age"]:
            return False

        if user["age"] > scheme["max_age"]:
            return False

        # Income
        if user["income"] > scheme["max_income"]:
            return False

        # Occupation
        if (
            scheme["occupation"] != "all"
            and user["occupation"].lower() != scheme["occupation"].lower()
        ):
            return False

        # State
        if (
            scheme["state"] != "all"
            and user["state"].lower() != scheme["state"].lower()
        ):
            return False

        return True

    def get_matching_schemes(self, user):

        matched = []

        for scheme in self.schemes:

            if self.check_eligibility(user, scheme):
                matched.append(scheme)

        return matched


eligibility_engine = EligibilityEngine()