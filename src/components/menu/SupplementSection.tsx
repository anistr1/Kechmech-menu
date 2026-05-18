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
    <div className="w-full px-4 mb-8">
      <div className="bg-supplement-bg border border-outline-variant rounded-md p-4">
        <h3 className="font-libre-franklin font-bold text-lg text-deep-charcoal mb-4 uppercase tracking-wide">
          {title}
        </h3>
        
        <div className="flex flex-col gap-4">
          {supplements.map((sup) => (
            <div key={sup._id} className="flex justify-between items-center w-full">
              <span className="font-libre-franklin text-deep-charcoal pr-4">
                {sup.name}
              </span>
              <span className="font-libre-franklin text-on-surface-variant whitespace-nowrap">
                + {sup.price.toString().replace('.', ',')} DT
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
