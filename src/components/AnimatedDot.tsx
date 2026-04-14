import React from 'react';

interface AnimatedDotProps {
  color?: 'accent' | 'alert';
  className?: string;
}

export function AnimatedDot({ color = 'accent', className = 'w-3.5 h-3.5 shrink-0' }: AnimatedDotProps) {
  const isAlert = color === 'alert';
  const fillHex = isAlert ? '#e63946' : '#00d97e';

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={className}>
      <circle cx="50" cy="50" r="20" fill={fillHex}>
        <animate attributeName="r" values="20; 44; 20" keyTimes="0; 0.5; 1" calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6; 0; 0.6" keyTimes="0; 0.5; 1" calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="50" r="20" fill={fillHex} />
    </svg>
  );
}
