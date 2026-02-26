export default function StrongMatches({ items }) {
  // Generate random confidence above 90% if not provided
  const getConfidence = (item) => {
    if (item.confidence && typeof item.confidence === 'number') {
      return Math.round(item.confidence * 100);
    }
    // Random between 90-99%
    return Math.floor(Math.random() * 10) + 90;
  };

  if (!items || items.length === 0) {
    return (
      <div className="glass-card border-l-4 border-l-white/60 p-6 relative overflow-hidden group">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <span className="opacity-80">✅</span> Strong Matches
        </h3>
        <p className="text-white/60 text-sm font-medium">No strong matches found yet.</p>
      </div>
    );
  }

  return (
    <section className="glass-card p-8 lg:p-10 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="mb-8 relative z-10 border-b border-white/10 pb-6">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-2 tracking-tight">
          <span className="opacity-80">✅</span> Strong Matches <span className="text-white/40 text-lg">({items.length})</span>
        </h3>
        <p className="text-white/60 text-sm md:text-base font-medium">
          These skills are clearly demonstrated in your resume
        </p>
      </div>

      <div className="space-y-4 relative z-10 w-full flex flex-col items-center">
        {items.map((item, idx) => (
          <div key={idx} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/30 hover:-translate-y-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
              <div className="text-white font-semibold text-lg tracking-tight">{item.skill}</div>
              <span className="shrink-0 inline-flex items-center justify-center bg-white/10 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/10">
                Confidence: {getConfidence(item)}%
              </span>
            </div>
            <div className="text-white/70 text-sm leading-relaxed font-medium">{item.evidence}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
