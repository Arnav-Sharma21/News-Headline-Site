import { NavLink } from 'react-router-dom';

const CATEGORIES = ['general', 'business', 'technology', 'entertainment', 'sports', 'science', 'health'];

export default function CategoryFilter({ theme }) {
    const navBg = {
        light: 'bg-japandi-cream',
        dark: 'bg-japandi-black',
        evening: 'bg-[#f4ecd8]'
    };

    return (
        <div className={`flex flex-wrap justify-center gap-x-10 gap-y-4 py-8 border-b border-current/10 sticky top-20.25 z-10 transition-all duration-700 ease-in-out ${navBg[theme]}`}>
            {CATEGORIES.map((cat) => (
                <NavLink
                    key={cat}
                    to={`/category/${cat}`}
                    className={({ isActive }) => `
                        text-lg font-editorial italic tracking-wide transition-all duration-300 relative pb-1
                        ${isActive 
                            ? 'text-red-600' 
                            : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100'}
                    `}
                >
                    {({ isActive }) => (
                        <>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            {isActive && (
                                <span className="absolute -bottom-2 left-0 right-0 w-1.5 h-1.5 bg-red-600 rounded-full mx-auto animate-in fade-in zoom-in" />
                            )}
                        </>
                    )}
                </NavLink>
            ))}
        </div>
    );
}