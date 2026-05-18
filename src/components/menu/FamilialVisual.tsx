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
    <div className="w-full flex flex-col items-center">
      <div className="w-full text-center py-6 px-4 mb-6 border-b-2 border-deep-charcoal">
        <h2 className="font-anton text-headline-lg-mobile text-deep-charcoal uppercase mb-2">
          {title} {size && <span className="text-xl tracking-normal text-tertiary">{size}</span>}
        </h2>
        {subtitle && (
          <p className="font-libre-franklin text-body-lg font-bold text-on-surface-variant italic">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex w-full px-4 gap-4 justify-center items-stretch max-w-lg mb-8">
        {activeCombos.map((combo, index) => (
          <div key={index} className="flex-1 flex flex-col items-center p-4 border-2 border-deep-charcoal rounded-md bg-white">
            <span className="font-anton text-2xl text-deep-charcoal mb-4">{combo.price} DT</span>
            {renderPizzaVisual(combo.count)}
            <div className="text-center flex flex-col items-center">
              <span className={`font-anton text-5xl leading-none ${combo.count === 2 ? 'text-primary' : 'text-price-green'}`}>
                {combo.count}
              </span>
              <span className="font-libre-franklin font-bold text-sm text-deep-charcoal uppercase tracking-wider mt-1">
                Combinaisons
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full px-4 mb-8">
        <div className="bg-supplement-bg border-2 border-deep-charcoal rounded-md p-6">
          <h3 className="font-libre-franklin text-title-md text-center mb-6 text-deep-charcoal">
            Choix Disponibles
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {activeChoices.map((choice) => (
              <span
                key={choice}
                className="inline-block bg-white border-2 border-deep-charcoal rounded-full px-4 py-2 font-libre-franklin font-bold text-sm text-deep-charcoal hover:bg-vibrant-yellow transition-colors"
              >
                {choice}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
