import './globals.css'; import './effects.css'; import CursorTrail from '@/components/CursorTrail'; import Link from 'next/link'; import ThemeToggle from '@/components/ThemeToggle';
export const metadata = { title: 'Mumbai Pulse – Events & Experiences', description: 'Discover events in Mumbai' };
const init = "try{var t=localStorage.getItem('mp_theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}";
export default function L({ children }) {
    return (
    <html lang="en" suppressHydrationWarning>
        <head>
            <script dangerouslySetInnerHTML={{ __html: init }} />
        </head>
        <body className="min-h-screen bg-slate-50 text-slate-900">
            <div className="glow-bg" aria-hidden="true">
                <i />
                <i />
                <i />
            </div>
            <CursorTrail />
        <header className="site-bar sticky top-0 z-20 backdrop-blur">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-3">
            <Link href="/" className="flex items-center gap-2 text-xl font-extrabold">
               <span className="h-3.5 w-3.5 rounded-full bg-amber-400 ring-4 ring-amber-400/30" />Mumbai 
               <span className="accent">Pulse</span>
            </Link>
            <nav className="flex items-center gap-1 text-sm font-medium">{[['/', 'Home'], ['/events', 'Events'], ['/favorites', '♥ Saved'], ['/admin', 'Admin']].map(([h, t]) => 
                <Link key={h} href={h} className="rounded-full px-3 py-2 hover:bg-white/15 md:px-4 md:text-base">{t}</Link>)}
                <ThemeToggle />
            </nav>
            </div>
            </header>
        <main>{children}</main>
        <footer className="site-bar mt-16 px-5 py-8 text-sm"><div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3"><p className="font-bold">Mumbai Pulse<span className="block font-normal opacity-80">Concerts, food, workshops and more across the city.</span></p><Link href="/events">All events</Link><Link href="/admin">Organiser admin</Link></div></footer></body></html>)
}
