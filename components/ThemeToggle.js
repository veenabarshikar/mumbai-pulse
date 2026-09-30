'use client'; import { useEffect, useState } from 'react';
export default function ThemeToggle() {
    const [d, setD] = useState(false);
    useEffect(() => setD(document.documentElement.classList.contains('dark')), []);
    const t = () => { const n = !d; setD(n); document.documentElement.classList.toggle('dark', n); try { localStorage.setItem('mp_theme', n ? 'dark' : 'light') } catch { } };
    return <button onClick={t} aria-label="Toggle dark mode" className="rounded-full px-3 py-2 hover:bg-white/15">{d ? '☀️' : '🌙'}</button>
}
