export default function ImprovementPlan({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="glass-card border-l-4 border-l-white/60 p-6 relative overflow-hidden group">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <span className="opacity-80">🎯</span> Improvement Plan
        </h3>
        <p className="text-white/60 text-sm font-medium">No improvements needed.</p>
      </div>
    );
  }

  return (
    <section className="glass-card p-8 lg:p-10 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="mb-8 relative z-10 border-b border-white/10 pb-6">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-2 tracking-tight">
          <span className="opacity-80">🎯</span> Improvement Plan <span className="text-white/40 text-lg">({items.length} actions)</span>
        </h3>
        <p className="text-white/60 text-sm md:text-base font-medium">
          Here's what you can do to strengthen your application
        </p>
      </div>

      <div className="space-y-4 relative z-10 w-full flex flex-col items-center">
        {items.map((item, idx) => (
          <div key={idx} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/30 hover:-translate-y-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="text-white text-lg font-semibold leading-relaxed mb-4 relative z-10 tracking-tight">
              {item.action || item}
            </div>

            {item.linked_skill && (
              <div className="text-sm text-white/80 mb-5 bg-black/40 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 relative z-10 backdrop-blur-sm">
                <span className="opacity-60">Linked Skill:</span>
                <strong className="text-white font-semibold">{item.linked_skill}</strong>
              </div>
            )}

            <div className="flex flex-wrap gap-3 mt-2 relative z-10">
              {item.estimated_effort && (
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider relative z-10 border ${item.estimated_effort.toLowerCase() === 'high'
                    ? 'bg-white/20 text-white border-white/30'
                    : item.estimated_effort.toLowerCase() === 'medium'
                      ? 'bg-white/10 text-white/80 border-white/20'
                      : 'bg-transparent text-white/60 border-white/10'
                  }`}>
                  {item.estimated_effort} effort
                </span>
              )}
              {item.resume_impact && (
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider relative z-10 border ${item.resume_impact.toLowerCase() === 'high'
                    ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                    : item.resume_impact.toLowerCase() === 'medium'
                      ? 'bg-white/10 text-white/90 border-white/20'
                      : 'bg-transparent text-white/50 border-white/10'
                  }`}>
                  {item.resume_impact} impact
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
