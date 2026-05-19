import React from 'react';

interface Supplement {
  _id: string;
  name: string;
  price: number;
}

interface SupplementSectionProps {
  title?: string;
  supplements: Supplement[];
}

export function SupplementSection({ title = 'Suppléments', supplements }: SupplementSectionProps) {
  if (!supplements || supplements.length === 0) return null;

  return (
    <div className="w-full px-5 mb-10 mt-6">
      <div className="bg-supplement-bg border-[3px] border-deep-charcoal rounded-[4px] overflow-hidden">

        {/* Header Block */}
        <div className="bg-vibrant-yellow border-b-[3px] border-deep-charcoal px-4 py-3 flex items-center justify-between">
          <h3 className="font-anton text-[26px] text-deep-charcoal uppercase leading-none tracking-wide pt-1">
            {title}
          </h3>
          <span className="bg-white text-deep-charcoal font-bold font-libre-franklin text-[14px] uppercase tracking-wider px-2 py-0.5 rounded-[4px] border-[2px] border-deep-charcoal">
            Optionnel
          </span>
        </div>

        {/* Supplements List */}
        <div className="flex flex-col p-4 gap-3">
          {supplements.map((sup) => (
            <div key={sup._id} className="flex justify-between items-center w-full border-b-[2px] border-deep-charcoal/10 pb-3 last:border-b-0 last:pb-0">
              <span className="font-libre-franklin font-bold text-[16px] text-deep-charcoal pr-4">
                {sup.name}
              </span>
              <span className="font-libre-franklin font-bold text-[16px] tracking-tight text-price-green whitespace-nowrap bg-price-bg px-2 py-0.5 rounded-[4px] border-[2px] border-price-border">
                + {sup.price.toFixed(2).replace('.', ',')} DT
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
