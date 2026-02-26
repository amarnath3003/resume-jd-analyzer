import { BarChart3 } from "lucide-react";

export default function ResultSummary({ result }) {
  const overallMatch = result?.overall_match_score || 0;
  const matchPercentage = typeof overallMatch === "number" ? overallMatch : parseInt(overallMatch) || 0;

  const getRecommendation = (percentage) => {
    if (percentage >= 80) return "🎯 Excellent Match - Apply Now!";
    if (percentage >= 60) return "✅ Good Match - Strong Candidate";
    if (percentage >= 40) return "⚠️ Fair Match - Address Key Gaps";
    return "❌ Weak Match - Consider Alternatives";
  };

  return (
    <div className="glass-card p-8 md:p-10 relative overflow-hidden group mb-12">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3 relative z-10 tracking-tight">
        <BarChart3 className="w-8 h-8 opacity-80" /> Analysis Summary
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 relative z-10">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center transition-all duration-400 hover:border-white/30 hover:-translate-y-1 hover:bg-white/10 backdrop-blur-md">
          <p className="text-4xl lg:text-5xl font-bold stats-value-gradient mb-2">{matchPercentage}%</p>
          <p className="text-xs text-white/50 uppercase tracking-[0.2em] font-medium">Overall Match</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center transition-all duration-400 hover:border-white/30 hover:-translate-y-1 hover:bg-white/10 backdrop-blur-md">
          <p className="text-4xl lg:text-5xl font-bold text-white mb-2">{result?.strong_matches?.length || 0}</p>
          <p className="text-xs text-white/50 uppercase tracking-[0.2em] font-medium">Strong Matches</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center transition-all duration-400 hover:border-white/30 hover:-translate-y-1 hover:bg-white/10 backdrop-blur-md">
          <p className="text-4xl lg:text-5xl font-bold text-white mb-2">{result?.missing_skills?.length || 0}</p>
          <p className="text-xs text-white/50 uppercase tracking-[0.2em] font-medium">Missing Skills</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center transition-all duration-400 hover:border-white/30 hover:-translate-y-1 hover:bg-white/10 backdrop-blur-md">
          <p className="text-4xl lg:text-5xl font-bold text-white mb-2">{result?.weak_evidence?.length || 0}</p>
          <p className="text-xs text-white/50 uppercase tracking-[0.2em] font-medium">Weak Areas</p>
        </div>
      </div>

      <div className="text-xl font-semibold text-white mb-6 p-6 md:p-8 bg-white/10 border border-white/20 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] relative z-10 text-center tracking-tight">
        {getRecommendation(matchPercentage)}
      </div>
      <p className="text-white/60 text-sm md:text-base leading-relaxed relative z-10 text-center font-medium max-w-2xl mx-auto">
        Review the analysis below to understand your fit for this role.
      </p>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
    </div>
  );
}
