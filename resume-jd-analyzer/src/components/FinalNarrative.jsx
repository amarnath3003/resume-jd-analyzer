import { Sparkles } from "lucide-react";

export default function FinalNarrative({ text }) {
  return (
    <section className="glass-card p-10 md:p-14 mt-16 mb-8 relative overflow-hidden group">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>

      {/* Top Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-80 shadow-[0_0_15px_rgba(255,255,255,0.4)]"></div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gradient tracking-tight flex items-center justify-center gap-4 w-full">
          <Sparkles className="w-8 h-8 opacity-80" />
          <span>Final Verdict</span>
          <Sparkles className="w-8 h-8 opacity-80" />
        </h2>

        <div className="relative w-full group rounded-3xl p-[2px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
          {/* Spinning rainbow gradient for the border */}
          <div className="absolute top-1/2 left-1/2 w-[400%] aspect-square -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,theme(colors.purple.500),theme(colors.pink.500),theme(colors.orange.500),theme(colors.yellow.500),theme(colors.green.500),theme(colors.cyan.500),theme(colors.blue.500),theme(colors.purple.500))] animate-[spin_4s_linear_infinite] -z-10 blur-[2px]"></div>

          <div className="bg-zinc-950/90 backdrop-blur-xl rounded-[22px] border border-white/10 p-8 md:p-12 w-full h-full relative z-10 shadow-[inner_inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors duration-700">
            <p className="text-white/80 text-lg md:text-xl leading-relaxed md:leading-loose font-medium tracking-wide">
              {text || "Your analysis is complete. Review the sections above for detailed feedback to strengthen your application."}
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-0 -left-20 w-80 h-80 bg-white/5 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-0 -right-20 w-80 h-80 bg-white/5 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
    </section>
  );
}
