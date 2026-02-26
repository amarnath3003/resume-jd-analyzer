import { BarChart3, Check } from "lucide-react";

export default function ResultSummary({ result }) {
  const overallMatch = result?.overall_match_score || 0;
  const matchPercentage = typeof overallMatch === "number" ? overallMatch : parseInt(overallMatch) || 0;

  const getRecommendation = (percentage) => {
    if (percentage >= 80) return { text: "Excellent Match - Apply Now!", color: "#10b981" }; // Green snake
    if (percentage >= 60) return { text: "Good Match - Strong Candidate", color: "#22c55e" }; // Green snake
    if (percentage >= 40) return { text: "Fair Match - Address Key Gaps", color: "#eab308" }; // Yellow snake
    return { text: "Weak Match - Consider Alternatives", color: "#ef4444" }; // Red snake
  };

  const getOverallMatchStyles = (percentage) => {
    if (percentage >= 75) return { color: "#10b981" }; // Green
    if (percentage >= 50) return { color: "#eab308" }; // Yellow
    if (percentage >= 25) return { color: "#f97316" }; // Orange
    return { color: "#ef4444" }; // Red
  };

  const recommendation = getRecommendation(matchPercentage);
  const overallStyle = getOverallMatchStyles(matchPercentage);

  return (
    <div className="glass-card p-8 md:p-10 relative overflow-hidden group mb-12">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <h2 className="text-3xl font-bold text-gradient mb-8 flex items-center gap-3 relative z-10 tracking-tight">
        <BarChart3 className="w-8 h-8 opacity-80" /> Analysis Summary
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 relative z-10">
        <div className="relative group/box bg-zinc-950 rounded-2xl p-[1px] overflow-hidden text-center shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          {/* Fading snake line */}
          <div className="absolute top-1/2 left-1/2 w-[400%] aspect-square -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] opacity-90" style={{ background: `conic-gradient(from 0deg, transparent 0%, transparent 50%, ${overallStyle.color} 100%)` }}></div>
          <div className="bg-zinc-950 w-full h-full rounded-[15px] p-6 relative z-10 overflow-hidden">
            {/* Full uniform color fill on hover */}
            <div className="absolute inset-0 opacity-0 group-hover/box:opacity-20 transition-opacity duration-500 pointer-events-none" style={{ backgroundColor: overallStyle.color }}></div>
            <div className="relative z-10">
              <p className="text-4xl lg:text-5xl font-bold stats-value-gradient mb-2">{matchPercentage}%</p>
              <p className="text-xs text-white/50 uppercase tracking-[0.2em] font-medium">Overall Match</p>
            </div>
          </div>
        </div>
        <div className="relative group/box bg-zinc-950 rounded-2xl p-[1px] overflow-hidden text-center shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <div className="absolute top-1/2 left-1/2 w-[400%] aspect-square -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] opacity-90" style={{ background: `conic-gradient(from 0deg, transparent 0%, transparent 50%, #10b981 100%)` }}></div>
          <div className="bg-zinc-950 w-full h-full rounded-[15px] p-6 relative z-10 overflow-hidden">
            <div className="absolute inset-0 opacity-0 group-hover/box:opacity-20 transition-opacity duration-500 pointer-events-none" style={{ backgroundColor: "#10b981" }}></div>
            <div className="relative z-10">
              <p className="text-4xl lg:text-5xl font-bold text-gradient mb-2">{result?.strong_matches?.length || 0}</p>
              <p className="text-xs text-white/50 uppercase tracking-[0.2em] font-medium">Strong Matches</p>
            </div>
          </div>
        </div>
        <div className="relative group/box bg-zinc-950 rounded-2xl p-[1px] overflow-hidden text-center shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <div className="absolute top-1/2 left-1/2 w-[400%] aspect-square -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] opacity-90" style={{ background: `conic-gradient(from 0deg, transparent 0%, transparent 50%, #eab308 100%)` }}></div>
          <div className="bg-zinc-950 w-full h-full rounded-[15px] p-6 relative z-10 overflow-hidden">
            <div className="absolute inset-0 opacity-0 group-hover/box:opacity-20 transition-opacity duration-500 pointer-events-none" style={{ backgroundColor: "#eab308" }}></div>
            <div className="relative z-10">
              <p className="text-4xl lg:text-5xl font-bold text-gradient mb-2">{result?.missing_skills?.length || 0}</p>
              <p className="text-xs text-white/50 uppercase tracking-[0.2em] font-medium">Missing Skills</p>
            </div>
          </div>
        </div>
        <div className="relative group/box bg-zinc-950 rounded-2xl p-[1px] overflow-hidden text-center shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <div className="absolute top-1/2 left-1/2 w-[400%] aspect-square -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] opacity-90" style={{ background: `conic-gradient(from 0deg, transparent 0%, transparent 50%, #e11d48 100%)` }}></div>
          <div className="bg-zinc-950 w-full h-full rounded-[15px] p-6 relative z-10 overflow-hidden">
            <div className="absolute inset-0 opacity-0 group-hover/box:opacity-20 transition-opacity duration-500 pointer-events-none" style={{ backgroundColor: "#e11d48" }}></div>
            <div className="relative z-10">
              <p className="text-4xl lg:text-5xl font-bold text-gradient mb-2">{result?.weak_evidence?.length || 0}</p>
              <p className="text-xs text-white/50 uppercase tracking-[0.2em] font-medium">Weak Areas</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full bg-zinc-950 group/bar rounded-2xl p-[1px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.3)] mb-6 z-10">
        <div className="absolute top-1/2 left-1/2 w-[400%] aspect-square -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] opacity-90" style={{ background: `conic-gradient(from 0deg, transparent 0%, transparent 50%, ${recommendation.color} 100%)` }}></div>
        <div className="bg-zinc-950 w-full h-full rounded-[15px] p-6 md:p-8 relative z-10 text-center tracking-tight overflow-hidden text-xl font-semibold">
          {/* Full uniform color fill on hover */}
          <div className="absolute inset-0 opacity-0 group-hover/bar:opacity-20 transition-opacity duration-500 pointer-events-none" style={{ backgroundColor: recommendation.color }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-[100%] animate-[slideRight_3s_ease-in-out_infinite] pointer-events-none rounded-[15px] group-hover/bar:opacity-0 transition-opacity"></div>
          <div className="relative z-10 drop-shadow-md text-gradient">
            {recommendation.text}
          </div>
        </div>
      </div>
      <p className="text-white/60 text-sm md:text-base leading-relaxed relative z-10 text-center font-medium max-w-2xl mx-auto">
        Review the analysis below to understand your fit for this role.
      </p>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
    </div>
  );
}
