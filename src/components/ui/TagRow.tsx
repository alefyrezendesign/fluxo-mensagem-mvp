import React from 'react';
import { Tag } from 'lucide-react';

export const TagRow: React.FC<{ tags: string[] }> = ({ tags }) => (
    <div className="flex flex-wrap gap-1.5">
        {tags.map(t => (
            <span key={t} className="inline-flex items-center gap-1 bg-[#1a1535] border border-purple-800/40 text-purple-300 text-[11px] font-bold px-2.5 py-1 rounded-full">
                <Tag size={9} />{t}
            </span>
        ))}
    </div>
);
