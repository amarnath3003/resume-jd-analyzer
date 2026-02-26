import { Target } from "lucide-react";

export default function ImprovementPlan({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="glass-card border-l-4 border-l-white/60 p-6 relative overflow-hidden group">
        <h3 className="text-xl font-bold text-gradient mb-2 flex items-center gap-2">
          <Target className="w-5 h-5 opacity-80" /> Improvement Plan
        </h3>
        <p className="text-white/60 text-sm font-medium">No improvements needed.</p>
      </div>
    );
  }

  return (
    <section className="glass-card p-8 lg:p-10 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="mb-8 relative z-10 border-b border-white/10 pb-6">
        <h3 className="text-2xl font-bold text-gradient flex items-center gap-3 mb-2 tracking-tight">
          <Target className="w-6 h-6 opacity-80" /> Improvement Plan <span className="text-white/40 text-lg">({items.length} actions)</span>
        </h3>
        <p className="text-white/60 text-sm md:text-base font-medium">
          Here's what you can do to strengthen your application
        </p>
      </div>

      <div className="space-y-4 relative z-10 w-full flex flex-col items-center">
        {items.map((item, idx) => (
          <div key={idx} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/30 hover:-translate-y-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="text-gradient text-lg font-semibold leading-relaxed mb-4 relative z-10 tracking-tight">
              {item.action || item}
            </div>

            {item.linked_skill && (
              <div className="text-sm text-white/80 mb-5 bg-black/40 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 relative z-10 backdrop-blur-sm">
                <span className="opacity-60">Linked Skill:</span>
                <strong className="text-gradient font-semibold">{item.linked_skill}</strong>
              </div>
            )}

            <div className="flex flex-wrap gap-3 mt-2 relative z-10">
              {item.estimated_effort && (
                <div className="relative inline-flex group/badge rounded-full p-[1px] overflow-hidden z-10">
                  <div className={`absolute top-1/2 left-1/2 w-[400%] aspect-square -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] -z-10 blur-[1px] bg-[conic-gradient(from_0deg,${item.estimated_effort.toLowerCase() === 'high'
                    ? 'theme(colors.red.500),theme(colors.rose.400),theme(colors.red.500)'
                    : item.estimated_effort.toLowerCase() === 'medium'
                      ? 'theme(colors.yellow.500),theme(colors.amber.400),theme(colors.yellow.500)'
                      : 'theme(colors.blue.500),theme(colors.cyan.400),theme(colors.blue.500)'})]`}>
                  </div>
                  <span className="shrink-0 inline-flex items-center justify-center bg-zinc-950/90 text-white/70 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider h-full w-full">
                    {item.estimated_effort} effort
                  </span>
                </div>
              )}
              {item.resume_impact && (
                <div className="relative inline-flex group/badge rounded-full p-[1px] overflow-hidden z-10">
                  <div className={`absolute top-1/2 left-1/2 w-[400%] aspect-square -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] -z-10 blur-[1px] bg-[conic-gradient(from_0deg,${item.resume_impact.toLowerCase() === 'high'
                    ? 'theme(colors.green.500),theme(colors.emerald.400),theme(colors.green.500)'
                    : item.resume_impact.toLowerCase() === 'medium'
                      ? 'theme(colors.yellow.500),theme(colors.amber.400),theme(colors.yellow.500)'
                      : 'theme(colors.blue.500),theme(colors.cyan.400),theme(colors.blue.500)'})]`}>
                  </div>
                  <span className="shrink-0 inline-flex items-center justify-center bg-zinc-950/90 text-white/70 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider h-full w-full">
                    {item.resume_impact} impact
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
