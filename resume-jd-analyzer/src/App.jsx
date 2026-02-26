import { useState } from "react";
import { analyzeResume } from "./api";
import { FileText, Target, Sparkles, AlertTriangle } from "lucide-react";
import "./index.css"; // Ensure we're importing tailwind

import ResumeInput from "./components/ResumeInput";
import JobDescriptionInput from "./components/JobDescriptionInput";
import LoadingState from "./components/LoadingState";
import ResultSummary from "./components/ResultSummary";
import StrongMatches from "./components/StrongMatches";
import MissingSkills from "./components/MissingSkills";
import WeakEvidence from "./components/WeakEvidence";
import ImprovementPlan from "./components/ImprovementPlan";
import FinalNarrative from "./components/FinalNarrative";
import CustomDropdown from "./components/CustomDropdown";
import CustomCombobox from "./components/CustomCombobox";

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);

  const [experienceLevel, setExperienceLevel] = useState("junior");
  const [roleType, setRoleType] = useState("Frontend Engineer"); // Defaults updated to match selected label
  const [industry, setIndustry] = useState("General SaaS"); // Defaults updated to match selected label
  const [resumeSource, setResumeSource] = useState("professional");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const data = await analyzeResume({
        resumeFile,
        jdFile,
        experienceLevel,
        roleType,
        industry,
        resumeSource
      });
      setResult(data);
    } catch (err) {
      setError(err.message || "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || !resumeFile || !jdFile;

  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-white/20 selection:text-gradient pb-20">
      {/* Background Decorative Glass Panes imitating the reference image */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] hero-glass-pane rotate-12 opacity-40 -z-10 pointer-events-none blur-[2px]"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] hero-glass-pane -rotate-12 opacity-30 -z-10 pointer-events-none blur-[1px]"></div>
      <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full border border-white/5 bg-white/[0.02] shadow-[0_0_80px_rgba(255,255,255,0.03)] -z-10 blur-3xl pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 z-10 relative">
        {/* HEADER */}
        <div className="text-center mb-16 animate-[slideDown_0.6s_ease-out]">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tighter glass-text drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Resume / JD Analysis
          </h1>
          <p className="text-slate-400/80 text-lg md:text-xl max-w-2xl mx-auto font-medium tracking-wide">
            Upload your resume and the target job description to uncover missing skills, measure alignment, and gain instantly actionable feedback.
          </p>
        </div>

        {/* INPUT SECTION */}
        <section className="mb-12 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="glass-card p-6 md:p-8">
              <h2 className="text-gradient text-xl font-semibold mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-white/50" /> Your Resume
              </h2>
              <ResumeInput setResumeFile={setResumeFile} />
            </div>
            <div className="glass-card p-6 md:p-8">
              <h2 className="text-gradient text-xl font-semibold mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-white/50" /> Target JD
              </h2>
              <JobDescriptionInput setJdFile={setJdFile} />
            </div>
          </div>

          {/* CONTEXT DROPDOWNS */}
          <div className="glass-card mb-10 z-30 relative overflow-visible p-6 md:p-8">
            <h2 className="text-gradient text-lg font-semibold mb-6 border-b border-white/10 pb-4">Analysis Context</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <CustomDropdown
                label="Experience Level"
                value={experienceLevel}
                onChange={setExperienceLevel}
                options={[
                  { value: "junior", label: "Junior (0–2 yrs)" },
                  { value: "mid", label: "Mid (2–5 yrs)" },
                  { value: "senior", label: "Senior (5+ yrs)" }
                ]}
              />
              <CustomCombobox
                label="Target Role"
                value={roleType}
                onChange={setRoleType}
                options={[
                  { value: "Backend Engineer", label: "Backend Engineer" },
                  { value: "Frontend Engineer", label: "Frontend Engineer" },
                  { value: "Full-Stack Engineer", label: "Full-Stack Engineer" },
                  { value: "ML Engineer", label: "ML Engineer" },
                  { value: "Data Engineer", label: "Data Engineer" },
                  { value: "DevOps Engineer", label: "DevOps Engineer" }
                ]}
              />
              <CustomCombobox
                label="Industry"
                value={industry}
                onChange={setIndustry}
                options={[
                  { value: "General SaaS", label: "General SaaS" },
                  { value: "Fintech", label: "Fintech" },
                  { value: "E-commerce", label: "E-commerce" },
                  { value: "Healthcare", label: "Healthcare" },
                  { value: "Enterprise / B2B", label: "Enterprise / B2B" },
                  { value: "Startup", label: "Startup" }
                ]}
              />
              <CustomDropdown
                label="Resume Type"
                value={resumeSource}
                onChange={setResumeSource}
                options={[
                  { value: "academic", label: "Academic / Student" },
                  { value: "professional", label: "Professional" },
                  { value: "portfolio", label: "Portfolio / Projects" }
                ]}
              />
            </div>
          </div>

          {/* ANALYZE BUTTON */}
          <div className="flex justify-center mt-8 relative w-full max-w-md mx-auto rounded-xl p-[1px] overflow-hidden group/btn shadow-[0_0_40px_rgba(255,255,255,0.1)]">
            {/* Spinning white gradient for the button border */}
            <div className="absolute top-1/2 left-1/2 w-[400%] aspect-square -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.8),transparent)] animate-[spin_2s_linear_infinite] -z-10 blur-[1px]"></div>

            <button
              className="w-full bg-zinc-950/90 rounded-[11px] py-4 px-6 flex items-center justify-center gap-3 transition-colors duration-500 hover:bg-zinc-900/90 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleAnalyze}
              disabled={isDisabled}
            >
              {loading ? (
                <span className="flex items-center gap-3 text-gradient tracking-wide text-lg font-medium">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Analyzing Profile...
                </span>
              ) : (
                <span className="flex items-center gap-2 group-disabled/btn:opacity-50 tracking-wide text-lg text-gradient font-medium">
                  <Sparkles className="w-5 h-5 opacity-70 group-hover/btn:opacity-100 transition-opacity" />
                  Generate Analysis
                </span>
              )}
            </button>
          </div>
        </section>

        {/* STATES */}
        {loading && <LoadingState />}
        {error && (
          <div className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-xl my-6 backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <p className="text-red-400 font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" /> {error}
            </p>
          </div>
        )}

        {/* RESULTS */}
        {result && (
          <div className="mt-12 space-y-8 animate-[fadeInUp_0.8s_ease-out]">
            <ResultSummary result={result} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <StrongMatches items={result.strong_matches} />
                <WeakEvidence items={result.weak_evidence} />
              </div>
              <div className="space-y-8">
                <MissingSkills items={result.missing_skills} />
                <ImprovementPlan items={result.improvement_plan} />
              </div>
            </div>

            <FinalNarrative text={result.final_summary} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
