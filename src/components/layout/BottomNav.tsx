import React from 'react';
import { Home, Users, UserCheck, Lightbulb } from 'lucide-react';
import { Tab } from '../../App';

export const BottomNav: React.FC<{ active: Tab; onNav: (tab: Tab) => void }> = ({ active, onNav }) => {
    const items: { id: Tab; label: string; icon: React.ReactNode }[] = [
        { id: 'home', label: 'Início', icon: <Home size={20} /> },
        { id: 'visitors', label: 'Visitante', icon: <Users size={20} /> },
        { id: 'newconvert', label: 'Convertido', icon: <UserCheck size={20} /> },
        { id: 'tips', label: 'Dicas', icon: <Lightbulb size={20} /> },
    ];
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0b0918]/95 backdrop-blur-xl border-t border-purple-900/40 safe-area-pb">
            <div className="flex max-w-lg mx-auto">
                {items.map(item => {
                    const isActive = active === item.id;
                    return (
                        <button key={item.id} onClick={() => onNav(item.id)}
                            className="flex-1 flex flex-col items-center gap-1 py-3 px-1 transition-all">
                            <div className={`transition-all ${isActive ? 'text-purple-400 scale-110' : 'text-slate-600'}`}>
                                {item.icon}
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-wider transition-all ${isActive ? 'text-purple-400' : 'text-slate-600'}`}>
                                {item.label}
                            </span>
                            {isActive && <div className="w-1 h-1 rounded-full bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.8)]" />}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
