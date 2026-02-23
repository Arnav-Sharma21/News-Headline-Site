import { CheckCircle, ExternalLink } from 'lucide-react';

export default function MainStory({ article, isRead, isExpanded, onToggleExpand, onToggleRead }) {
  if (!article) return null;

  // ⏱️ Reading Time Estimator: 200 words per minute
  const words = article.description ? article.description.split(' ').length : 0;
  const readTime = Math.ceil(words / 200) || 1;

  return (
    <div className="md:col-span-8 group cursor-pointer" onClick={onToggleExpand}>
      <div className="relative overflow-hidden rounded-sm border border-current/5 shadow-sm">
        <img
          src={article.urlToImage || 'https://via.placeholder.com/800x450'}
          className="w-full aspect-video object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
          alt="headline"
        />

        {/* News Origin Badge & Read Time */}
        <div className="absolute top-4 left-4 bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 px-3 py-1 text-[10px] font-black uppercase tracking-widest flex gap-3 items-center">
          <span>{article.source.name}</span>
          <span className="opacity-50 font-editorial italic normal-case tracking-normal border-l border-white/20 dark:border-black/20 pl-2">
            {readTime} min read
          </span>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {/* Headline: Uses opacity for Read State persistence */}
        <h2 className={`text-5xl font-serif font-bold leading-[1.1] transition-all duration-500 
          ${isRead ? 'opacity-30' : 'opacity-100'}`}>
          {article.title}
        </h2>

        {/* Conditional Rendering: Expanded Description & Full Link */}
        {isExpanded && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-6">
            <p className="text-xl font-light leading-relaxed opacity-80 font-sans">
              {article.description}
            </p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all shadow-md"
            >
              Read Full Story <ExternalLink size={14} />
            </a>
          </div>
        )}

        <div className="flex items-center gap-6 pt-4">
          <button
            onClick={(e) => { e.stopPropagation(); onToggleRead(); }}
            className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-opacity
              ${isRead ? 'opacity-40' : 'opacity-100 hover:text-red-600'}`}
          >
            <CheckCircle size={14} /> {isRead ? "Article Read" : "Mark as Read"}
          </button>
        </div>
      </div>
    </div>
  );
}