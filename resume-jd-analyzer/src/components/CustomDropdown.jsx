import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomDropdown({ options, value, onChange, label }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selectedOption = options.find(opt => opt.value === value);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex flex-col text-sm font-medium text-slate-300 relative" ref={dropdownRef}>
            <label className="mb-2 tracking-wide opacity-80">{label}</label>

            <div
                className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-white/30 hover:bg-white/10 transition-all cursor-pointer flex justify-between items-center backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-gradient font-medium pl-1">{selectedOption?.label || "Select an option"}</span>
                <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-gradient' : ''}`}
                />
            </div>

            {isOpen && (
                <div className="absolute top-[105%] left-0 w-full z-50 mt-2 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden dropdown-menu origin-top py-2">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`px-5 py-3.5 mx-2 rounded-xl cursor-pointer flex items-center justify-between transition-colors duration-200 ${option.value === value
                                    ? 'bg-white/10 text-gradient font-semibold'
                                    : 'text-slate-300 hover:bg-white/5 hover:text-gradient'
                                }`}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                        >
                            <span>{option.label}</span>
                            {option.value === value && <Check className="w-4 h-4 text-gradient" />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
