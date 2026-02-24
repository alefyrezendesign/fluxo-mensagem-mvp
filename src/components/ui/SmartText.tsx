import React from 'react';
import { MessageSquare, Tag, Calendar } from 'lucide-react';

export const SmartText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
    // Regex: step codes | quoted strings (tags) | date/time phrases | [placeholders]
    const TOKEN = /\b((?:NC\d+[A-Z]?(?:-V\d+)?|VIS\d+(?:-V\d+)?)(?=\b))|"([^"]+)"|\b(\d+\s+dias?|próximo domingo|primeiro domingo|segundo domingo|terceiro domingo|dia seguinte|dias? úteis|quinta(?:-feira)?|sexta(?:-feira)?|segunda(?:-feira)?|domingo(?:s)?|\d+(?:h|min))|\[([^\]]+)\]/gi;

    const parts: React.ReactNode[] = [];
    let last = 0;
    let match: RegExpExecArray | null;

    while ((match = TOKEN.exec(text)) !== null) {
        if (match.index > last) parts.push(text.slice(last, match.index));

        if (match[1]) {
            // Step/variant code → emerald green message chip
            parts.push(
                <span key={match.index} className="inline-flex items-center gap-0.5 bg-emerald-900/30 border border-emerald-700/40 text-emerald-300 px-1.5 py-0.5 rounded-md text-[11px] font-black align-middle mx-0.5 leading-none">
                    <MessageSquare size={9} className="flex-shrink-0" />
                    {match[1]}
                </span>
            );
        } else if (match[2]) {
            // Quoted string → sky blue tag chip
            parts.push(
                <span key={match.index} className="inline-flex items-center gap-0.5 bg-sky-900/30 border border-sky-700/40 text-sky-300 px-1.5 py-0.5 rounded-md text-[11px] font-black align-middle mx-0.5 leading-none">
                    <Tag size={9} className="flex-shrink-0" />
                    {match[2]}
                </span>
            );
        } else if (match[3]) {
            // Date/time phrase → calendar chip (red)
            parts.push(
                <span key={match.index} className="inline-flex items-center gap-0.5 bg-red-900/25 border border-red-800/40 text-red-300 px-1.5 py-0.5 rounded-md text-[11px] font-black align-middle mx-0.5 leading-none">
                    <Calendar size={9} className="flex-shrink-0" />
                    {match[3]}
                </span>
            );
        } else if (match[4]) {
            // [placeholder] → slate chip
            parts.push(
                <span key={match.index} className="inline-flex items-center gap-0.5 bg-slate-800/60 border border-slate-600/40 text-slate-400 px-1.5 py-0.5 rounded-md text-[11px] font-black align-middle mx-0.5 leading-none">
                    {match[4]}
                </span>
            );
        }

        last = TOKEN.lastIndex;
    }

    if (last < text.length) parts.push(text.slice(last));

    return <span className={className}>{parts}</span>;
};
