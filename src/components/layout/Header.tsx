import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Tab } from '../../App';

export const Header: React.FC<{ tab: Tab; onBack: () => void }> = ({ tab, onBack }) => {
    const titles: Record<Tab, string> = {
        home: 'Fluxo de Integração',
        visitors: 'Visitantes',
        newconvert: 'Novos Convertidos',
        tips: 'Dicas de Uso',
    };
    return (
        <div className="sticky top-0 z-40 bg-[#0b0918]/95 backdrop-blur-xl border-b border-purple-900/40 px-4 py-3.5 flex items-center gap-3">
            {tab !== 'home' && (
                <button onClick={onBack} title="Voltar" aria-label="Voltar" className="w-9 h-9 rounded-xl border border-purple-800/50 flex items-center justify-center text-slate-400 hover:text-purple-400 hover:border-purple-600 transition-all">
                    <ArrowLeft size={18} />
                </button>
            )}
            <div className="flex-1">
                <div className="text-[10px] font-black uppercase tracking-widest text-purple-600 leading-none mb-0.5">MVP</div>
                <h1 className="text-base font-black text-white leading-tight">{titles[tab]}</h1>
            </div>
            <img src="/logo.png" alt="Logo MVP" className="rounded-full object-cover flex-shrink-0 shadow-[0_0_12px_rgba(139,92,246,0.4)] w-8 h-8 min-w-[32px] min-h-[32px]" />
        </div>
    );
};
