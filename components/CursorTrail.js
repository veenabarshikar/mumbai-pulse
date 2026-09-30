'use client'; import { useEffect, useRef } from 'react';
// Glowing cursor tail. Off on touch screens and for people who prefer reduced motion.
export default function CursorTrail() {
    const r = useRef(null);
    useEffect(() => {
        if (!matchMedia('(pointer:fine)').matches || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
        const c = r.current, x = c.getContext('2d'), P = [], L = 380; let w, h, id;
        const size = () => { w = c.width = innerWidth; h = c.height = innerHeight }; size();
        const mv = e => P.push({ x: e.clientX, y: e.clientY, t: performance.now() });
        addEventListener('resize', size); addEventListener('mousemove', mv);
        const draw = n => {
            x.clearRect(0, 0, w, h); while (P.length && n - P[0].t > L) P.shift(); x.lineCap = 'round'; x.lineJoin = 'round';
            for (let i = 1; i < P.length; i++) {
                const k = 1 - (n - P[i].t) / L, dk = document.documentElement.classList.contains('dark'), col = dk ? `hsl(${280 + (1 - k) * 110} 100% 62%)` : `hsl(${205 + (1 - k) * 25} 100% 55%)`;
                x.strokeStyle = col; x.shadowColor = col; x.shadowBlur = 18 * k; x.lineWidth = 2 + 7 * k; x.globalAlpha = Math.max(k, 0);
                x.beginPath(); x.moveTo(P[i - 1].x, P[i - 1].y); x.lineTo(P[i].x, P[i].y); x.stroke()
            }
            id = requestAnimationFrame(draw)
        }; id = requestAnimationFrame(draw);
        return () => { cancelAnimationFrame(id); removeEventListener('resize', size); removeEventListener('mousemove', mv) }
    }, []);
    return <canvas ref={r} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]" />
}
