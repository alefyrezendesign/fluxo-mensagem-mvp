import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { SmartText } from './SmartText';

export const DecisionNote: React.FC<{ note: string }> = ({ note }) => (
    <div className="bg-amber-900/20 border border-amber-700/40 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={14} className="text-amber-400 flex-shrink-0" />
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">Atenção — Esta etapa tem variações</span>
        </div>
        <p className="text-amber-200/80 text-sm leading-relaxed whitespace-pre-line">
            <SmartText text={note} />
        </p>
    </div>
);
