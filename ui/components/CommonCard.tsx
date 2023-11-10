'use client';

import clsx from 'clsx';

const CommonCard = ({ className, children }: { className: string; children: React.ReactNode }) => {
  return (
    <div
      className={clsx(
        className,
        'w-max min-h-max min-w-max text-slate-950 bg-white rounded-3xl p-5 shadow-lg dark:bg-dark-cpn',
      )}
    >
      {children}
    </div>
  );
};

export default CommonCard;
