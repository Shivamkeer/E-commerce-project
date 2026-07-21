"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiMic, FiSearch, FiX } from "react-icons/fi";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  compact?: boolean;
}

export default function SearchBar({ className, compact }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
      setOpen(false);
    }
  };

  const startVoiceSearch = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const SpeechRecognition = w.SpeechRecognition || w.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    setListening(true);
    recognition.onresult = (event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setOpen(true);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  return (
    <div ref={wrapperRef} className={cn("relative w-full", className)}>
      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center">
          <FiSearch className="pointer-events-none absolute left-4 text-slate-400" size={18} />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder={compact ? "Search..." : "Search products, brands, categories..."}
            className="w-full rounded-2xl border border-slate-200/80 bg-white/80 py-2.5 pl-11 pr-20 text-sm shadow-sm backdrop-blur-md outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900/80 dark:focus:border-indigo-400 md:py-3"
            aria-label="Search products"
            autoComplete="off"
          />
          <div className="absolute right-2 flex items-center gap-1">
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Clear search"
              >
                <FiX size={14} />
              </button>
            )}
            <button
              type="button"
              onClick={startVoiceSearch}
              className={cn(
                "rounded-lg p-1.5 transition-colors",
                listening
                  ? "bg-red-100 text-red-500"
                  : "text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950"
              )}
              aria-label="Voice search"
              title="Voice search"
            >
              <FiMic size={16} />
            </button>
          </div>
        </div>
      </form>

      {open && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/95">
          <ul role="listbox" aria-label="Search suggestions">
            {suggestions.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/products/${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-950/50"
                >
                  <span className="text-lg">{item.category === "mobiles" ? "📱" : "🛍️"}</span>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.brand} · {item.category}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              router.push(`/products?search=${encodeURIComponent(query)}`);
              setOpen(false);
            }}
            className="w-full border-t border-slate-100 px-4 py-2.5 text-left text-sm font-medium text-indigo-600 hover:bg-indigo-50 dark:border-slate-800 dark:hover:bg-indigo-950/50"
          >
            View all results for &quot;{query}&quot;
          </button>
        </div>
      )}
    </div>
  );
}
