from services.eligibility_engine import eligibility_engine


user = {
    "age": 20,
    "occupation": "student",
    "income": 200000,
    "state": "Uttar Pradesh",
    "category": "OBC"
}


matched = eligibility_engine.get_matching_schemes(user)


print("\nMATCHED SCHEMES:")

for scheme in matched:
    print(
        f"- {scheme['name']}"
    )