import React from 'react';
import { Step } from '../data/appData';
import { StepCard } from '../components/domain/StepCard';

export const FlowView: React.FC<{ steps: Step[]; title: string; subtitle: string; accent: string }> = ({ steps, title, subtitle, accent }) => (
    <div className="pb-6">
        <div className="mb-6 px-1">
            <div className="text-[11px] font-black uppercase tracking-widest text-purple-500 mb-1">{accent}</div>
            <h2 className="text-2xl font-black text-white leading-tight">{title}</h2>
            <p className="text-slate-400 text-sm mt-1.5">{subtitle}</p>
        </div>
        <div>
            {(() => {
                let msgIdx = 0;
                return steps.map((step, i) => {
                    let nextMessageStep: Step | undefined;
                    if (step.nextMessageId) {
                        nextMessageStep = steps.find(s => s.id === step.nextMessageId);
                        // se apontar pra uma variante, tentamos mostrar a step pai ou resolver melhor (vou assumir que aponta pra base, ex: NC3)
                        if (!nextMessageStep) {
                            const baseId = step.nextMessageId.split('-')[0];
                            nextMessageStep = steps.find(s => s.id === baseId);
                        }
                    } else {
                        for (let j = i + 1; j < steps.length; j++) {
                            if (!steps[j].isActionStep) { nextMessageStep = steps[j]; break; }
                        }
                    }
                    return <StepCard key={step.id} step={step} index={step.isActionStep ? -1 : msgIdx++} nextMessageStep={nextMessageStep} />;
                });
            })()}
        </div>
    </div>
);
