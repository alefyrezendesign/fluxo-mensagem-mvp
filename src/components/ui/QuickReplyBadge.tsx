import React from 'react';
import { Zap } from 'lucide-react';

export const QuickReplyBadge: React.FC<{ code: string }> = ({ code }) => (
    <div className="inline-flex items-center gap-1.5 bg-purple-900/40 border border-purple-700/40 text-purple-300 px-3 py-1.5 rounded-lg text-[11px] font-black tracking-widest">
        <Zap size={11} className="text-purple-400" />
        <span>Atalho WA Business:</span>
        <span className="font-mono bg-purple-900/60 px-1.5 py-0.5 rounded text-purple-200">{code}</span>
    </div>
);
