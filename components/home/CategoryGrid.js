import Link from 'next/link';
import { CATEGORY_ICONS, CATS } from '@/lib/util';

const PALETTE = [
  { bg: '#8b35f5', fg: '#fff' },
  { bg: '#ff9a1c', fg: '#1d1200' },
  { bg: '#3ee800', fg: '#0a2200' },
  { bg: '#ff5cf0', fg: '#2a0027' },
];

export default function CategoryGrid({ events }) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">Browse by category</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Object.keys(CATS).map((category, index) => {
          const { bg, fg } = PALETTE[index % PALETTE.length];
          const count = events.filter((event) => event.category === category).length;
          return (
            <Link
              key={category}
              href={`/events?category=${category}`}
              className="cat-tile flex h-40 flex-col justify-between rounded-2xl p-4 font-bold"
              style={{ background: bg, color: fg, '--g': bg }}
            >
              <span className="text-3xl">{CATEGORY_ICONS[category]}</span>
              <span>
                <span className="block text-lg">{category}</span>
                <span className="mt-1 flex items-center justify-between">
                  <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-medium">{count} events</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-black">→</span>
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
