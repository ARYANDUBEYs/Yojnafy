from models.conversation import UserProfile
from services.eligibility_engine import eligibility_engine
from services.pdf_generator import generate_scheme_pdf


# Test user
profile = UserProfile(
    intent="scholarship",
    age=20,
    occupation="student",
    income=200000,
    state="Uttar Pradesh",
    category="OBC"
)


# Find eligible schemes
matched_schemes = eligibility_engine.get_matching_schemes(
    profile.model_dump()
)


print("MATCHED SCHEMES:")

for scheme in matched_schemes:
    print("-", scheme["name"])


# Generate PDF
pdf_path = generate_scheme_pdf(
    profile,
    matched_schemes
)


print("\nPDF GENERATED:")
print(pdf_path)