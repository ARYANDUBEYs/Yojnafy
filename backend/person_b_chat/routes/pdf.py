from pathlib import Path

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

router = APIRouter(
    prefix="/pdf",
    tags=["PDF"]
)

PDF_DIR = Path(__file__).resolve().parent.parent / "generated_pdfs"


@router.get("/{filename}")
def download_pdf(filename: str):

    pdf_path = PDF_DIR / filename

    if not pdf_path.exists():
        raise HTTPException(
            status_code=404,
            detail="PDF not found"
        )

    return FileResponse(
        path=pdf_path,
        media_type="application/pdf",
        filename=filename
    )