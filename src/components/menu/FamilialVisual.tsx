import React from 'react';

const DEFAULT_CHOICES = [
  'Tonno', 'Chakino', 'Chakino suprême', 'Mexicain',
  'Bresaola', 'Paisano', 'Ricca', 'Frutti de mare',
  'Acqua e terra', '4 fromages', 'Diavola', 'Norvégienne'
];

const DEFAULT_COMBOS = [
  { count: 2, price: 30 },
  { count: 4, price: 38 }
];

interface Combo {
  count: number;
  price: number;
}

interface FamilialVisualProps {
  title?: string;
  size?: string;
  subtitle?: string;
  combos?: Combo[];
  choices?: string[];
}

export function FamilialVisual({
  title = 'Format Familial',
  size = '(40 cm)',
  subtitle = 'Composez votre pizza !',
  combos,
  choices,
}: FamilialVisualProps) {
  // Use Sanity values if available, otherwise fall back to defaults
  const activeChoices = choices && choices.length > 0 ? choices : DEFAULT_CHOICES;
  const activeCombos = combos && combos.length > 0 ? combos : DEFAULT_COMBOS;

  const renderPizzaVisual = (count: number) => {
    if (count === 2) {
      return (
        <div
          className="w-24 h-24 rounded-full border-2 border-deep-charcoal mb-4"
          style={{
            background: 'conic-gradient(var(--color-vibrant-yellow) 0deg 180deg, var(--color-tertiary) 180deg 360deg)'
          }}
        >
          <div className="w-full h-full relative">
            <div className="absolute top-0 bottom-0 left-1/2 w-0 border-l-2 border-deep-charcoal -translate-x-1/2"></div>
          </div>
        </div>
      );
    }

    // Default to 4 slices gradient for other counts
    return (
      <div
        className="w-24 h-24 rounded-full border-2 border-deep-charcoal mb-4"
        style={{
          background: 'conic-gradient(var(--color-vibrant-yellow) 0deg 90deg, #f97316 90deg 180deg, var(--color-tertiary) 180deg 270deg, var(--color-price-green) 270deg 360deg)'
        }}
      >
        <div className="w-full h-full relative">
          <div className="absolute top-0 bottom-0 left-1/2 w-0 border-l-2 border-deep-charcoal -translate-x-1/2"></div>
          <div className="absolute left-0 right-0 top-1/2 h-0 border-t-2 border-deep-charcoal -translate-y-1/2"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col p-6 mb-8 border-b-[3px] border-deep-charcoal bg-white">
      <div className="w-full mb-8 text-left border-b-[3px] border-deep-charcoal pb-4">
        <h2 className="font-anton uppercase text-deep-charcoal leading-none text-[36px]">
          {title} {size && <span className="ml-2 text-tertiary">{size}</span>}
        </h2>
        {subtitle && <p className="font-libre-franklin font-bold text-on-surface-variant italic mt-3 text-lg">{subtitle}</p>}
      </div>

      <div className="w-full mb-8">
        <h3 className="font-libre-franklin text-sm font-bold text-deep-charcoal uppercase tracking-widest mb-4">Choix Disponibles</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {activeChoices.map((choice) => (
            <span key={choice} className="font-libre-franklin font-bold text-sm text-deep-charcoal underline decoration-2 decoration-vibrant-yellow underline-offset-4 hover:bg-vibrant-yellow transition-colors">
              {choice}
            </span>
          ))}
        </div>
      </div>

      <div className="flex w-full gap-4 items-stretch flex-wrap">
        {activeCombos.map((combo, index) => (
          <div key={index} className="flex-1 min-w-[140px] flex flex-col p-4 border-[3px] border-deep-charcoal bg-supplement-bg">
            <div className="flex justify-between items-start w-full mb-4">
              <span className={`font-anton text-4xl leading-none ${combo.count === 2 ? 'text-primary' : 'text-price-green'}`}>{combo.count}</span>
              <span className="font-anton text-xl text-deep-charcoal">{combo.price} DT</span>
            </div>
            <span className="font-libre-franklin font-bold text-xs text-deep-charcoal uppercase tracking-widest mb-4">Combinaisons</span>
            <div className="self-center mt-auto scale-[0.6] origin-top h-16">
              {renderPizzaVisual(combo.count)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
