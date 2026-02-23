import { ArrowUpRight } from 'lucide-react';

export default function SidebarItem({ article, isRead, isExpanded, onToggleExpand, onToggleRead }) {
  if (!article) return null;

  // ⏱️ Reading Time Estimator
  const words = article.description ? article.description.split(' ').length : 0;
  const readTime = Math.ceil(words / 200) || 1;

  return (
    <div 
      className="group cursor-pointer border-b border-current/10 pb-8 last:border-0 transition-opacity" 
      onClick={onToggleExpand}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-red-600">
          {article.source.name}
        </span>
        <span className="text-[10px] font-editorial italic opacity-40 lowercase">
          {readTime} min read
        </span>
      </div>
      
      {/* Headline with Read State opacity toggle */}
      <h4 className={`font-serif text-2xl font-bold leading-tight transition-all duration-500
        ${isRead ? 'opacity-20' : 'opacity-100 group-hover:opacity-70'}`}>
        {article.title}
      </h4>
      
      {/* Expandable Content */}
      {isExpanded && (
        <div className="mt-4 animate-in fade-in duration-300 space-y-4">
          <p className="text-sm opacity-70 leading-relaxed font-sans">
            {article.description}
          </p>
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest hover:text-red-600 transition-colors"
          >
            Read Full Story <ArrowUpRight size={12} />
          </a>
        </div>
      )}
      
      <div className="mt-6">
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleRead(); }}
          className={`text-[9px] font-black uppercase tracking-widest border-b border-current pb-1 transition-all
            ${isRead ? 'opacity-20' : 'opacity-100 hover:text-red-600 hover:border-red-600'}`}
        >
          {isRead ? "Done" : "Mark Read"}
        </button>
      </div>
    </div>
  );
}