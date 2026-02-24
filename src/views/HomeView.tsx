import React from 'react';
import { Users, UserCheck, Lightbulb, ChevronRight } from 'lucide-react';
import { Tab } from '../App';

export const HomeView: React.FC<{ onNav: (tab: Tab) => void }> = ({ onNav }) => (
    <div className="flex flex-col items-center pb-10">
        {/* Hero */}
        <div className="w-full text-center py-10 px-4 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-transparent rounded-3xl pointer-events-none" />
            <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 bg-purple-900/50 border border-purple-700/50 text-purple-300 px-4 py-1.5 rounded-full text-[11px] font-black tracking-widest uppercase mb-5">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                    Ministério Visão e Propósito
                </div>
                <h1 className="text-3xl font-black text-white leading-tight mb-3">
                    Fluxo de Mensagens<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Integração MVP</span>
                </h1>
                <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
                    Guia Operacional de Acompanhamento para Secretárias do MVP.
                </p>
            </div>
        </div>

        {/* Nav Cards */}
        <div className="w-full space-y-3 px-1">
            <button onClick={() => onNav('visitors')}
                className="w-full flex items-center gap-4 bg-[#14102a] border border-purple-900/50 rounded-2xl p-5 text-left hover:border-purple-600 hover:bg-[#1c1640] transition-all active:scale-[0.98] group">
                <div className="w-14 h-14 rounded-xl bg-blue-900/40 border border-blue-700/40 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-800/40 transition-colors">
                    <Users size={24} className="text-blue-400" />
                </div>
                <div className="flex-1">
                    <div className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-0.5">Fluxo 01</div>
                    <div className="text-white font-black text-lg leading-tight">Visitantes</div>
                    <div className="text-slate-400 text-xs mt-0.5">5 etapas · Primeiro contato até decisão</div>
                </div>
                <ChevronRight size={18} className="text-slate-500 group-hover:text-purple-400 transition-colors" />
            </button>

            <button onClick={() => onNav('newconvert')}
                className="w-full flex items-center gap-4 bg-[#14102a] border border-purple-900/50 rounded-2xl p-5 text-left hover:border-purple-600 hover:bg-[#1c1640] transition-all active:scale-[0.98] group">
                <div className="w-14 h-14 rounded-xl bg-purple-900/40 border border-purple-700/40 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-800/40 transition-colors">
                    <UserCheck size={24} className="text-purple-400" />
                </div>
                <div className="flex-1">
                    <div className="text-[10px] font-black uppercase tracking-widest text-purple-500 mb-0.5">Fluxo 02</div>
                    <div className="text-white font-black text-lg leading-tight">Novos Convertidos</div>
                    <div className="text-slate-400 text-xs mt-0.5">10 etapas · Conversão até integração ministerial</div>
                </div>
                <ChevronRight size={18} className="text-slate-500 group-hover:text-purple-400 transition-colors" />
            </button>

            <button onClick={() => onNav('tips')}
                className="w-full flex items-center gap-4 bg-[#14102a] border border-purple-900/50 rounded-2xl p-5 text-left hover:border-purple-600 hover:bg-[#1c1640] transition-all active:scale-[0.98] group">
                <div className="w-14 h-14 rounded-xl bg-amber-900/30 border border-amber-700/40 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-800/30 transition-colors">
                    <Lightbulb size={24} className="text-amber-400" />
                </div>
                <div className="flex-1">
                    <div className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-0.5">Manual</div>
                    <div className="text-white font-black text-lg leading-tight">Dicas de Uso</div>
                    <div className="text-slate-400 text-xs mt-0.5">Tags, atalhos e rotina semanal</div>
                </div>
                <ChevronRight size={18} className="text-slate-500 group-hover:text-purple-400 transition-colors" />
            </button>
        </div>

        {/* Stats bar */}
        <div className="w-full mt-6 grid grid-cols-3 gap-2">
            {[
                { label: 'Etapas Visitantes', value: '5', color: 'text-blue-400' },
                { label: 'Etapas Convertidos', value: '10', color: 'text-purple-400' },
                { label: 'Mensagens Prontas', value: '16+', color: 'text-emerald-400' },
            ].map(s => (
                <div key={s.label} className="bg-[#14102a] border border-purple-900/30 rounded-xl p-3 text-center">
                    <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                    <div className="text-slate-500 text-[10px] font-bold mt-0.5 leading-tight">{s.label}</div>
                </div>
            ))}
        </div>
    </div>
);
