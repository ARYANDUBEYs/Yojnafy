from fastapi import FastAPI
import json

app = FastAPI()

def load_schemes():
    with open("schemes.json", "r") as f:#open json file in r mode i.e. read-mode
        return json.load(f)#loads the file in temprory file f
    
def check_eligibility(user, scheme):
    if user["age"] < scheme["min_age"] or user["age"] > scheme["max_age"]:
        return False
    if user["income"] > scheme["max_income"]:
        return False
    if scheme["occupation"] != "all" and user["occupation"] != scheme["occupation"]:
        return False
    if scheme["state"] != "all" and user["state"] != scheme["state"]:
        return False
    return True

@app.get("/")
def read_root():
    return {"message": "Backend is running"}

@app.get("/schemes")
def get_schemes():
    schemes = load_schemes()
    return schemes

@app.get("/match")
def match_schemes(age: int, income: int, occupation: str, state: str):
    user = {
        "age": age,
        "income": income,
        "occupation": occupation,
        "state": state
    }
    schemes = load_schemes()
    matched = [s for s in schemes if check_eligibility(user, s)]
    return matched