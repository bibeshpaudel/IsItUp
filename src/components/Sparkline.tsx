import React, { useEffect, useState } from 'react';

interface SparklineProps {
  data: number[];
  warnAfter?: number;
  isSmall?: boolean;
  isDown?: boolean;
}

export function Sparkline({ data, warnAfter, isSmall, isDown }: SparklineProps) {
  const [bars, setBars] = useState<number[]>(data);

  useEffect(() => {
    const interval = setInterval(() => {
      setBars(prevBars => {
        return prevBars.map(h => {
          if (Math.random() > 0.75) {
            const next = Math.max(4, Math.min(22, h + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3 + 1)));
            return next;
          }
          return h;
        });
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  if (isSmall) {
    return (
      <div className="flex items-end gap-[2px] h-5">
        {bars.map((h, i) => {
          const warn = warnAfter !== undefined && i > warnAfter;
          const col = isDown && i > 9 ? 'bg-alert/50' : warn ? 'bg-warn/50' : 'bg-accent/40';
          return (
            <div
              key={i}
              className={`w-[3px] rounded-[1px] shrink-0 self-end transition-all duration-[800ms] ease-in-out ${col}`}
              style={{ height: `${h}px` }}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-end gap-[2px] h-6">
      {bars.map((h, i) => {
        const isWarn = warnAfter !== undefined && i >= warnAfter;
        return (
          <div
            key={i}
            className={`w-[3px] rounded-[1px] transition-all duration-[800ms] ease-in-out ${isWarn ? 'bg-warn/50' : 'bg-accent/50'}`}
            style={{ height: `${h}px` }}
          />
        );
      })}
    </div>
  );
}
