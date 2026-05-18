import React from 'react';
import { 
  Pizza, 
  Sandwich, 
  Beef, 
  Salad, 
  CupSoda, 
  Utensils, 
  Flame,
  ChefHat,
  Heart
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Pizza,
  Sandwich,
  Beef,
  Salad,
  CupSoda,
  Utensils,
  Flame,
  ChefHat,
  Heart
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
