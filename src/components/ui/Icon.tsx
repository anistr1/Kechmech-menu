import React from 'react';
import { 
  Pizza, 
  Sandwich, 
  Beef, 
  Salad, 
  CupSoda, 
  Utensils, 
  Flame,
  ChefHat
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Pizza,
  Sandwich,
  Beef,
  Salad,
  CupSoda,
  Utensils,
  Flame,
  ChefHat
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
