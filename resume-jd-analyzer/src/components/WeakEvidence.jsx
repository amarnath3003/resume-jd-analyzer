import { AlertTriangle, Lightbulb } from "lucide-react";

export default function WeakEvidence({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="glass-card border-l-4 border-l-white/60 p-6 relative overflow-hidden group">
        <h3 className="text-xl font-bold text-gradient mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 opacity-80" /> Weak Evidence
        </h3>
        <p className="text-white/60 text-sm font-medium">No weakly supported skills found.</p>
      </div>
    );
  }

  return (
    <section className="glass-card p-8 lg:p-10 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="mb-8 relative z-10 border-b border-white/10 pb-6">
        <h3 className="text-2xl font-bold text-gradient flex items-center gap-3 mb-2 tracking-tight">
          <AlertTriangle className="w-6 h-6 opacity-80" /> Weak Evidence <span className="text-white/40 text-lg">({items.length})</span>
        </h3>
        <p className="text-white/60 text-sm md:text-base font-medium">
          These skills are mentioned but lack strong supporting evidence
        </p>
      </div>

      <div className="space-y-4 relative z-10 w-full flex flex-col items-center">
        {items.map((item, idx) => (
          <div key={idx} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/30 hover:-translate-y-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="text-gradient font-semibold text-lg tracking-tight mb-2">{item.skill}</div>
            <div className="text-white/70 text-sm leading-relaxed font-medium mb-4">{item.issue || item.reason}</div>
            {item.suggested_fix && (
              <div className="mt-2 p-4 bg-black/40 rounded-xl border border-white/10 text-sm text-white/80 flex items-start gap-3 relative z-10 backdrop-blur-md">
                <Lightbulb className="w-4 h-4 opacity-80 shrink-0 mt-0.5" />
                <span className="leading-snug">{item.suggested_fix}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
