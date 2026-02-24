import React, { useState } from 'react';
import {
  Home, Users, UserCheck, Lightbulb, Copy, Check,
  ChevronRight, ChevronDown, Video, Image as ImageIcon,
  Tag, Zap, Calendar, AlertTriangle, Clock, Target,
  ArrowLeft, CheckCircle2, Link as LinkIcon, MessageSquare,
  ClipboardList, ListChecks, ExternalLink
} from 'lucide-react';
import { visitorSteps, newConvertSteps, tipSections, Step, Variant, TipSection, ActionItem } from './data/appData';

type Tab = 'home' | 'visitors' | 'newconvert' | 'tips';

// ─── SmartText ───────────────────────────────────────────────
// Parses inline text and highlights step codes, quoted tags, and dates
const SmartText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  // Regex: step codes | quoted strings (tags) | date/time phrases | [placeholders]
  const TOKEN = /\b((?:NC\d+[A-Z]?(?:-V\d+)?|VIS\d+(?:-V\d+)?)(?=\b))|"([^"]+)"|\b(\d+\s+dias?|próximo domingo|primeiro domingo|segundo domingo|terceiro domingo|dia seguinte|dias? úteis|quinta(?:-feira)?|sexta(?:-feira)?|segunda(?:-feira)?|domingo(?:s)?|\d+(?:h|min))|\[([^\]]+)\]/gi;

  const parts: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = TOKEN.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));

    if (match[1]) {
      // Step/variant code → emerald green message chip
      parts.push(
        <span key={match.index} className="inline-flex items-center gap-0.5 bg-emerald-900/30 border border-emerald-700/40 text-emerald-300 px-1.5 py-0.5 rounded-md text-[11px] font-black align-middle mx-0.5 leading-none">
          <MessageSquare size={9} className="flex-shrink-0" />
          {match[1]}
        </span>
      );
    } else if (match[2]) {
      // Quoted string → sky blue tag chip
      parts.push(
        <span key={match.index} className="inline-flex items-center gap-0.5 bg-sky-900/30 border border-sky-700/40 text-sky-300 px-1.5 py-0.5 rounded-md text-[11px] font-black align-middle mx-0.5 leading-none">
          <Tag size={9} className="flex-shrink-0" />
          {match[2]}
        </span>
      );
    } else if (match[3]) {
      // Date/time phrase → calendar chip (red)
      parts.push(
        <span key={match.index} className="inline-flex items-center gap-0.5 bg-red-900/25 border border-red-800/40 text-red-300 px-1.5 py-0.5 rounded-md text-[11px] font-black align-middle mx-0.5 leading-none">
          <Calendar size={9} className="flex-shrink-0" />
          {match[3]}
        </span>
      );
    } else if (match[4]) {
      // [placeholder] → slate chip
      parts.push(
        <span key={match.index} className="inline-flex items-center gap-0.5 bg-slate-800/60 border border-slate-600/40 text-slate-400 px-1.5 py-0.5 rounded-md text-[11px] font-black align-middle mx-0.5 leading-none">
          {match[4]}
        </span>
      );
    }

    last = TOKEN.lastIndex;
  }

  if (last < text.length) parts.push(text.slice(last));

  return <span className={className}>{parts}</span>;
};

// ─── Copy Button ─────────────────────────────────────────────
const CopyButton: React.FC<{ text: string; small?: boolean }> = ({ text, small }) => {
  const [copied, setCopied] = useState(false);
  const handle = async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { }
  };
  return (
    <button onClick={handle}
      className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-wider transition-all active:scale-95 rounded-xl border ${copied
        ? 'bg-emerald-500 border-emerald-400 text-white'
        : 'bg-[#2a2050] border-purple-700/50 text-purple-300 hover:bg-purple-700/30 hover:border-purple-500'
        } ${small ? 'text-[10px] px-2.5 py-1.5' : 'text-[11px] px-3.5 py-2'}`}>
      {copied ? <Check size={12} /> : <Copy size={12} />}
      <span>{copied ? 'Copiado!' : 'Copiar'}</span>
    </button>
  );
};

// ─── Quick Reply Badge ────────────────────────────────────────
const QuickReplyBadge: React.FC<{ code: string }> = ({ code }) => (
  <div className="inline-flex items-center gap-1.5 bg-purple-900/40 border border-purple-700/40 text-purple-300 px-3 py-1.5 rounded-lg text-[11px] font-black tracking-widest">
    <Zap size={11} className="text-purple-400" />
    <span>Atalho WA Business:</span>
    <span className="font-mono bg-purple-900/60 px-1.5 py-0.5 rounded text-purple-200">{code}</span>
  </div>
);

// ─── Tag Row ─────────────────────────────────────────────────
const TagRow: React.FC<{ tags: string[] }> = ({ tags }) => (
  <div className="flex flex-wrap gap-1.5">
    {tags.map(t => (
      <span key={t} className="inline-flex items-center gap-1 bg-[#1a1535] border border-purple-800/40 text-purple-300 text-[11px] font-bold px-2.5 py-1 rounded-full">
        <Tag size={9} />{t}
      </span>
    ))}
  </div>
);

// ─── Message Block ────────────────────────────────────────────
const MessageBlock: React.FC<{ message: string; quickReply?: string; label?: string }> = ({ message, quickReply, label }) => (
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

// ─── Attachment Row ───────────────────────────────────────────
const AttachmentRow: React.FC<{ label: string; link: string }> = ({ label, link }) => {
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

// ─── Decision Note ────────────────────────────────────────────
const DecisionNote: React.FC<{ note: string }> = ({ note }) => (
  <div className="bg-amber-900/20 border border-amber-700/40 rounded-2xl p-4">
    <div className="flex items-center gap-2 mb-2">
      <AlertTriangle size={14} className="text-amber-400 flex-shrink-0" />
      <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">Atenção — Esta etapa tem variações</span>
    </div>
    <p className="text-amber-200/80 text-sm leading-relaxed whitespace-pre-line">
      <SmartText text={note} />
    </p>
  </div>
);

// ─── Action Step Card ─────────────────────────────────────────
// Renders steps that are internal actions, not WhatsApp messages
const ActionStepCard: React.FC<{ step: Step }> = ({ step }) => {
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
            {step.nextAction && (
              <div className="flex gap-2 p-3 bg-[#0b1a18] rounded-xl border border-teal-800/40">
                <ChevronRight size={14} className="text-teal-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Próxima Ação</div>
                  <p className="text-slate-300 text-sm leading-relaxed"><SmartText text={step.nextAction} /></p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Variant Card ─────────────────────────────────────────────
const VariantCard: React.FC<{ variant: Variant; nextMessageStep?: Step }> = ({ variant, nextMessageStep }) => {
  const [open, setOpen] = useState(false);
  const wtu = variant.whenToUse.toLowerCase();
  const isCongrega = wtu.includes('quer');
  const isArte = wtu.includes('arte');
  const isNegative = !isCongrega && !isArte && (wtu.includes('não') || wtu.includes('nao') || wtu.includes('ausente'));
  const color = (isCongrega || isArte) ? 'emerald' : isNegative ? 'rose' : 'blue';
  const colorMap: Record<string, string> = {
    emerald: 'border-emerald-500/70 bg-emerald-900/30',
    blue: 'border-blue-500/70 bg-blue-900/25',
    rose: 'border-rose-500/70 bg-rose-900/25',
  };
  const textMap: Record<string, string> = {
    emerald: 'text-emerald-300',
    blue: 'text-blue-300',
    rose: 'text-rose-300',
  };
  const badgeMap: Record<string, string> = {
    emerald: 'bg-emerald-900/70 border-emerald-500/60 text-emerald-200',
    blue: 'bg-blue-900/70 border-blue-500/60 text-blue-200',
    rose: 'bg-rose-900/70 border-rose-500/60 text-rose-200',
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
          {(variant.tags?.length || nextMessageStep) && (
            <div className="rounded-xl border border-purple-900/40 overflow-hidden bg-[#0f0c1e]">
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-purple-900/30">
                <ChevronRight size={12} className="text-purple-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Próximo passo</span>
              </div>
              <div className="divide-y divide-purple-900/20">
                {/* Trocar tags — só quando mudar */}
                {variant.tags && nextMessageStep && variant.tags.join(',') !== nextMessageStep.tags?.join(',') && (
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
                )}
                {/* Próxima mensagem */}
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
  );
};

// ─── Step Card (accordion) ────────────────────────────────────
const StepCard: React.FC<{ step: Step; index: number; nextMessageStep?: Step }> = ({ step, index, nextMessageStep }) => {
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
                            <span key={t} className="inline-flex items-center gap-0.5 bg-[#1a1535] border border-purple-800/30 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
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

// ─── Flow View ────────────────────────────────────────────────
const FlowView: React.FC<{ steps: Step[]; title: string; subtitle: string; accent: string }> = ({ steps, title, subtitle, accent }) => (
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

// ─── Tips View ────────────────────────────────────────────────
const TipsSectionCard: React.FC<{ section: TipSection }> = ({ section }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="bg-[#14102a] border border-purple-900/40 rounded-2xl overflow-hidden mb-4">
      <div className="px-4 py-4 border-b border-purple-900/30 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-700/40 flex items-center justify-center text-xl flex-shrink-0">
          {section.emoji}
        </div>
        <div>
          <div className="text-white font-bold text-base leading-tight">{section.title}</div>
          <div className="text-slate-400 text-xs mt-0.5">{section.subtitle}</div>
        </div>
      </div>
      <div className="divide-y divide-purple-900/20">
        {section.items.map((item, idx) => (
          <div key={idx}>
            <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full flex items-center justify-between px-4 py-3.5 text-left">
              <span className="text-slate-200 font-semibold text-sm">{item.title}</span>
              <ChevronDown size={16} className={`text-purple-500 transition-transform flex-shrink-0 ml-2 ${openIdx === idx ? 'rotate-180' : ''}`} />
            </button>
            {openIdx === idx && (
              <div className="px-4 pb-4">
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{item.body}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const TipsView: React.FC = () => (
  <div className="pb-6">
    <div className="mb-6 px-1">
      <div className="text-[11px] font-black uppercase tracking-widest text-purple-500 mb-1">Manual Operacional</div>
      <h2 className="text-2xl font-black text-white leading-tight">Dicas de Uso</h2>
      <p className="text-slate-400 text-sm mt-1.5">Guia prático para secretárias do MVP usando WhatsApp e WhatsApp Business.</p>
    </div>
    {tipSections.map(s => <TipsSectionCard key={s.id} section={s} />)}
  </div>
);

// ─── Home View ────────────────────────────────────────────────
const HomeView: React.FC<{ onNav: (tab: Tab) => void }> = ({ onNav }) => (
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

// ─── Bottom Navigation ────────────────────────────────────────
const BottomNav: React.FC<{ active: Tab; onNav: (tab: Tab) => void }> = ({ active, onNav }) => {
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

// ─── Header ───────────────────────────────────────────────────
const Header: React.FC<{ tab: Tab; onBack: () => void }> = ({ tab, onBack }) => {
  const titles: Record<Tab, string> = {
    home: 'Fluxo de Integração',
    visitors: 'Visitantes',
    newconvert: 'Novos Convertidos',
    tips: 'Dicas de Uso',
  };
  return (
    <div className="sticky top-0 z-40 bg-[#0b0918]/95 backdrop-blur-xl border-b border-purple-900/40 px-4 py-3.5 flex items-center gap-3">
      {tab !== 'home' && (
        <button onClick={onBack} title="Voltar" aria-label="Voltar" className="w-9 h-9 rounded-xl border border-purple-800/50 flex items-center justify-center text-slate-400 hover:text-purple-400 hover:border-purple-600 transition-all">
          <ArrowLeft size={18} />
        </button>
      )}
      <div className="flex-1">
        <div className="text-[10px] font-black uppercase tracking-widest text-purple-600 leading-none mb-0.5">MVP</div>
        <h1 className="text-base font-black text-white leading-tight">{titles[tab]}</h1>
      </div>
      <img src="/logo.png" alt="Logo MVP" className="rounded-full object-cover flex-shrink-0 shadow-[0_0_12px_rgba(139,92,246,0.4)] w-8 h-8 min-w-[32px] min-h-[32px]" />
    </div>
  );
};

// ─── Root App ─────────────────────────────────────────────────
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