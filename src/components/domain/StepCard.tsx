import React, { useState } from 'react';
import { Step } from '../../data/appData';
import { ActionStepCard } from './ActionStepCard';
import { Tag, ChevronDown, Clock, Target, ChevronRight, ClipboardList, MessageSquare } from 'lucide-react';
import { DecisionNote } from '../ui/DecisionNote';
import { MessageBlock } from '../ui/MessageBlock';
import { VariantCard } from './VariantCard';
import { AttachmentRow } from '../ui/AttachmentRow';

export const StepCard: React.FC<{ step: Step; index: number; nextMessageStep?: Step }> = ({ step, index, nextMessageStep }) => {
    // Route action-only steps to the dedicated component (no index needed)
    if (step.isActionStep) return <ActionStepCard step={step} />;
    const [open, setOpen] = useState(false);
    return (
        <div className="relative">
            {/* Timeline connector */}
            <div className="bg-[#14102a] border border-purple-900/40 rounded-2xl overflow-hidden mb-4 hover:border-purple-700/60 transition-colors">
                <button onClick={() => setOpen(o => !o)} className="w-full flex items-center gap-4 px-4 py-4 text-left">
                    {/* Index circle */}
                    <div className="w-10 h-10 rounded-full bg-[#1e1845] border-2 border-purple-600 flex items-center justify-center flex-shrink-0 text-purple-300 font-black text-sm shadow-[0_0_12px_rgba(139,92,246,0.3)]">
                        {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                            {step.quickReply
                                ? <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-slate-400">
                                    Mensagem <span className="font-mono bg-purple-900/60 border border-purple-700/50 text-purple-200 px-1.5 py-0.5 rounded text-[10px]">{step.quickReply}</span>
                                </span>
                                : <span className="text-[10px] font-black text-purple-500 tracking-widest">{step.id}</span>
                            }
                            {step.hasVariants && <span className="text-[9px] bg-amber-900/40 border border-amber-700/40 text-amber-400 font-black px-1.5 py-0.5 rounded tracking-wider">VARIAÇÕES</span>}
                        </div>
                        <div className="text-white font-bold text-base leading-tight">{step.title}</div>
                        <div className="mt-2 inline-flex items-center gap-1.5 bg-red-900/30 border border-red-800/50 text-red-300 px-2.5 py-1 rounded-lg text-[11px] font-black">
                            <Clock size={11} className="flex-shrink-0" />
                            <span>{step.sendWhen}</span>
                        </div>
                        {!step.hasVariants && step.tags && step.tags.length > 0 && (
                            <div className="mt-2 flex flex-wrap items-center gap-1.5">
                                <span className="text-[9px] text-slate-500 font-black uppercase tracking-wider">Tag atual:</span>
                                {step.tags.map(t => (
                                    <span key={t} className="inline-flex items-center gap-0.5 bg-[#1a1535] border border-purple-800/30 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                        <Tag size={7} />{t}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    <ChevronDown size={18} className={`text-purple-500 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>

                {open && (
                    <div className="border-t border-purple-900/30 p-4 space-y-4">
                        {/* Goal */}
                        <div className="flex gap-2.5 p-3 bg-purple-900/10 rounded-xl border border-purple-900/30">
                            <Target size={14} className="text-purple-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-purple-500 mb-0.5">Objetivo</div>
                                <p className="text-slate-300 text-sm leading-relaxed">{step.goal}</p>
                            </div>
                        </div>

                        {/* Decision note */}
                        {step.decisionNote && <DecisionNote note={step.decisionNote} />}

                        {/* Single message (no variants) */}
                        {!step.hasVariants && step.message && (
                            <MessageBlock message={step.message} quickReply={step.quickReply} />
                        )}

                        {/* Variants */}
                        {step.hasVariants && step.variants && (
                            <div className="space-y-2">
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Escolha a variação:</div>
                                {step.variants.map(v => <VariantCard key={v.id} variant={v} nextMessageStep={nextMessageStep} />)}
                            </div>
                        )}

                        {/* Attachments (single message) */}
                        {!step.hasVariants && (step.attachments || []).map((a, i) => <AttachmentRow key={i} label={a.label} link={a.link} />)}

                        {/* Próximo passo — estruturado */}
                        {!step.hasVariants && (step.internalAction || nextMessageStep) && (
                            <div className="rounded-xl border border-purple-900/40 overflow-hidden bg-[#0f0c1e]">
                                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-purple-900/30">
                                    <ChevronRight size={12} className="text-purple-400" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Próximo passo</span>
                                </div>
                                <div className="divide-y divide-purple-900/20">
                                    {/* Tag change — só quando mudar */}
                                    {nextMessageStep && step.tags?.join(',') !== nextMessageStep.tags?.join(',') && (
                                        <div className="flex items-start gap-2.5 px-3 py-2.5">
                                            <Tag size={12} className="text-purple-400 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-[9px] font-black uppercase tracking-wider text-slate-600 mb-1">Trocar tags para</div>
                                                <div className="flex flex-wrap gap-1">
                                                    {nextMessageStep.tags.map(t => (
                                                        <span key={t} className="inline-flex items-center gap-0.5 bg-sky-900/40 border border-sky-700/40 text-sky-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                            <Tag size={7} />{t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {step.internalAction && (
                                        <div className="flex items-center gap-2.5 px-3 py-2.5">
                                            <ClipboardList size={12} className="text-teal-400 flex-shrink-0" />
                                            <div>
                                                <div className="text-[9px] font-black uppercase tracking-wider text-slate-600 mb-0.5">Ação interna</div>
                                                <span className="text-teal-300 text-xs font-bold">{step.internalAction}</span>
                                            </div>
                                        </div>
                                    )}
                                    {/* Próxima mensagem + prazo */}
                                    {nextMessageStep && (
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
        </div>
    );
};
