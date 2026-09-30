// Marine Drive, Mumbai. Day: blue sky, glass towers, sparkles, yachts. Night: glowing lights and yachts.
const rnd = (s => () => (s = (s * 16807) % 2147483647) / 2147483647)(7);
const arc = x => { const t = x / 1200; return 400 - 320 * t * (1 - t) };
const B = Array.from({ length: 44 }, (_, i) => {
    const x = i * 27 + rnd() * 4, w = 20 + rnd() * 8, h = 45 + rnd() * 100 * (1.3 - Math.abs(i - 22) / 40);
    return { x, w, h, y: arc(x + w / 2), win: Array.from({ length: 5 }, () => ({ dx: 1 + rnd() * (w - 5), dy: 5 + rnd() * (h - 12), on: rnd() > .35 })) }
});
const S = Array.from({ length: 60 }, () => ({ x: rnd() * 1200, y: rnd() * 230, r: .6 + rnd() * 1.4 }));
const SP = 'M0-8L2-2L8 0L2 2L0 8L-2 2L-8 0L-2-2Z';
const KB = B.filter((_, i) => i % 2 === 0).map(b => [b.x + b.w * rnd(), b.y - b.h * (.15 + .8 * rnd())]);
const KS = Array.from({ length: 22 }, () => [rnd() * 1200, 385 + rnd() * 110]);
const YS = [[330, 410, .6], [190, 435, 1], [830, 440, .9], [500, 462, 1.35], [1030, 470, 1.2]];
const V = (id, a, b) => <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">{a.map((c, i) => <stop key={i} offset={b[i]} stopColor={c} />)}</linearGradient>;
const D = { stroke: '#ffd36b', strokeDasharray: '0.1 13', strokeLinecap: 'round' };
const Yacht = ({ x, y, s, n }) => <g transform={`translate(${x} ${y}) scale(${s})`}>
    {n ? <><path d="M-30 0H30L22 10H-22Z" fill="#1a1550" stroke="#ff5cf0" /><path d="M0-46V0" stroke="#8b9dff" /><path d="M0-44V-4L-22-4Z" fill="#221a6a" stroke="#8b9dff" strokeWidth=".8" /><path d="M4-40V-4L26-4Z" fill="#221a6a" stroke="#8b9dff" strokeWidth=".8" />
        <g filter="url(#gl)" className="glowp"><circle cx="0" cy="-48" r="5" fill="#ff5cf0" /><circle cx="-14" cy="-3" r="5" fill="#ffd36b" /><circle cx="14" cy="-3" r="5" fill="#3ee8ff" /><path d="M-26 6H26" stroke="#ff9a1c" strokeWidth="4" /><path d="M0 16V46M-14 16V34M14 16V38" stroke="#ffd36b" strokeWidth="3" opacity=".6" /></g></>
        : <><path d="M0-46V0" stroke="#7a8794" strokeWidth="1.2" /><path d="M0-44V-4L-22-4Z" fill="#fff" /><path d="M4-40V-4L26-4Z" fill="#e4f2ff" /><path d="M-30 0H30L22 10H-22Z" fill="#fff" /><path d="M-27 3H27" stroke="#1e7fe0" strokeWidth="2" /><ellipse cx="0" cy="14" rx="30" ry="3" fill="#fff" opacity=".4" /></>}</g>;
const Sp = ({ p, i, c }) => <g transform={`translate(${p[0]} ${p[1]}) scale(${.6 + (i % 3) * .3})`}><path className="spk" d={SP} fill={c} style={{ animationDelay: `${(i % 9) * .35}s` }} /></g>;
export default function MarineDrive() {
    return (
        <svg viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" role="img" aria-label="Marine Drive in Mumbai, shown by day and by night">
            <defs>{V('skd', ['#0f6fdc', '#3d9cf0', '#8fd0ff', '#d9f0ff'], [0, .45, .8, 1])}{V('skn', ['#0a0620', '#2a1160', '#8a2f9a'], [0, .6, 1])}{V('sed', ['#2b9be0', '#0d5aa8'], [0, 1])}{V('sen', ['#1a1258', '#05061a'], [0, 1])}
                <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#a8dcff" /><stop offset=".35" stopColor="#3f8fe0" /><stop offset=".6" stopColor="#b8ecff" /><stop offset="1" stopColor="#2a6fc0" /></linearGradient>
                <linearGradient id="shine" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".75" /><stop offset=".4" stopColor="#fff" stopOpacity=".05" /><stop offset=".7" stopColor="#fff" stopOpacity=".35" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
                <linearGradient id="ng" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2a1c78" /><stop offset="1" stopColor="#0d0830" /></linearGradient>
                <pattern id="wg" width="6" height="8" patternUnits="userSpaceOnUse"><rect width="5" height="7" fill="#fff" opacity=".22" /></pattern>
                <radialGradient id="sun"><stop offset="0" stopColor="#fffbe0" /><stop offset="1" stopColor="#ffe9a0" stopOpacity="0" /></radialGradient>
                <radialGradient id="moon"><stop offset=".3" stopColor="#c9b8ff" stopOpacity=".9" /><stop offset="1" stopColor="#c9b8ff" stopOpacity="0" /></radialGradient>
                <filter id="gl" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4" /></filter><filter id="gs" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.5" /></filter>
                <path id="arc" d="M0 400 Q600 240 1200 400" fill="none" /></defs>
            <g className="md-day"><rect width="1200" height="500" fill="url(#skd)" /><circle cx="930" cy="110" r="140" fill="url(#sun)" /><circle cx="930" cy="110" r="34" fill="#fffbe0" />
                <g fill="#fff" opacity=".9"><ellipse cx="240" cy="95" rx="75" ry="16" /><ellipse cx="295" cy="82" rx="48" ry="15" /><ellipse cx="640" cy="160" rx="85" ry="14" /><ellipse cx="1080" cy="215" rx="60" ry="11" /></g>
                {B.map((b, i) => <g key={i}><rect x={b.x} y={b.y - b.h} width={b.w} height={b.h + 6} fill="url(#glass)" /><rect x={b.x} y={b.y - b.h} width={b.w} height={b.h + 6} fill="url(#wg)" /><rect x={b.x} y={b.y - b.h} width={b.w} height={b.h + 6} fill="url(#shine)" /></g>)}
                <path d="M0 400 Q600 240 1200 400 L1200 500 L0 500Z" fill="url(#sed)" /><use href="#arc" stroke="#fff4dc" strokeWidth="6" />
                {YS.map((y, i) => <Yacht key={i} x={y[0]} y={y[1]} s={y[2]} />)}
                {KB.map((p, i) => <Sp key={'b' + i} p={p} i={i} c="#fff" />)}{KS.map((p, i) => <Sp key={'s' + i} p={p} i={i + 3} c="#e8f6ff" />)}</g>
            <g className="md-night"><rect width="1200" height="500" fill="url(#skn)" />
                {S.map((s, i) => <circle key={i} className="star" cx={s.x} cy={s.y} r={s.r} fill="#fff" style={{ animationDelay: `${(i % 7) * .4}s` }} />)}
                <circle cx="930" cy="115" r="100" fill="url(#moon)" className="glowp" /><circle cx="930" cy="115" r="30" fill="#f4f0ff" />
                {B.map((b, i) => <rect key={i} x={b.x} y={b.y - b.h} width={b.w} height={b.h + 6} fill="url(#ng)" stroke="#a06bff" strokeOpacity=".45" strokeWidth=".8" />)}
                <g id="wins">{B.map((b, i) => b.win.map((w, j) => w.on && <rect key={i + '-' + j} x={b.x + w.dx} y={b.y - b.h + w.dy} width="3" height="4" fill="#ffd36b" />))}</g><use href="#wins" filter="url(#gs)" className="glowp" />
                <path d="M0 400 Q600 240 1200 400 L1200 500 L0 500Z" fill="url(#sen)" />
                <use href="#arc" transform="translate(0,30)" {...D} strokeWidth="5" opacity=".4" filter="url(#gl)" /><use href="#arc" transform="translate(0,58)" {...D} strokeWidth="5" opacity=".2" filter="url(#gl)" />
                <use href="#arc" {...D} strokeWidth="12" opacity=".85" filter="url(#gl)" className="glowp" /><use href="#arc" {...D} strokeWidth="5" stroke="#fff3c4" />
                {YS.map((y, i) => <Yacht key={i} x={y[0]} y={y[1]} s={y[2]} n />)}</g>
        </svg>)
}
