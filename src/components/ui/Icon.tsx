import React from 'react';
import { 
  Pizza, 
  Sandwich, 
  Beef, 
  Salad, 
  CupSoda, 
  Utensils, 
  UtensilsCrossed,
  Flame,
  ChefHat,
  Heart,
  Wheat,
  Croissant
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Pizza,
  Sandwich,
  Beef,
  Salad,
  CupSoda,
  Utensils,
  UtensilsCrossed,
  Flame,
  ChefHat,
  Heart,
  Wheat,
  Croissant
};

interface IconProps {
  name?: string;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  if (!name) return null;
  
  const IconComponent = iconMap[name] || Utensils;
  return <IconComponent className={className} />;
}
