# agent.py
import httpx
import json
import logging
from models import AnalysisResponse
from settings import OPENROUTER_API_KEY

logger = logging.getLogger(__name__)

MAX_CHARS = 6000
# hard cap to reduce token / JSON failures


class ResumeAnalysisAgent:
    """Agent for analyzing resumes against job descriptions"""

    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://openrouter.ai/api/v1"
        self.model = "meta-llama/llama-3-8b-instruct"

    async def analyze(
        self,
        resume_text: str,
        jd_text: str,
        context: dict
    ) -> AnalysisResponse:
        """
        Public entrypoint.
        Retries once automatically before falling back.
        """
        if not self.api_key:
            raise RuntimeError("OPENROUTER_API_KEY is not set. Please check your .env file.")

        def safe_truncate(text: str, max_len: int) -> str:
            if len(text) <= max_len:
                return text
            cut = text.rfind(' ', 0, max_len)
            return text[:cut] if cut != -1 else text[:max_len]

        # Trim inputs early & safely
        resume_text = safe_truncate(resume_text, MAX_CHARS)
        jd_text = safe_truncate(jd_text, MAX_CHARS)

        for attempt in range(2):  # max 2 attempts
            try:
                return await self._run_analysis(resume_text, jd_text, context)
            except Exception as e:
                logger.warning(
                    "Analysis attempt %d failed: %s",
                    attempt + 1,
                    str(e),
                )

        # Fail explicitly instead of returning dummy data
        logger.error("All analysis attempts failed.")
        raise RuntimeError("Failed to complete analysis after multiple attempts.")

    async def _run_analysis(
        self,
        resume_text: str,
        jd_text: str,
        context: dict
    ) -> AnalysisResponse:
        """
        Single analysis attempt.
        Raises on failure so caller can retry.
        """

        system_prompt = """You are an AI system that evaluates a resume against a job description.

You MUST follow ALL rules below strictly:

- Your response MUST be valid JSON.
- Your response MUST contain ONLY a single JSON object.
- Do NOT include explanations, markdown, headings, or text outside JSON.
- Do NOT wrap the JSON in code blocks.
- Do NOT include comments.

The JSON object MUST follow this schema exactly:

{
  "overall_match_score": number (0-100),
  "strong_matches": [
    {"skill": string, "evidence": string, "confidence": "high|medium|low"}
  ],
  "missing_skills": [
    {"skill": string, "importance": "critical|important|optional", "reason": string}
  ],
  "weak_evidence": [
    {"skill": string, "issue": string, "suggested_fix": string}
  ],
  "improvement_plan": [
    {
      "action": string,
      "linked_skill": string,
      "estimated_effort": "short|medium|long",
      "resume_impact": "high|medium|low"
    }
  ],
  "final_summary": string
}

For the final_summary field specifically:

You are an expert technical recruiter and hiring manager.

Write a detailed, professional final assessment based strictly on the analysis.
Do NOT introduce new skills or assumptions.
Do NOT rewrite the resume.
Do NOT give motivational or generic advice.

Structure final_summary as 2–3 concise paragraphs:
- Overall alignment and strengths
- Key gaps and risks
- Readiness outlook if gaps are addressed

Maintain a neutral, hiring-focused tone.
Limit final_summary to 150–180 words.

If information is missing, return empty arrays but still return valid JSON.
"""

        user_prompt = f"""Analyze this resume against the job description.

RESUME:
{resume_text}

JOB DESCRIPTION:
{jd_text}

CONTEXT:
- Experience Level: {context.get("experience_level")}
- Role Type: {context.get("role_type")}
- Industry: {context.get("industry")}
"""

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost",
            "X-Title": "Resume-JD-Analyzer",
        }

        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            "temperature": 0.1,
            "max_tokens": 2000,
            "response_format": { "type": "json_object" }
        }

        async with httpx.AsyncClient(timeout=40) as client:
            response = await client.post(
                f"{self.base_url}/chat/completions",
                headers=headers,
                json=payload,
            )

        if response.status_code != 200:
            logger.error(
                "OpenRouter error %s: %s",
                response.status_code,
                response.text,
            )
            raise RuntimeError("LLM request failed")

        result = response.json()
        content = result["choices"][0]["message"]["content"]

        logger.info("RAW MODEL OUTPUT:\n%s", content)

        # Extract JSON strictly
        start = content.find("{")
        end = content.rfind("}") + 1

        if start == -1 or end == -1:
            raise ValueError("No JSON object found in model output")

        try:
            data = json.loads(content[start:end])
        except json.decoder.JSONDecodeError:
            try:
                # Fallback to parse the entire content
                data = json.loads(content)
            except json.decoder.JSONDecodeError as e:
                raise ValueError(f"Failed to parse JSON from model output: {e}")

        # Let pydantic validate strictly
        return AnalysisResponse(**data)


# Single shared agent instance
agent = ResumeAnalysisAgent(OPENROUTER_API_KEY)
