import React from 'react';
import { tipSections } from '../data/appData';
import { TipsSectionCard } from '../components/domain/TipsSectionCard';

export const TipsView: React.FC = () => (
    <div className="pb-6">
        <div className="mb-6 px-1">
            <div className="text-[11px] font-black uppercase tracking-widest text-purple-500 mb-1">Manual Operacional</div>
            <h2 className="text-2xl font-black text-white leading-tight">Dicas de Uso</h2>
            <p className="text-slate-400 text-sm mt-1.5">Guia prático para secretárias do MVP usando WhatsApp e WhatsApp Business.</p>
        </div>
        {tipSections.map(s => <TipsSectionCard key={s.id} section={s} />)}
    </div>
);
