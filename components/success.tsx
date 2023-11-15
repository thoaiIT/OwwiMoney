'use client';

import { useEffect, useState } from 'react';

const radius: string = '52';
const stroke: string = '8';
const circumference: number = 2 * Math.PI * Number(radius);

const Success = () => {
  const [progress, setProgress] = useState<number>(0);
  const [isDisplayProgressSmall, setIsDisplayProgressSmall] = useState<boolean>(false);
  const [isDisplayProgressBig, setIsDisplayProgressBig] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => prev + 2);
    }, 10);
    setTimeout(() => {
      setIsDisplayProgressSmall(true);
    }, 500);
    setTimeout(() => {
      setIsDisplayProgressBig(true);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  const strokeDashoffset =
    progress === 0 ? circumference + 52 : progress <= 100 ? -(circumference - (progress / 100) * circumference) : 0;

  return (
    <div className="relative p-10">
      <svg
        width="120"
        height="120"
        className="rotate-[205deg]"
      >
        <circle
          stroke="#C2CDE0"
          stroke-width={stroke}
          strokeDasharray={360}
          style={{ strokeDashoffset }}
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
        />
      </svg>
      {isDisplayProgressSmall && (
        <div className="w-14 h-2 rounded-xl absolute top-[47.4%] left-[23.5%] rotate-[50deg] after:content-[''] after:block after:w-7 after:h-full after:bg-midnight_blue-500 after:animate-progress-small after:translate-x-[100%] after:rounded-full" />
      )}
      {isDisplayProgressBig && (
        <div className="w-14 h-2 rounded-xl absolute top-[47%] left-[39.3%] rotate-[-50deg] after:content-[''] after:block  after:h-full after:bg-midnight_blue-500 after:animate-progress-big after:rounded-full" />
      )}
    </div>
  );
};

export default Success;
