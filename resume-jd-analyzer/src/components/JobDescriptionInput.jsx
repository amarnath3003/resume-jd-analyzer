import { useState } from "react";

export default function JobDescriptionInput({ setJdFile }) {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (file) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be under 5MB");
      return;
    }

    if (file) {
      if (file.type === "application/pdf") {
        setJdFile(file);
        setFileName(file.name);
      } else {
        alert("Please upload a PDF file");
        setFileName("");
      }
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFileChange(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full relative">
      <div
        className={`w-full rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 border border-dashed relative z-10 overflow-hidden ${dragActive
          ? "border-white bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)] scale-[1.02]"
          : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
          }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="jd-input"
          accept=".pdf"
          onChange={handleChange}
          className="hidden"
        />
        <label htmlFor="jd-input" className="cursor-pointer flex flex-col items-center justify-center w-full h-full m-0 min-h-[120px]">
          <div className="text-3xl mb-4 transition-transform duration-300 group-hover:-translate-y-2 opacity-80">
            {fileName ? "📄" : "📥"}
          </div>
          <div className="text-white font-medium mb-2 text-center transition-colors">
            {fileName ? (
              <span className="font-semibold text-lg flex items-center justify-center gap-2">
                {fileName}
              </span>
            ) : "Drop job description PDF here"}
          </div>
          <div className="text-xs text-slate-400 font-medium tracking-wide">
            or click to browse files
          </div>
        </label>
      </div>
    </div>
  );
}
