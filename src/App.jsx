import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainStory from './components/MainStory';
import SidebarItem from './components/SidebarItem';
import CategoryFilter from './components/CategoryFilter';
import SearchOverlay from './components/SearchOverlay'; 

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

function NewsGallery({ readArticles, toggleRead, searchQuery, setSearchQuery }) {
  const { categoryId } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        // We only fetch based on Category for Live Filtering
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=${categoryId || 'general'}&apiKey=${API_KEY}`
        );
        if (!res.ok) throw new Error('API request failed');
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        setError("Failed to fetch news.");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [categoryId]); // 🔍 Only re-fetch when category changes

  // 🔍 Real-Time Filtering Logic (Option 1)
  const filteredArticles = articles.filter(art => 
    art.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="text-center py-20 font-editorial italic text-3xl animate-pulse">Consulting the Archives...</div>;

  return (
    <>
      {searchQuery && (
        <div className="mb-12 flex justify-between items-end border-b border-current/10 pb-6">
          <h2 className="font-editorial italic text-4xl opacity-70">
            Filtering for: <span className="not-italic font-bold underline decoration-red-600">{searchQuery}</span>
          </h2>
          <button onClick={() => setSearchQuery("")} className="text-[10px] font-black uppercase tracking-widest text-red-600 border border-red-600 px-4 py-2 hover:bg-red-600 hover:text-white transition-all">
            Clear Filter
          </button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 animate-in fade-in duration-700 pb-20">
        {filteredArticles.length > 0 ? (
          <>
            <MainStory
              article={filteredArticles[0]}
              isRead={readArticles.has(filteredArticles[0]?.url)}
              isExpanded={expandedId === 0}
              onToggleExpand={() => setExpandedId(expandedId === 0 ? null : 0)}
              onToggleRead={() => filteredArticles[0] && toggleRead(filteredArticles[0].url)}
            />
            <div className="md:col-span-4 space-y-8 md:border-l md:pl-10 border-current/10">
              <h3 className="font-editorial italic text-3xl border-b border-current/20 pb-3 mb-8">Latest Updates</h3>
              {filteredArticles.slice(1, 8).map((article, idx) => (
                <SidebarItem
                  key={article.url}
                  article={article}
                  isRead={readArticles.has(article.url)}
                  isExpanded={expandedId === idx + 1}
                  onToggleExpand={() => setExpandedId(expandedId === idx + 1 ? null : idx + 1)}
                  onToggleRead={() => toggleRead(article.url)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="col-span-12 text-center py-40 font-editorial italic text-2xl opacity-40">
            No headlines on the desk match "{searchQuery}"
          </div>
        )}
      </div>
    </>
  );
}

export default function App() {
  const [readArticles, setReadArticles] = useState(() => {
    const saved = localStorage.getItem('readArticles');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('readArticles', JSON.stringify([...readArticles]));
  }, [readArticles]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleRead = (url) => {
    const newSet = new Set(readArticles);
    newSet.has(url) ? newSet.delete(url) : newSet.add(url);
    setReadArticles(newSet);
  };

  const themeStyles = {
    light: 'bg-japandi-cream text-zinc-900',
    dark: 'bg-japandi-black text-zinc-100 dark',
    evening: 'bg-[#f4ecd8] text-[#1a2b3c] theme-evening'
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ease-in-out ${themeStyles[theme]}`}>
      <Navbar 
        theme={theme} 
        setTheme={setTheme} 
        readCount={readArticles.size} 
        onOpenSearch={() => setIsSearchOpen(true)} 
      />
      <CategoryFilter theme={theme} />
      
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onSearch={(query) => setSearchQuery(query)}
        searchQuery={searchQuery}
        theme={theme}
      />

      <main className="max-w-7xl mx-auto p-6 mt-8">
        <Routes>
          <Route path="/" element={<Navigate to="/category/general" replace />} />
          <Route path="/category/:categoryId" element={
            <NewsGallery 
              readArticles={readArticles} 
              toggleRead={toggleRead} 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          } />
        </Routes>
      </main>
    </div>
  );
}