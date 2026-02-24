import React from 'react';
import { CopyButton } from './CopyButton';
import { QuickReplyBadge } from './QuickReplyBadge';

export const MessageBlock: React.FC<{ message: string; quickReply?: string; label?: string }> = ({ message, quickReply, label }) => (
    <div className="bg-[#0f0c1e] border border-purple-900/50 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-purple-900/40">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.8)]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label || 'Mensagem WhatsApp'}</span>
            </div>
            <CopyButton text={message} small />
        </div>
        <div className="px-4 py-4 text-slate-200 text-[14px] leading-relaxed whitespace-pre-wrap font-medium">
            {message}
        </div>
        {quickReply && (
            <div className="px-4 pb-3">
                <QuickReplyBadge code={quickReply} />
            </div>
        )}
    </div>
);
