import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { HomeView } from './views/HomeView';
import { FlowView } from './views/FlowView';
import { TipsView } from './views/TipsView';
import { visitorSteps, newConvertSteps } from './data/appData';

export type Tab = 'home' | 'visitors' | 'newconvert' | 'tips';

const App: React.FC = () => {
  const [tab, setTab] = useState<Tab>('home');

  return (
    <div className="min-h-screen w-full bg-[#0b0918] font-sans selection:bg-purple-500/30 selection:text-purple-200 flex flex-col">
      <Header tab={tab} onBack={() => setTab('home')} />

      <div className="flex-1 w-full max-w-lg mx-auto px-4 pt-4 pb-28 overflow-y-auto">
        {tab === 'home' && <HomeView onNav={setTab} />}
        {tab === 'visitors' && (
          <FlowView
            steps={visitorSteps}
            title="Fluxo de Visitantes"
            subtitle="Acompanhamento do primeiro contato até a decisão de congregar."
            accent="Fluxo 01 · Visitantes"
          />
        )}
        {tab === 'newconvert' && (
          <FlowView
            steps={newConvertSteps}
            title="Fluxo · Novos Convertidos"
            subtitle="Acolhimento, consolidação e integração ministerial após a conversão."
            accent="Fluxo 02 · Novos Convertidos"
          />
        )}
        {tab === 'tips' && <TipsView />}
      </div>

      <BottomNav active={tab} onNav={setTab} />
    </div>
  );
};

export default App;