# 📄 Resume–Job Description Analyzer (AI-Powered)

A full-stack generative AI application that analyzes a candidate’s resume against a job description, identifies skill alignment and gaps, and provides structured, recruiter-style feedback.
The system is live deployed and usable end-to-end.

## 🚀 Live Demo

Frontend (Vercel):
👉 https://resume-jd-analyzer-jhj7.vercel.app/

Backend API (Render – Swagger Docs):
👉 https://resume-jd-analyzer-backend.onrender.com/docs

---
![screenshots](/resume-jd-analyzer/src/assets/Firefly.jpg)



## Overview

This application allows users to upload a resume and a job description in PDF format and receive an AI-driven evaluation of how well the resume matches the role.  
The analysis focuses on evidence-based skill matching rather than keyword comparison.

---

## Features

- PDF upload for resume and job description
- Automated text extraction from documents
- AI-based structured resume analysis
- Overall match score (0–100)
- Strong skill matches with evidence
- Missing skills based on job requirements
- Weakly supported skills
- Actionable improvement plan
- Detailed recruiter-style final feedback
- Fully deployed frontend and backend

---

## Tech Stack

Frontend:
- React (Vite)
- Deployed on Vercel

Backend:
- FastAPI (Python)
- PDF parsing using pdfplumber
- Async API design
- Deployed on Render

AI:
- OpenRouter (OpenAI-compatible API)
- Model: meta-llama/llama-3-8b-instruct
- Strict JSON-based output validation

---

## Architecture

React Frontend (Vercel)  
→ FastAPI Backend (Render)  
→ OpenRouter LLM API

The frontend sends PDF files and metadata to the backend.  
The backend extracts text, performs AI analysis, validates the output schema, and returns structured results to the frontend.

---

## API Endpoint

POST /analyze

Inputs:
- resume_pdf (PDF)
- jd_pdf (PDF)
- experience_level
- role_type
- industry
- resume_source

Response:
- overall_match_score
- strong_matches
- missing_skills
- weak_evidence
- improvement_plan
- final_summary

Swagger documentation is available at /docs.

---

## Reliability and Design

- Strict schema validation for AI outputs
- Graceful fallback handling for model errors
- Clean API contracts between frontend and backend
- Environment variables used for secrets (not committed)
- Designed for real-world usage, not just demos

---

## Local Setup (Optional)

Backend:
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

Frontend:
cd frontend
npm install
npm run dev

---

## Author

Amarnath Devaraj  
Built as part of a full-stack AI technical assessment.
