import React from 'react';
import { Video, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

export const AttachmentRow: React.FC<{ label: string; link: string }> = ({ label, link }) => {
    const hasLink = link && link.trim() !== '';
    return (
        <div className={`flex items-center gap-3 p-3 rounded-xl border ${hasLink ? 'bg-[#1a1535] border-purple-700/50 cursor-pointer hover:border-purple-500' : 'bg-[#111] border-slate-800 opacity-60'}`}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-purple-900/40 flex-shrink-0">
                {label.toLowerCase().includes('vídeo') || label.toLowerCase().includes('video')
                    ? <Video size={16} className="text-purple-400" />
                    : <ImageIcon size={16} className="text-blue-400" />}
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-0.5">Anexo</div>
                <div className="text-slate-300 text-sm font-semibold truncate">{label}</div>
            </div>
            {hasLink
                ? <a href={link} target="_blank" rel="noreferrer" title="Abrir anexo"><LinkIcon size={15} className="text-purple-400" /></a>
                : <span className="text-[10px] text-slate-600 font-bold uppercase">Em breve</span>
            }
        </div>
    );
};
