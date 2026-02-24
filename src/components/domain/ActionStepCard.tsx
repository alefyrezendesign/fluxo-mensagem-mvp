import React, { useState } from 'react';
import { ClipboardList, Clock, ChevronDown, Target, ListChecks, ExternalLink, ChevronRight } from 'lucide-react';
import { Step, ActionItem } from '../../data/appData';
import { SmartText } from '../ui/SmartText';

export const ActionStepCard: React.FC<{ step: Step }> = ({ step }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative">
            <div className="bg-[#0d1a1a] border border-teal-800/50 rounded-2xl overflow-hidden mb-4 hover:border-teal-600/70 transition-colors">
                <button onClick={() => setOpen(o => !o)} className="w-full flex items-center gap-4 px-4 py-4 text-left">
                    {/* Icon — no step number for action steps */}
                    <div className="w-10 h-10 rounded-full bg-teal-900/50 border-2 border-teal-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(20,184,166,0.25)]">
                        <ClipboardList size={18} className="text-teal-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[9px] bg-teal-900/40 border border-teal-700/50 text-teal-400 font-black px-1.5 py-0.5 rounded tracking-wider inline-flex items-center gap-1">
                                <ClipboardList size={8} /> AÇÃO INTERNA
                            </span>
                        </div>
                        <div className="text-white font-bold text-base leading-tight">{step.title}</div>
                        <div className="mt-2 inline-flex items-center gap-1.5 bg-teal-900/30 border border-teal-800/50 text-teal-300 px-2.5 py-1 rounded-lg text-[11px] font-black">
                            <Clock size={11} className="flex-shrink-0" />
                            <span>{step.sendWhen}</span>
                        </div>
                    </div>
                    <ChevronDown size={18} className={`text-teal-500 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>

                {open && (
                    <div className="border-t border-teal-900/40 p-4 space-y-4">
                        {/* Goal */}
                        <div className="flex gap-2.5 p-3 bg-teal-900/10 rounded-xl border border-teal-900/30">
                            <Target size={14} className="text-teal-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-teal-500 mb-0.5">Objetivo</div>
                                <p className="text-slate-300 text-sm leading-relaxed">{step.goal}</p>
                            </div>
                        </div>

                        {/* Action Items: text items numbered, link items as clickable rows */}
                        {step.actionItems && step.actionItems.length > 0 && (
                            <div className="bg-[#0b1a18] border border-teal-800/40 rounded-2xl overflow-hidden">
                                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-teal-800/30">
                                    <ListChecks size={13} className="text-teal-400" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-teal-500">O que fazer</span>
                                </div>
                                <div className="divide-y divide-teal-900/20">
                                    {(() => {
                                        let textIdx = 0;
                                        return (step.actionItems as ActionItem[]).map((item, i) => {
                                            const isLink = typeof item === 'object';
                                            if (!isLink) textIdx++;
                                            return isLink ? (
                                                <a
                                                    key={i}
                                                    href={(item as { text: string; link: string; linkLabel?: string }).link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-teal-900/20 transition-colors group"
                                                >
                                                    <div className="w-5 h-5 rounded-full border-2 border-teal-600 bg-teal-800/50 flex items-center justify-center flex-shrink-0">
                                                        <ExternalLink size={9} className="text-teal-300" />
                                                    </div>
                                                    <span className="flex-1 text-teal-300 text-sm font-bold group-hover:text-teal-200 transition-colors">
                                                        {(item as { text: string; link: string; linkLabel?: string }).text}
                                                    </span>
                                                    {(item as { text: string; link: string; linkLabel?: string }).linkLabel && (
                                                        <span className="text-[10px] bg-teal-900/60 border border-teal-700/50 text-teal-400 px-2 py-0.5 rounded-full font-black tracking-wider whitespace-nowrap">
                                                            {(item as { text: string; link: string; linkLabel?: string }).linkLabel}
                                                        </span>
                                                    )}
                                                </a>
                                            ) : (
                                                <div key={i} className="flex items-start gap-3 px-4 py-3">
                                                    <div className="w-5 h-5 rounded-full border-2 border-teal-700/60 bg-teal-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <span className="text-[9px] font-black text-teal-400">{textIdx}</span>
                                                    </div>
                                                    <p className="text-slate-200 text-sm leading-relaxed"><SmartText text={item as string} /></p>
                                                </div>
                                            );
                                        });
                                    })()}
                                </div>
                            </div>
                        )}

                        {/* Next action */}
                        {step.internalAction && (
                            <div className="flex gap-2 p-3 bg-[#0b1a18] rounded-xl border border-teal-800/40">
                                <ChevronRight size={14} className="text-teal-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Próxima Ação</div>
                                    <p className="text-slate-300 text-sm leading-relaxed"><SmartText text={step.internalAction} /></p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
