'use client';

import { useEffect, useState } from 'react';

export default function ProcessIndicator() {
  const [filled, setFilled] = useState(0);
  const [isRuning, setIsRunning] = useState(false);

  useEffect(() => {
    if (filled < 100 && isRuning) {
      setTimeout(() => setFilled((prev) => (prev += 2)), 50);
      console.log(filled);
    }
  }, [filled, isRuning]);
  return (
    <div>
      <div className="relative overflow-hidden w-[30vw] h-[35px] rounded-xl bg-light-mode drop-shadow-2xl">
        <div
          style={{ width: `${filled}%` }}
          className="h-full transition-width duration-1000 bg-money-pattern rounded-xl animate-transitionTiming"
        />
      </div>
    </div>
  );
}
