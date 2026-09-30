'use client'; import { useEffect, useState } from 'react';
export default function Weather({ date }) {
    const [w, setW] = useState(null);
    useEffect(() => { fetch(`https://api.open-meteo.com/v1/forecast?latitude=19.07&longitude=72.88&daily=temperature_2m_max,precipitation_probability_max&timezone=Asia%2FKolkata&start_date=${date}&end_date=${date}`).then(r => r.json()).then(d => setW(d.daily ? { t: d.daily.temperature_2m_max[0], p: d.daily.precipitation_probability_max[0] } : null)).catch(() => { }) }, [date]);
    return w ? <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm">Forecast for the day: <b>{Math.round(w.t)}°C</b>, {w.p ?? 0}% chance of rain</p> : null
}
