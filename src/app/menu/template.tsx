import React from 'react';

export default function MenuTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-page-enter will-change-transform min-h-screen">
      {children}
    </div>
  );
}
