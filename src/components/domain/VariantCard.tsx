import React, { useState } from 'react';
import { ChevronDown, Tag, MessageSquare, Clock, ChevronRight } from 'lucide-react';
import { Variant, Step } from '../../data/appData';
import { MessageBlock } from '../ui/MessageBlock';
import { AttachmentRow } from '../ui/AttachmentRow';

export const VariantCard: React.FC<{ variant: Variant; nextMessageStep?: Step }> = ({ variant, nextMessageStep }) => {
    const [open, setOpen] = useState(false);
    const wtu = variant.whenToUse.toLowerCase();
    const isNegative = wtu.includes('ausente') || (wtu.includes('não') && !wtu.includes('congregar'));
    const isPink = variant.id === 'NC4V4';
    const isArte = wtu.includes('arte');
    const isCongrega = !isNegative && !isPink && (wtu.includes('quer') || wtu.includes('congregar'));
    const color = (isCongrega || isArte) ? 'emerald' : isPink ? 'pink' : isNegative ? 'rose' : 'blue';

    const colorMap: Record<string, string> = {
        emerald: 'border-emerald-500/70 bg-emerald-900/30',
        blue: 'border-blue-500/70 bg-blue-900/25',
        rose: 'border-orange-800/70 bg-[#4a1a10]',
        pink: 'border-pink-500/70 bg-pink-900/25',
    };
    const textMap: Record<string, string> = {
        emerald: 'text-emerald-300',
        blue: 'text-blue-300',
        rose: 'text-orange-400',
        pink: 'text-pink-300',
    };
    const badgeMap: Record<string, string> = {
        emerald: 'bg-emerald-900/70 border-emerald-500/60 text-emerald-200',
        blue: 'bg-blue-900/70 border-blue-500/60 text-blue-200',
        rose: 'bg-orange-950/80 border-orange-800/60 text-orange-300',
        pink: 'bg-pink-900/70 border-pink-500/60 text-pink-200',
    };

    return (
        <div className={`rounded-2xl border overflow-hidden ${colorMap[color]}`}>
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left">
                <div className="flex-1 min-w-0 mr-2">
                    <div className="mb-1">
                        {variant.quickReply
                            ? <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-slate-400">
                                Mensagem <span className={`font-mono border px-1.5 py-0.5 rounded text-[10px] font-black ${badgeMap[color]}`}>{variant.quickReply}</span>
                            </span>
                            : <span className={`text-[10px] font-black uppercase tracking-widest ${textMap[color]}`}>{variant.id}</span>
                        }
                    </div>
                    <span className="text-slate-200 text-sm font-semibold">{variant.whenToUse}</span>
                    {variant.tags && variant.tags.length > 0 && (
                        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                            <span className="text-[9px] text-slate-500 font-black uppercase tracking-wider">Tag atual:</span>
                            {variant.tags.map(t => (
                                <span key={t} className="inline-flex items-center gap-0.5 bg-[#1a1535] border border-purple-800/30 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    <Tag size={7} />{t}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <ChevronDown size={16} className={`text-slate-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="px-4 pb-4 space-y-3 border-t border-white/5 pt-3">
                    {variant.message && <MessageBlock message={variant.message} quickReply={variant.quickReply} />}
                    {(variant.attachments || []).map((a, i) => <AttachmentRow key={i} label={a.label} link={a.link} />)}
                    {/* Próximo passo — estruturado por variação */}
                    {((variant.tags && variant.id === 'NC4V4') || typeof variant.nextMessageId !== 'undefined' || nextMessageStep) && (
                        <div className="rounded-xl border border-purple-900/40 overflow-hidden bg-[#0f0c1e]">
                            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-purple-900/30">
                                <ChevronRight size={12} className="text-purple-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Próximo passo</span>
                            </div>
                            <div className="divide-y divide-purple-900/20">
                                {/* Trocar tags — explícito no NC4V4 ou só quando mudar no nextMessageStep */}
                                {variant.id === 'NC4V4' ? (
                                    <>
                                        <div className="flex items-start gap-2.5 px-3 py-2.5">
                                            <Tag size={12} className="text-sky-400 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-[9px] font-black uppercase tracking-wider text-slate-600 mb-1">Trocar tags para</div>
                                                <div className="flex flex-wrap gap-1">
                                                    <span className="inline-flex items-center gap-0.5 bg-sky-900/30 border border-sky-700/40 text-sky-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                        <Tag size={7} />Visitante
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2.5 px-3 py-2.5">
                                            <MessageSquare size={12} className="text-pink-400 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-[9px] font-black uppercase tracking-wider text-slate-600 mb-1">Mudança de fluxo</div>
                                                <div className="text-slate-300 text-xs font-semibold">Agora deve-se incluir ele no fluxo de visitantes e na lista de transmissão de visitantes.</div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    variant.tags && nextMessageStep && variant.tags.join(',') !== nextMessageStep.tags?.join(',') && (
                                        <div className="flex items-start gap-2.5 px-3 py-2.5">
                                            <Tag size={12} className="text-sky-400 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-[9px] font-black uppercase tracking-wider text-slate-600 mb-1">Trocar tags para</div>
                                                <div className="flex flex-wrap gap-1">
                                                    {nextMessageStep.tags.map(t => (
                                                        <span key={t} className="inline-flex items-center gap-0.5 bg-sky-900/30 border border-sky-700/40 text-sky-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                            <Tag size={7} />{t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                                {/* Próxima mensagem */}
                                {variant.id !== 'NC4V4' && variant.nextMessageId !== null && nextMessageStep && (
                                    <div className="flex items-start gap-2.5 px-3 py-2.5">
                                        <MessageSquare size={12} className="text-purple-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <div className="text-[9px] font-black uppercase tracking-wider text-slate-600 mb-1">Próxima mensagem</div>
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                {nextMessageStep.quickReply && (
                                                    <span className="font-mono bg-purple-900/60 border border-purple-700/50 text-purple-200 px-1.5 py-0.5 rounded text-[10px] font-black">{nextMessageStep.quickReply}</span>
                                                )}
                                                <span className="text-slate-300 text-xs font-semibold">{nextMessageStep.title}</span>
                                            </div>
                                            <div className="mt-1 flex items-center gap-1 text-red-300 text-[11px] font-bold">
                                                <Clock size={10} className="flex-shrink-0" />
                                                {nextMessageStep.sendWhen}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
