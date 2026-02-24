const fs = require('fs');
const f = 'c:/Users/Alefy Rezende/OneDrive/Arquivos Computador/MVP/Arquivos MVP/Aplicativos/fluxo-de-mensagens-novos-convertidos/data/appData.ts';

let content = fs.readFileSync(f, 'utf8');
let lines = content.split(/\r?\n/);
let res = [];

for (let i = 0; i < lines.length; i++) {
    let l = lines[i];

    // Check for nextAction field
    if (l.trim().startsWith('nextAction:')) {
        continue;
    }

    // Check for duplicate attachments field
    if (l.trim().startsWith('attachments?: Attachment[];')) {
        if (i + 1 < lines.length && lines[i + 1].trim().startsWith('attachments?: Attachment[];')) {
            continue; // Skip the first duplicate
        }
    }

    res.push(l);
}

fs.writeFileSync(f, res.join('\n'), 'utf8');
console.log('Script completed replacing nextAction and attachments');
