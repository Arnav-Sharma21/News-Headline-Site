import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function SearchOverlay({ isOpen, onClose, onSearch, searchQuery, theme }) {
  
  // Close the overlay if "Escape" is pressed
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Enter') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const overlayBg = {
    light: 'bg-japandi-cream/95',
    dark: 'bg-japandi-black/95',
    evening: 'bg-[#f4ecd8]/95'
  };

  return (
    <div className={`fixed inset-0 z-200 backdrop-blur-xl flex flex-col items-center justify-center p-10 animate-in fade-in zoom-in duration-500 ${overlayBg[theme]}`}>
      <button 
        onClick={onClose} 
        className="absolute top-10 right-10 p-2 hover:rotate-90 transition-transform duration-300"
      >
        <X size={48} strokeWidth={1} />
      </button>
      
      <div className="w-full max-w-4xl space-y-12">
        <h2 className="font-editorial italic text-7xl text-center opacity-20 select-none">
          Live Filter
        </h2>
        <input 
          autoFocus
          type="text"
          value={searchQuery}
          placeholder="Start typing..."
          className="w-full bg-transparent border-b-4 border-current py-8 text-7xl font-serif outline-none placeholder:opacity-10 text-center"
          onChange={(e) => onSearch(e.target.value)} // 🔍 Instant update
        />
        <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
          Press Enter to view filtered results
        </p>
      </div>
    </div>
  );
}