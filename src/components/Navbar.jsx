import { Search, Moon, Sun, Coffee } from 'lucide-react';

export default function Navbar({ theme, setTheme, readCount, onOpenSearch }) {
  const toggleTheme = () => {
    const cycle = { light: 'evening', evening: 'dark', dark: 'light' };
    setTheme(cycle[theme]);
  };

  const ThemeIcon = () => {
    if (theme === 'light') return <Sun size={18} />;
    if (theme === 'evening') return <Coffee size={18} />;
    return <Moon size={18} />;
  };

  const navBg = {
    light: 'bg-japandi-cream',
    dark: 'bg-japandi-black',
    evening: 'bg-[#f4ecd8]'
  };

  return (
    <nav className={`border-b border-current/10 px-6 py-4 flex justify-between items-center sticky top-0 z-10 transition-all duration-700 ease-in-out ${navBg[theme]}`}>
      <h1 className="text-5xl font-editorial italic tracking-tight">The News</h1>
      
      <div className="flex items-center gap-6">
        <button 
          onClick={onOpenSearch} 
          className="p-2 hover:bg-current/5 rounded-full transition-all group"
        >
          <Search size={20} className="opacity-50 group-hover:opacity-100 group-hover:text-red-600 transition-all" />
        </button>

        <button onClick={toggleTheme} className="flex items-center gap-2 p-2 hover:bg-current/5 rounded-full transition-all capitalize text-[10px] font-black tracking-widest">
          <ThemeIcon /> {theme}
        </button>

        <div className="font-editorial italic text-base border-l border-current/20 pl-4 py-1 hidden md:block">
          Articles Read: <span className="font-bold not-italic">{readCount}</span>
        </div>
      </div>
    </nav>
  );
}