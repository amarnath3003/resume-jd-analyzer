export default function FinalNarrative({ text }) {
  return (
    <section className="glass-card p-10 md:p-14 mt-16 mb-8 relative overflow-hidden group">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>

      {/* Top Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-80 shadow-[0_0_15px_rgba(255,255,255,0.4)]"></div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white tracking-tight flex items-center justify-center gap-4 w-full">
          <span className="opacity-80">✨</span>
          <span>Final Verdict</span>
          <span className="opacity-80">✨</span>
        </h2>

        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 w-full shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.4)] group-hover:bg-white/[0.04] transition-colors duration-700">
          <p className="text-white/80 text-lg md:text-xl leading-relaxed md:leading-loose font-medium tracking-wide">
            {text || "Your analysis is complete. Review the sections above for detailed feedback to strengthen your application."}
          </p>
        </div>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-0 -left-20 w-80 h-80 bg-white/5 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-white/5 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
    </section>
  );
}
