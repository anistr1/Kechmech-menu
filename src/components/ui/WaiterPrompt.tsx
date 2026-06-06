import React from 'react';
import { BellRing } from 'lucide-react';

export function WaiterPrompt() {
  return (
    <div className="w-full px-5 mt-6 mb-12">
      <div className="bg-vibrant-yellow border-[3px] border-deep-charcoal rounded-[4px] p-4 flex flex-col items-center justify-center text-center shadow-[4px_4px_0px_rgba(33,37,41,1)]">
        <BellRing className="w-8 h-8 text-deep-charcoal mb-2" />
        <h3 className="font-anton text-2xl text-deep-charcoal uppercase leading-none mb-2">
          Prêt à commander ?
        </h3>
        <p className="font-libre-franklin text-base font-bold text-deep-charcoal/80 uppercase tracking-widest">
          Appelez votre serveur
        </p>
      </div>
    </div>
  );
}
