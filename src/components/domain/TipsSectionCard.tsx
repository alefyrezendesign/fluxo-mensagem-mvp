import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { TipSection } from '../../data/appData';

export const TipsSectionCard: React.FC<{ section: TipSection }> = ({ section }) => {
    const [openIdx, setOpenIdx] = useState<number | null>(null);
    return (
        <div className="bg-[#14102a] border border-purple-900/40 rounded-2xl overflow-hidden mb-4">
            <div className="px-4 py-4 border-b border-purple-900/30 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-700/40 flex items-center justify-center text-xl flex-shrink-0">
                    {section.emoji}
                </div>
                <div>
                    <div className="text-white font-bold text-base leading-tight">{section.title}</div>
                    <div className="text-slate-400 text-xs mt-0.5">{section.subtitle}</div>
                </div>
            </div>
            <div className="divide-y divide-purple-900/20">
                {section.items.map((item, idx) => (
                    <div key={idx}>
                        <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                            className="w-full flex items-center justify-between px-4 py-3.5 text-left">
                            <span className="text-slate-200 font-semibold text-sm">{item.title}</span>
                            <ChevronDown size={16} className={`text-purple-500 transition-transform flex-shrink-0 ml-2 ${openIdx === idx ? 'rotate-180' : ''}`} />
                        </button>
                        {openIdx === idx && (
                            <div className="px-4 pb-4">
                                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{item.body}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
