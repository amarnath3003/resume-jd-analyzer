from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from starlette.concurrency import run_in_threadpool

from pdf_utils import extract_text_from_pdf
from agent import agent

app = FastAPI(title="Resume–JD Analyzer API")

# CORS (open for assessment / local dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/analyze")
async def analyze_resume(
    resume_pdf: UploadFile = File(...),
    jd_pdf: UploadFile = File(...),

    experience_level: str = Form(...),
    role_type: str = Form(...),
    industry: str = Form(...),
    resume_source: str = Form(...)
):
    # 1️⃣ Validate file types
    if resume_pdf.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Resume must be a PDF file")

    if jd_pdf.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Job description must be a PDF file")

    # 2️⃣ Extract text from PDFs
    try:
        resume_bytes = await resume_pdf.read()
        jd_bytes = await jd_pdf.read()
        resume_text = await run_in_threadpool(extract_text_from_pdf, resume_bytes)
        jd_text = await run_in_threadpool(extract_text_from_pdf, jd_bytes)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    # 3️⃣ Build context for agent
    context = {
        "experience_level": experience_level,
        "role_type": role_type,
        "industry": industry,
        "resume_source": resume_source,
    }

    # 4️⃣ Run analysis agent
    try:
        result = await agent.analyze(
            resume_text=resume_text,
            jd_text=jd_text,
            context=context
        )
        return result

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to analyze resume against job description: {str(e)}"
        )
