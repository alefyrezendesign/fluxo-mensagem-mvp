import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const CopyButton: React.FC<{ text: string; small?: boolean }> = ({ text, small }) => {
    const [copied, setCopied] = useState(false);

    const handle = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // silently fail or handle error
        }
    };

    return (
        <button onClick={handle}
            className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-wider transition-all active:scale-95 rounded-xl border ${copied
                ? 'bg-emerald-500 border-emerald-400 text-white'
                : 'bg-[#2a2050] border-purple-700/50 text-purple-300 hover:bg-purple-700/30 hover:border-purple-500'
                } ${small ? 'text-[10px] px-2.5 py-1.5' : 'text-[11px] px-3.5 py-2'}`}>
            {copied ? <Check size={12} /> : <Copy size={12} />}
            <span>{copied ? 'Copiado!' : 'Copiar'}</span>
        </button>
    );
};
