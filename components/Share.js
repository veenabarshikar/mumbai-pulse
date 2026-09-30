'use client'; import { useState } from 'react';
export default function Share({ title }) {
    const [m, setM] = useState('');
    async function go() { const url = location.href; try { if (navigator.share) { await navigator.share({ title, url }); return } await navigator.clipboard.writeText(url); setM('Link copied!'); setTimeout(() => setM(''), 2000) } catch { } }
    return <button onClick={go} className="btn btn-ghost block w-full">{m || 'Share this event'}</button>
}
