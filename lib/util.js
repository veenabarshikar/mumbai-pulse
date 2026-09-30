export const CATS={Music:265,Workshops:200,Sports:150,Food:25,Networking:215,Art:330,Community:135};
export const LOCS=['Bandra','Colaba','Andheri','Juhu','Powai','Lower Parel','Kala Ghoda'];
export const inr=n=>n?'₹'+Number(n).toLocaleString('en-IN'):'Free';
export const fd=s=>new Date(s+'T00:00').toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'});
export const ft=t=>{const[h,m]=t.split(':');return `${(h%12)||12}:${m} ${h<12?'AM':'PM'}`};
export const left=e=>Math.max(0,e.totalSeats-e.booked);
export const grad=c=>{const h=CATS[c]??200;return `linear-gradient(135deg,hsl(${h} 65% 34%),hsl(${h+45} 75% 52%))`};
export const CATEGORY_ICONS = { Music: '🎵', Workshops: '🛠️', Sports: '🏃', Food: '🍜', Networking: '🤝', Art: '🎨', Community: '🌿' };
