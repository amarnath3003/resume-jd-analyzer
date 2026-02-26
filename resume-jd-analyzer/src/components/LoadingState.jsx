export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-dark/60 backdrop-blur-md rounded-2xl border border-accent/20 shadow-[0_0_30px_rgba(168,85,247,0.1)] my-8">
      {/* Outer Rotating Ring */}
      <div className="relative w-20 h-20 flex items-center justify-center mb-6">
        <div className="absolute inset-0 rounded-full border-t-4 border-l-4 border-transparent border-t-accent border-l-accent-glow animate-spin drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]"></div>
        {/* Inner Pulsing Core */}
        <div className="w-10 h-10 bg-accent rounded-full animate-ping opacity-75"></div>
        <div className="absolute w-10 h-10 bg-accent rounded-full"></div>
      </div>

      <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-glow to-accent animate-pulse text-center drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
        Analyzing resume against job requirements…
      </p>
      <p className="text-slate-400 text-sm mt-2 text-center">This usually takes a few seconds.</p>
    </div>
  );
}
