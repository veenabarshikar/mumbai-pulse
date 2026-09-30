'use client'; import { useEffect, useState } from 'react'; import QRCode from 'qrcode';
export default function Qr({ text }) {
    const [u, setU] = useState(''); useEffect(() => { QRCode.toDataURL(text, { width: 180, margin: 1 }).then(setU) }, [text]);
    return u ? <img src={u} alt={`QR code for booking ${text}`} width="180" height="180" className="mx-auto rounded-lg bg-white p-1" /> : null
}
