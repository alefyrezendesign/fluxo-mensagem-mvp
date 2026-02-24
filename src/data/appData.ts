// ============================================================
// FLUXO DE INTEGRAÇÃO — UNIDADE | APP DATA
// ============================================================

export interface Attachment {
    label: string;
    link: string;
}

export interface Variant {
    id: string;
    whenToUse: string;
    tags: string[];
    quickReply: string;
    message: string;
    attachments?: Attachment[];
    internalAction?: string;
    nextMessageId?: string;
}

// ActionItem: texto simples OU link clicável
export type ActionItem =
    | string
    | { text: string; link: string; linkLabel?: string };

export interface Step {
    id: string;
    title: string;
    sendWhen: string;
    goal: string;
    tags: string[];
    quickReply?: string;
    decisionNote?: string | null;
    hasVariants?: boolean;
    variants?: Variant[];
    message?: string;
    attachments?: Attachment[];
    internalAction?: string;
    nextMessageId?: string;
    isActionStep?: boolean;  // etapa de ação interna (sem mensagem para o contato)
    actionItems?: ActionItem[];  // lista de ações/links desta etapa
}

export interface TipSection {
    id: string;
    emoji: string;
    title: string;
    subtitle: string;
    items: { title: string; body: string }[];
}

// ============================================================
// FLUXO — VISITANTES
// ============================================================
export const visitorSteps: Step[] = [
    {
        id: 'VIS0',
        title: 'Registro do Visitante',
        sendWhen: 'No mesmo dia da visita (durante ou logo após o culto)',
        goal: 'Registrar o visitante no formulário oficial ainda dentro do culto, para não perder nenhuma informação e garantir o acompanhamento imediato.',
        tags: ['Visitante', 'Pendente'],
        isActionStep: true,
        actionItems: [
            'Abordar o visitante ao final do culto e confirmar o interesse em receber contato.',
            { text: 'Formulário Visitantes — Boa Vista', link: 'https://forms.enuves.com/35925/Lh5suGj8egXc0D435925', linkLabel: 'Abrir Formulário' },
            { text: 'Formulário Visitantes — Abacatão', link: 'https://forms.enuves.com/35925/kZMyb0CIAt5FKLn35925', linkLabel: 'Abrir Formulário' },
            'Preencher: nome completo, telefone (WhatsApp), data da visita e unidade.',
            'Confirmar os dados com o visitante antes de sair.',
            'Aplicar tags "Visitante" + "Pendente" no WhatsApp Business.',
            'Agendar lembrete para VIS1 no dia seguinte.',
        ],
    },
    {
        id: 'VIS1',
        title: 'Boas-Vindas + Programação',
        sendWhen: 'No dia seguinte à visita',
        goal: 'Fazer o primeiro contato, acolher, informar a programação e pedir que o visitante salve o contato da secretaria.',
        tags: ['Visitante', 'Em Acompanhamento'],
        quickReply: '/vis1',
        hasVariants: true,
        decisionNote: `⚠️ Esta etapa tem variações por UNIDADE.\n• SE o visitante foi à Boa Vista → usar VIS1-V1\n• SE o visitante foi ao Abacatão → usar VIS1-V2\n• SE a arte de programação oficial estiver pronta → usar VIS1-V3 (com arte, qualquer unidade)`,
        variants: [
            {
                id: 'VIS1-V1',
                whenToUse: 'SE a unidade for MVP BOA VISTA',
                tags: ['Visitante', 'Em Acompanhamento'],
                quickReply: '/vis1-v1',
                message: `Olá, [Nome]! Tudo bem?

Foi muito bom ter você conosco! Ficamos felizes com a sua visita. 😊

Para você se programar, seguem nossos cultos no *MVP Boa Vista*:

🗓️ *Quarta-feira* (Profética): 19h30
🗓️ *Domingo* (Família): 18h30
📍 Av. Joaquim de Oliveira, 1601 - Boa Vista, São Gonçalo - RJ

📲 *Salva o nosso contato aí no celular!* Enviamos avisos e conteúdos pela lista de transmissão — e para a mensagem chegar até você, precisamos estar salvos. 😉

As portas estão sempre abertas. Até breve!

Att, Secretaria MVP`,
                attachments: [{ label: 'Vídeo de Boas-Vindas dos Pastores', link: '' }],
            },
            {
                id: 'VIS1-V2',
                whenToUse: 'SE a unidade for MVP ABACATÃO',
                tags: ['Visitante', 'Em Acompanhamento'],
                quickReply: '/vis1-v2',
                message: `Olá, [Nome]! Tudo bem?

Foi muito bom ter você conosco! Ficamos felizes com a sua visita. 😊

Para você se programar, seguem nossos cultos no *MVP Abacatão*:

🗓️ *Quinta-feira* (Profética): 19h30
🗓️ *Domingo* (Família): 18h30
📍 R. Afonso Henrique, 2127 - Boa Vista, São Gonçalo - RJ

📲 *Salva o nosso contato aí no celular!* Enviamos avisos e conteúdos pela lista de transmissão — e para a mensagem chegar até você, precisamos estar salvos. 😉

As portas estão sempre abertas. Até breve!

Att, Secretaria MVP`,
                attachments: [{ label: 'Vídeo de Boas-Vindas dos Pastores', link: '' }],
            },
            {
                id: 'VIS1-V3',
                whenToUse: 'SE a arte de programação oficial estiver disponível (qualquer unidade)',
                tags: ['Visitante', 'Em Acompanhamento'],
                quickReply: '/vis1-v3',
                message: `Olá, [Nome]! Tudo bem?

Foi muito bom ter você conosco! 😊 Segue nossa programação de cultos para você se planejar.

📲 *Salva o nosso contato aí no celular!* Enviamos avisos e conteúdos pela lista de transmissão — e para a mensagem chegar até você, precisamos estar salvos. 😉

As portas estão sempre abertas. Até breve!

Att, Secretaria MVP`,
                attachments: [
                    { label: 'Arte de Programação Oficial MVP', link: '' },
                    { label: 'Vídeo de Boas-Vindas dos Pastores', link: '' },
                ],
            },
        ],
        attachments: [],
    },
    {
        id: 'VIS2',
        title: 'Convite — 1.º Domingo',
        sendWhen: 'No primeiro domingo após a visita (manhã)',
        goal: 'Convidar o visitante a retornar ao culto de domingo.',
        tags: ['Visitante', 'Em Acompanhamento'],
        quickReply: '/vis2',
        decisionNote: null,
        message: `Olá, [Nome]! A paz! 🙌

Hoje temos culto de domingo e seria uma alegria enorme ter você de volta!

Venha adorar ao Senhor conosco. ✨ Te esperamos!

Att, Secretaria MVP`,
        attachments: [{ label: 'Arte do Culto de Domingo', link: '' }],
    },
    {
        id: 'VIS3',
        title: 'Convite — 2.º Domingo',
        sendWhen: 'No segundo domingo (manhã)',
        goal: 'Reforçar o convite, mostrar que o visitante é lembrado e valorizado.',
        tags: ['Visitante', 'Em Acompanhamento'],
        quickReply: '/vis3',
        decisionNote: null,
        message: `Olá, [Nome]! Tudo bem?

Passando para dizer que é sempre bom ter você com a gente! 😊

Hoje tem culto de domingo — venha adorar ao Senhor conosco e fortalecer essa caminhada. Te esperamos! 💜

Att, Secretaria MVP`,
        attachments: [{ label: 'Arte do Culto de Domingo', link: '' }],
    },
    {
        id: 'VIS4',
        title: 'Cuidado Intermediário',
        sendWhen: 'Na quinta ou sexta após o segundo domingo',
        goal: 'Checar como o visitante está sem pressionar. Fortalecer o vínculo e demonstrar cuidado genuíno.',
        tags: ['Visitante', 'Em Acompanhamento'],
        quickReply: '/vis4',
        decisionNote: null,
        message: `Olá, [Nome]! Tudo bem por aí? 😊

Passando só para saber como você está e dizer que é sempre uma alegria ter você conosco!

Se tiver alguma dúvida, precisar de oração ou quiser saber mais sobre o MVP, pode me chamar — estamos aqui!

Até breve. 💜

Att, Secretaria MVP`,
        attachments: [],
    },
    {
        id: 'VIS5',
        title: 'Verificação de Interesse',
        sendWhen: 'Após o terceiro domingo (~3 semanas de acompanhamento)',
        goal: 'Com o relacionamento construído, perguntar com cuidado sobre o interesse em congregar.',
        tags: ['Visitante', 'Em Acompanhamento'],
        quickReply: '/vis5',
        hasVariants: true,
        decisionNote: `⚠️ Esta etapa tem variações. Escolha conforme a situação:\n• SE compareceu aos cultos → usar VIS5-V1\n• SE esteve ausente ou sumiu → usar VIS5-V2\n• SE respondeu que QUER CONGREGAR → usar VIS5-V3 e notificar o pastor\n• SE disse que já congrega em outra casa → usar VIS5-V4 e encerrar`,
        variants: [
            {
                id: 'VIS5-V1',
                whenToUse: 'SE tem comparecido aos cultos',
                tags: ['Visitante', 'Em Acompanhamento'],
                quickReply: '/vis5-v1',
                message: `Olá, [Nome]! Tudo bem?

Tem sido uma alegria ter você conosco! 😊

Gostaríamos de te fazer uma pergunta simples: *você tem interesse em congregar conosco no MVP?*

Não precisa se preocupar — é só para sabermos como te acompanhar melhor. Fique à vontade!

Att, Secretaria MVP`,
            },
            {
                id: 'VIS5-V2',
                whenToUse: 'SE esteve ausente ou sumiu nos últimos dias',
                tags: ['Visitante', 'Ausente'],
                quickReply: '/vis5-v2',
                message: `Olá, [Nome]! Tudo bem por aí?

Sentimos sua falta! Só passando para saber como você está e dizer que as portas do MVP estão sempre abertas. 🙏

Quando quiser retornar, será uma alegria receber você novamente.

Att, Secretaria MVP`,
            },
            {
                id: 'VIS5-V3',
                whenToUse: 'SE respondeu que QUER CONGREGAR',
                tags: ['Visitante', 'Alta Prioridade'],
                quickReply: '/vis5-v3',
                message: `Que alegria! Ficamos muito felizes! 🎉

Gostaríamos de agendar uma conversa rápida com nosso pastor para te receber formalmente.

*Tudo bem nós agendarmos esse momento com ele?*

Assim que confirmar, já comunicamos ao pastor com prioridade. 😊

Att, Secretaria MVP`,
            },
            {
                id: 'VIS5-V4',
                whenToUse: 'SE disse que já congrega em OUTRA CASA',
                tags: ['Visitante', 'Encerrado'],
                quickReply: '/vis5-v4',
                message: `Amém, que bom! 🙌

Fico feliz em saber que você está sendo cuidado(a) em uma casa espiritual.

Saiba que as portas do MVP estão sempre abertas para você quando quiser nos visitar. Que Deus abençoe a sua caminhada!

Um abraço,
Secretaria MVP`,
            },
        ],
        attachments: [],
    },
];

// ============================================================
// FLUXO — NOVOS CONVERTIDOS
// ============================================================
export const newConvertSteps: Step[] = [
    {
        id: 'NC0',
        title: 'Cadastro Imediato — Formulário de Novos Convertidos',
        sendWhen: 'No mesmo momento da conversão (ao final do culto)',
        goal: 'Registrar o novo convertido no formulário oficial imediatamente após a sua decisão, ainda dentro do culto, para não perder nenhuma informação e garantir o acompanhamento.',
        tags: ['Novo Convertido', 'Pendente'],
        isActionStep: true,
        actionItems: [
            'Abordar o novo convertido ao final do culto de forma leve, educada e gentil, sem ser intruso.',
            { text: 'Formulário NC — Boa Vista', link: 'https://forms.enuves.com/35925/1ReV8239ludrNKI35925', linkLabel: 'Abrir Formulário' },
            { text: 'Formulário NC — Abacatão', link: 'https://forms.enuves.com/35925/inoY3lxHWQzNUqE35925', linkLabel: 'Abrir Formulário' },
            'Solicitar os dados de forma natural e amigável, pois são muito relevantes para o acompanhamento:',
            '• Nome e sobrenome',
            '• Data de nascimento (para inclusão de faixa etária e aniversário)',
            '• Podemos pegar seu WhatsApp para comunicação?',
            '• Data de conversão / retorno',
            '• Como você conheceu nosso ministério?',
            '• Você mora por aqui? (Em qual bairro você mora?)',
            '• Você já foi batizado nas águas?',
            '• Qual é o seu estado civil?',
            'Confirmar os dados diretamente com o novo convertido antes de sair.',
            'Aplicar tags "Novo Convertido" + "Pendente" no WhatsApp Business.',
            'Agendar lembrete para NC1 (Boas-Vindas) nos próximos 2 dias.',
        ],
    },
    {
        id: 'NC1',
        title: 'Boas-Vindas',
        sendWhen: 'Nos primeiros 2 dias após a conversão',
        goal: 'Fazer o primeiro contato pós-conversão, parabenizar pela decisão e abrir canal de comunicação com a secretaria.',
        tags: ['Novo Convertido', 'Pendente'],
        quickReply: '/nc1',
        decisionNote: null,
        message: `Olá, [Nome]! Graça e paz! 😊

Passando aqui para te parabenizar pela sua decisão de entregar sua vida a Jesus! 🎉 Esse é o começo de uma nova história, e nós celebramos essa escolha com você.

O *Ministério Visão e Propósito (MVP)* está de portas abertas para você.
Faça da nossa igreja a sua segunda casa.

Aqui você encontrará pessoas que caminharão ao seu lado, orarão por você e te ajudarão nessa nova jornada, porque o Evangelho se torna mais leve quando vivemos em comunhão e unidade.

📲 *Salva o nosso contato aí no celular!* Enviamos avisos e conteúdos pela lista de transmissão — e para a mensagem chegar até você, precisamos estar salvos. 😉

Estamos muito felizes por você. 💜

Att, Secretaria MVP`,
        attachments: [{ label: 'Vídeo dos Pastores — Boas-Vindas (Parabenizando pela decisão)', link: '' }],
    },
    {
        id: 'NC2',
        title: 'Informar Programação',
        sendWhen: 'No dia seguinte às boas-vindas (NC1)',
        goal: 'Informar os horários dos cultos para que o novo convertido possa se planejar e comparecer.',
        tags: ['Novo Convertido', 'Em Acompanhamento'],
        quickReply: '/nc2',
        hasVariants: true,
        decisionNote: `⚠️ Esta etapa tem variações por UNIDADE.\n• SE o novo convertido pertence à unidade Boa Vista → usar NC2-V1\n• SE o novo convertido pertence à unidade Abacatão → usar NC2-V2\n• SE a arte oficial de programação estiver disponível → SUBSTITUIR pela versão com arte (NC2-V3)`,
        variants: [
            {
                id: 'NC2-V1',
                whenToUse: 'SE a unidade for MVP BOA VISTA',
                tags: ['Novo Convertido', 'Em Acompanhamento'],
                quickReply: '/nc2-v1',
                message: `Olá, [Nome]! Graça e paz!

Para você se programar, seguem os nossos dias de culto no *MVP Boa Vista*:

🗓️ *Quarta-feira* (Profética): 19h30
🗓️ *Domingo* (Família): 18h30
📍 Endereço: Av. Joaquim de Oliveira, 1601 - Boa Vista, São Gonçalo - RJ

Será uma alegria receber você. 🙏

Att, Secretaria MVP`,
                attachments: [{ label: 'Arte de Programação Oficial (quando disponível)', link: '' }],
            },
            {
                id: 'NC2-V2',
                whenToUse: 'SE a unidade for MVP ABACATÃO',
                tags: ['Novo Convertido', 'Em Acompanhamento'],
                quickReply: '/nc2-v2',
                message: `Olá, [Nome]! Graça e paz!

Para você se programar, seguem os nossos dias de culto no *MVP Abacatão*:

🗓️ *Quinta-feira* (Profética): 19h30
🗓️ *Domingo* (Família): 18h30
📍 Endereço: R. Afonso Henrique, 2127 - Boa Vista, São Gonçalo - RJ

Será uma alegria receber você. 🙏

Att, Secretaria MVP`,
                attachments: [{ label: 'Arte de Programação Oficial (quando disponível)', link: '' }],
            },
            {
                id: 'NC2-V3',
                whenToUse: 'SE a arte oficial de programação estiver disponível (qualquer unidade)',
                tags: ['Novo Convertido', 'Em Acompanhamento'],
                quickReply: '/nc2-v3',
                message: `Olá, [Nome]! Segue a nossa programação de cultos para você conhecer melhor. 📅

Sinta-se em casa. As portas estão sempre abertas para você.

Se precisar de algo, é só chamar!

Att, Secretaria MVP`,
                attachments: [{ label: 'Arte de Programação Oficial MVP', link: '' }],
            },
        ],
        attachments: [],
    },
    {
        id: 'NC3',
        title: 'Convite — Culto de Domingo',
        sendWhen: 'Primeiro domingo após a conversão (manhã ou início da tarde)',
        goal: 'Convidar o novo convertido ao culto de domingo e incentivá-lo a salvar o contato da secretaria.',
        tags: ['Novo Convertido', 'Em Acompanhamento'],
        quickReply: '/nc3',
        decisionNote: null,
        message: `Olá, [Nome]! A paz! 🙌

Passando para te fazer um convite: hoje teremos o nosso *culto de domingo*, e vai ser uma alegria enorme ter você com a gente!

Venha adorar ao Senhor conosco, em comunhão, com uma palavra que fortalece e em um ambiente de fé. ✨

📲 Ah, salva o contato da *Secretaria MVP* aí no seu celular para você receber nossos avisos e conteúdos direitinho!

Você é sempre muito bem-vindo(a) na casa! Te esperamos! 💜

Att, Secretaria MVP`,
        attachments: [{ label: 'Arte do Culto de Domingo', link: '' }],
    },
    {
        id: 'NC4',
        title: 'Verificação de Vínculo',
        sendWhen: 'Entre quinta e sexta-feira (4–5 dias após o culto de domingo)',
        goal: 'Verificar a presença no culto, perguntar sobre o interesse em congregar e direcionar para o próximo passo.',
        tags: ['Novo Convertido', 'Em Acompanhamento'],
        hasVariants: true,
        decisionNote: `⚠️ Esta etapa tem variações. Escolha conforme a situação:\n• SE compareceu ao culto → usar NC4-V1\n• SE NÃO compareceu → usar NC4-V2\n• SE respondeu que QUER CONGREGAR → usar NC4-V3 e notificar o pastor com urgência`,
        variants: [
            {
                id: 'NC4-V1',
                whenToUse: 'SE compareceu ao culto de domingo',
                tags: ['Novo Convertido', 'Em Acompanhamento'],
                quickReply: '/nc4-v1',
                message: `Olá, [Nome]! Graça e paz! 😊

Foi *muito bom* cultuar ao seu lado mais uma vez!

Se precisar de qualquer coisa, pode me chamar.

Gostaríamos também de te fazer uma pergunta simples para sabermos como te acompanhar melhor: *você deseja congregar conosco no MVP* ou já está frequentando outra casa?

Fique à vontade para responder. O importante é você estar bem cuidado(a)!

Att, Secretaria MVP`,
                internalAction: 'Aguardar resposta para aplicar NC4-V3 (quer congregar) ou encerrar com cuidado.',
                nextMessageId: 'NC4-V3',
            },
            {
                id: 'NC4-V2',
                whenToUse: 'SE NÃO compareceu ao culto de domingo',
                tags: ['Novo Convertido', 'Ausente'],
                quickReply: '/nc4-v2',
                message: `Olá, [Nome]! Graça e paz!

Passando para saber como você está. Sentimos a sua falta no culto de domingo. 🙏

Se precisar de algo, estamos aqui.

Gostaria também de te fazer uma pergunta simples: *você deseja congregar conosco no Ministério Visão e Propósito?* Ou já está frequentando alguma outra casa?

Queremos apenas saber como te apoiar melhor nessa jornada!

De qualquer forma, estamos orando e torcendo por você. 💜

Att, Secretaria MVP`,
                internalAction: 'Aguardar resposta. SE não houver resposta em 3 dias, registrar como "Sem resposta" e informar líder responsável.',
                nextMessageId: 'NC4-V3',
            },
            {
                id: 'NC4-V3',
                whenToUse: 'SE respondeu que QUER CONGREGAR (resposta ao NC4-V1 ou NC4-V2)',
                tags: ['Novo Convertido', 'Alta Prioridade'],
                quickReply: '/nc4-v3',
                message: `Que alegria! Ficamos *muito felizes* por você estar congregando conosco! 🎉

Será uma bênção caminhar juntos.

Gostaríamos muito de apresentar você à igreja em um dos nossos cultos para celebrarmos, mas antes seria muito importante uma conversa com nosso pastor.

*Tudo bem nós agendarmos esse momento com ele?*

Att, Secretaria MVP`,
                internalAction: '🔴 AÇÃO URGENTE: Trocar status para "Alta Prioridade". Informar ao pastor com prioridade máxima. Avançar para NC4A.',
            },
        ],
        attachments: [],
    },
    {
        id: 'NC4A',
        title: 'Agendar Bate-papo com o Pastor',
        sendWhen: 'Imediatamente após o novo convertido confirmar que quer congregar (NC4-V3)',
        goal: 'Garantir que o bate-papo pastoral seja agendado com máxima prioridade para avançar para a etapa de apresentação oficial.',
        tags: ['Novo Convertido', 'Alta Prioridade'],
        isActionStep: true,
        actionItems: [
            '🔴 URGENTE: Comunicar ao pastor pessoalmente ou por mensagem que [Nome] quer congregar.',
            'Combinar com o pastor uma data e horário disponíveis para o bate-papo.',
            'Confirmar a data com o novo convertido pelo WhatsApp.',
            'Anotar a data agendada no sistema ou agenda da secretaria.',
            'Agendar lembrete para NC5 no dia após a realização do bate-papo.',
        ],
    },
    {
        id: 'NC5',
        title: 'Apresentação na Igreja — Mensagem de Confirmação',
        sendWhen: 'Logo após a conclusão do bate-papo com o pastor',
        goal: 'Comunicar oficialmente ao novo membro que seu vínculo está confirmado e que será apresentado à congregação no próximo culto de ceia.',
        tags: ['Novo Convertido', 'Em Integração'],
        quickReply: '/nc5',
        decisionNote: null,
        message: `Olá, [Membro]! Tudo certo por aí?

Que bom que já teve o bate-papo com o pastor!

Queremos te contar que você já está sendo cadastrado(a) como membro no nosso sistema. 🎉

Além disso, *no próximo culto de ceia*, vamos apresentar você oficialmente à nossa família do MVP.

Tudo bem por você?
Contamos com a sua presença!

Te esperamos lá. 💜

Att, Secretaria MVP`,
        attachments: [],
    },
    {
        id: 'NC6',
        title: 'Cadastrar Membro no Enuves',
        sendWhen: 'Imediatamente após o bate-papo com o pastor (mesma data de NC5)',
        goal: 'Registrar oficialmente o novo membro no sistema Enuves, garantindo que o cadastro esteja completo antes da apresentação no culto de ceia.',
        tags: ['Membro', 'Em Integração'],
        isActionStep: true,
        actionItems: [
            { text: 'Abrir Enuves — Cadastro de Membros', link: 'https://app.enuves.com/institutions/35925/people/register', linkLabel: 'Abrir Enuves' },
            'Criar cadastro com: nome completo, telefone, data de conversão, unidade e geração prevista.',
            'Alterar o perfil de "Novo Convertido" para "Membro" no sistema.',
            'Atualizar tags no WhatsApp Business: "Membro" + "Em Integração".',
            'Confirmar que o cadastro foi salvo corretamente.',
        ],
    },
    {
        id: 'NC7',
        title: 'Integração com a Geração',
        sendWhen: 'De 2 a 4 dias após a apresentação no culto de ceia',
        goal: 'Apresentar o sistema de gerações e conectar o novo membro ao grupo de cuidado adequado à sua faixa etária.',
        tags: ['Membro', 'Em Integração'],
        quickReply: '/nc7',
        decisionNote: `⚠️ Atenção ao timing:\n• Enviar entre 2 e 4 dias após a apresentação no culto de ceia — a pessoa acabou de ser apresentada, aproveite o momento de calor!\n• Lembre de preencher [nome da geração] antes de enviar.`,
        message: `Opa, como vai? Tudo bem? 😊

Então, além do bate-papo com o pastor para caminhar mais de perto com cada pessoa, nosso ministério é organizado por *gerações* — grupos de cuidado por faixa etária. Hoje temos:

• 👶 *MVP Kids* (Crianças)
• 🧑 *MVP Teens* (Adolescentes)
• ⚡ *Exclusivos* (Jovens)
• 💪 *Homens de Visão* (Homens)
• 🌸 *Mulheres com Propósito* (Mulheres)
• 🌿 *Melhor Idade* (Anciões)

Acreditamos que você se encaixe muito bem na *Geração [nome da geração]*. Isso faz sentido para você?

Se fizer, o líder da geração gostaria muito de ter um tempo de mesa — um bate-papo rápido com um cafézinho — para se conhecerem melhor e caminhar mais de perto nessa jornada. ☕

Tudo certo por você?
Me confirma por aqui que em breve o líder entrará em contato para combinarem o melhor dia e horário.

Att, Secretaria MVP`,
        attachments: [],
    },
    {
        id: 'NC8',
        title: 'Agendar Conversa com o Líder da Geração',
        sendWhen: 'Após o membro confirmar interesse na geração (resposta ao NC7)',
        goal: 'Garantir que o contato do novo membro seja passado ao líder da geração e que a conversa de acolhimento seja agendada para fortalecer o vínculo.',
        tags: ['Membro', 'Em Integração'],
        isActionStep: true,
        actionItems: [
            'Encaminhar nome e contato do membro ao líder da geração correspondente.',
            'Informar ao líder o contexto: novo membro, recém apresentado no culto de ceia.',
            'O líder deve entrar em contato em até 3 dias para agendar a conversa.',
            'Registrar no sistema/agenda da secretaria que o contato foi repassado.',
            'Acompanhar: confirmar com o líder que a conversa aconteceu.',
            'Atenção: A tag "Integrado" SÓ DEVE ser aplicada após a pessoa participar do MVP 360.',
        ],
    },
    {
        id: 'NC8',
        title: 'Convite — MVP 360',
        sendWhen: 'Por volta de 30 dias congregando (pode ser antes, conforme percepção do líder)',
        goal: 'Apresentar o MVP 360 e convidar o novo membro a participar.',
        tags: ['Membro', 'Em Integração'],
        quickReply: '/nc8',
        decisionNote: `⚠️ Atenção ao timing:\n• O ideal é aguardar cerca de 30 dias congregando para o membro estar ambientado.\n• Preencher a data/período do próximo MVP 360 antes de enviar.`,
        message: `Olá, [Nome]! Graça e paz! 😊

Que alegria ver você crescendo e fazendo parte da nossa família! 💜

Queremos te convidar para algo muito especial: o *MVP 360*!

É uma imersão em 4 encontros onde você vai conhecer mais profundamente tudo sobre o nosso ministério:

✅ *O que acreditamos* — nossa fé e valores
✅ *Como servimos* — a cultura de servir no MVP
✅ *Nossos núcleos* — ministérios, gerações e como se envolver
✅ *Próximos passos* — voluntariado, batismo e muito mais

São encontros práticos, cheios de vida e com muito espaço para perguntas e conexão.

*Você toparia participar?*`,
        attachments: [],
    },
    {
        id: 'NC8A',
        title: 'Confirmação de Interesse',
        sendWhen: 'Após a pessoa responder que quer participar do MVP 360',
        goal: 'Registrar o interesse sem prometer uma data imediata, dando tempo para a secretaria organizar a turma.',
        tags: ['Membro', 'Em Integração'],
        quickReply: '/nc8a',
        message: `Que maravilha! 🎉 Ficamos muito felizes com a sua decisão!

Já anotamos o seu interesse por aqui. Vou verificar qual é a próxima turma disponível do MVP 360 e em breve te retorno para explicar todos os detalhes e confirmar com você, combinado?

Até logo! 🙌`,
    },
    {
        id: 'NC8B',
        title: 'Verificar Próxima Turma',
        sendWhen: 'Após enviar a confirmação de interesse (NC8A)',
        goal: 'Encontrar a próxima turma do MVP 360 e garantir a vaga da pessoa.',
        tags: ['Membro', 'Em Integração'],
        isActionStep: true,
        actionItems: [
            'Verificar a data e horário da próxima turma do MVP 360.',
            'Encaixar e aprovar a participação do membro nesta turma no sistema.',
            'Avançar para responder com a confirmação (NC8C).',
        ],
    },
    {
        id: 'NC8C',
        title: 'Aviso e Detalhes da Turma',
        sendWhen: 'Após confirmar a vaga e as datas da turma (ação NC8B)',
        goal: 'Informar ao membro exatamente quando o MVP 360 ocorrerá.',
        tags: ['Membro', 'Em Integração'],
        quickReply: '/nc8c',
        message: `Olá, [Nome]! Tudo bem?

Passando para confirmar que já temos a sua turma do *MVP 360* definida! 🚀

As nossas aulas acontecerão a partir do dia *[DATA INÍCIO]* até *[DATA FIM]*, sempre às *[HORÁRIO]*.

Coloque na agenda e prepare o coração! Se tiver qualquer dúvida até lá, é só me chamar.

Att, Secretaria MVP`,
        attachments: [{ label: 'Arte / Informativo do MVP 360 (quando disponível)', link: '' }],
    },
    {
        id: 'NC8D',
        title: 'Início do MVP 360 — Material',
        sendWhen: 'Na data da primeira aula (ou na véspera)',
        goal: 'Motivar a pessoa e enviar o link do material de leitura/apoio do curso.',
        tags: ['Membro', 'Em Integração'],
        quickReply: '/nc8d',
        message: `Olá, [Nome]! Chegou o dia! 🤩

Hoje começa a nossa jornada no *MVP 360* e estamos com muita expectativa para o que Deus vai fazer.

Para você já ir se preparando, segue o link com o nosso material de leitura e conteúdo do curso:
[LINK DO MATERIAL]

Te esperamos mais tarde! Vá com o coração aberto! 🔥`,
    },
    {
        id: 'NC9',
        title: 'Integração Concluída — Pós MVP 360',
        sendWhen: 'Após o término de todas as aulas do MVP 360 pela pessoa',
        goal: 'Marcar e registrar formalmente que a pessoa concluiu a trilha do MVP 360 e agora é um membro 100% integrado.',
        tags: ['Membro', 'Integrado'],
        isActionStep: true,
        actionItems: [
            'Confirmar que a pessoa participou e concluiu todas as aulas do MVP 360.',
            'Ir ao WhatsApp Business e TROCAR A TAG de "Em Integração" para "Integrado".',
            'Ir ao sistema Enuves e atualizar o status do membro para Integrado.',
            'Opcional: enviar uma mensagem parabenizando pela conclusão do MVP 360 e incentivando a atuar no voluntariado.',
        ],
    },
];

// ============================================================
// DICAS DE USO
// ============================================================
export const tipSections: TipSection[] = [
    {
        id: 'tags',
        emoji: '🏷️',
        title: 'Tags no WhatsApp',
        subtitle: 'Como organizar seus contatos com etiquetas',
        items: [
            {
                title: 'Estrutura de tags recomendada',
                body: `Use apenas 2 tags por contato: Perfil + Status. Simples e direto.\n\nExemplos:\n• Visitante + Pendente\n• Visitante + Em Acompanhamento\n• Visitante + Alta Prioridade\n• Visitante + Encerrado\n• Novo Convertido + Pendente\n• Novo Convertido + Em Acompanhamento\n• Novo Convertido + Ausente\n• Novo Convertido + Alta Prioridade\n• Novo Convertido + Em Integração\n• Membro + Integrado\n• Liderança + Ativo`,
            },
            {
                title: 'Tags padrão do MVP',
                body: `🔵 Perfil (quem é):\nVisitante / Novo Convertido / Membro / Voluntário / Liderança / Corpo Ministerial\n\n🟡 Status (onde está no fluxo):\nPendente / Em Acompanhamento / Ausente / Alta Prioridade / Em Integração / Integrado / Encerrado\n\n💡 Regra: ao avançar de etapa, troque apenas o STATUS — o Perfil quase nunca muda (exceto quando o Visitante vira Novo Convertido, ou quando o Novo Convertido vira Membro).`,
            },
            {
                title: 'Como criar e aplicar',
                body: `1) Abra o WhatsApp Business\n2) Acesse o chat do contato\n3) Toque nos 3 pontinhos (⋮) → "Editar contato" → "Etiquetas"\n4) Selecione ou crie a etiqueta desejada\n5) Para filtrar todos os contatos com certa tag, acesse "Chats" → ícone de etiqueta no topo\n\n💡 Dica: Atualize as tags sempre que enviar uma etapa do fluxo. Nunca deixe a tag desatualizada.`,
            },
        ],
    },
    {
        id: 'quickreplies',
        emoji: '⚡',
        title: 'Respostas Rápidas',
        subtitle: 'Como usar atalhos no WhatsApp Business',
        items: [
            {
                title: 'O que são respostas rápidas?',
                body: `São mensagens pré-salvas com um atalho (começa com /).\nDigite a barra "/" no chat e escolha o atalho — a mensagem aparece completa automaticamente.\n\n✅ Atalhos padrão MVP:\n/nc1 → Boas-Vindas (Novo Convertido)\n/nc2-v1 → Programação Boa Vista\n/nc2-v2 → Programação Abacatão\n/nc3 → Convite Domingo\n/nc4-v1 → Verificação (compareceu)\n/nc4-v2 → Verificação (não compareceu)\n/nc4-v3 → Confirmação Congregar\n/nc5 → Apresentação na Igreja\n/nc7 → Integração Geração\n/nc8 → Convite MVP 360\n/nc8a → Confirmação Interesse MVP\n/nc8c → Aviso Detalhes Turma\n/nc8d → Início MVP Material\n/vis1-v1 → Boas-Vindas Visitante (Boa Vista)\n/vis1-v2 → Boas-Vindas Visitante (Abacatão)\n/vis2 → Convite 1.º Domingo\n/vis3 → Convite 2.º Domingo\n/vis4 → Cuidado Intermediário\n/vis5-v1 → Verificação (compareceu)\n/vis5-v2 → Verificação (ausente)`,
            },
            {
                title: 'Como cadastrar um atalho',
                body: `1) Abra o WhatsApp Business\n2) Vá em Configurações (⚙️) → Ferramentas Comerciais → Respostas Rápidas\n3) Toque em "+" para adicionar\n4) Cole o texto da mensagem\n5) Digite o atalho (ex: /nc1)\n6) Salve\n\n💡 Padrão de nomenclatura:\n• Novos Convertidos: /nc + número da etapa\n• Visitantes: /vis + número da etapa\n• Variações: adicionar -v1, -v2, etc.`,
            },
            {
                title: 'Boas práticas',
                body: `• Sempre revise a mensagem ANTES de enviar — especialmente os campos [Nome] e [nome da geração]\n• Nunca envie uma mensagem com "[Nome]" sem substituir pelo nome real\n• Padronize os atalhos entre todas as secretárias da unidade\n• Faça uma revisão mensal das mensagens salvas para atualizar informações`,
            },
        ],
    },
    {
        id: 'agenda',
        emoji: '📅',
        title: 'Rotina & Agenda',
        subtitle: 'Organização semanal para não perder nenhum contato',
        items: [
            {
                title: 'Rotina semanal recomendada',
                body: `🗓️ *Segunda-feira*\n→ Revisar lista de novos convertidos do domingo anterior\n→ Enviar NC1 (boas-vindas) para quem ainda não recebeu\n→ Atualizar tags\n\n🗓️ *Terça-feira*\n→ Enviar NC2 (programação) para quem recebeu NC1 na segunda\n\n🗓️ *Quinta-feira*\n→ Enviar NC4 (verificação de vínculo) — 4 dias após o domingo\n→ Enviar VIS4 (cuidado intermediário) para visitantes na 2.ª semana\n\n🗓️ *Domingo (manhã)*\n→ Enviar NC3, VIS2 e VIS3 (convites de domingo)\n→ Observar presença e anotar quem compareceu`,
            },
            {
                title: 'Janela de envio (horários recomendados)',
                body: `Evite enviar mensagens fora destes horários:\n\n⏰ *Dias úteis*: entre 9h e 12h ou entre 14h e 18h\n⏰ *Domingo*: entre 9h e 12h (antes do culto)\n\n❌ Evite:\n• Após as 21h\n• Durante o culto\n• Aos sábados (a menos que urgente)`,
            },
            {
                title: 'Lembretes fixos sugeridos',
                body: `Cadastre esses lembretes recorrentes no celular ou agenda:\n\n📌 Todo domingo às 9h: "Enviar convites NC3, VIS2 e VIS3"\n📌 Toda segunda às 9h: "Verificar novos convertidos do domingo e enviar NC1"\n📌 Toda quinta às 10h: "Enviar NC4 e VIS4"\n📌 Primeira segunda do mês: "Revisar backlog e atualizar tags desatualizadas"`,
            },
        ],
    },
];
