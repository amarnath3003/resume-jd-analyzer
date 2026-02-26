from pydantic import BaseModel, field_validator
from typing import List, Literal


class StrongMatch(BaseModel):
    skill: str
    evidence: str
    confidence: Literal["high", "medium", "low"]

    @field_validator("confidence", mode="before")
    @classmethod
    def lowercase_confidence(cls, v):
        return v.lower() if isinstance(v, str) else v


class MissingSkill(BaseModel):
    skill: str
    importance: Literal["critical", "important", "optional"]
    reason: str

    @field_validator("importance", mode="before")
    @classmethod
    def lowercase_importance(cls, v):
        return v.lower() if isinstance(v, str) else v


class WeakEvidence(BaseModel):
    skill: str
    issue: str
    suggested_fix: str


class ImprovementItem(BaseModel):
    action: str
    linked_skill: str
    estimated_effort: Literal["short", "medium", "long"]
    resume_impact: Literal["high", "medium", "low"]

    @field_validator("estimated_effort", "resume_impact", mode="before")
    @classmethod
    def lowercase_enums(cls, v):
        return v.lower() if isinstance(v, str) else v


class AnalysisResponse(BaseModel):
    overall_match_score: int

    strong_matches: List[StrongMatch]
    missing_skills: List[MissingSkill]
    weak_evidence: List[WeakEvidence]
    improvement_plan: List[ImprovementItem]

    final_summary: str
