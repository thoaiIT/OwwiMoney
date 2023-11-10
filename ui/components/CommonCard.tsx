'use client';

import clsx from 'clsx';

type CommonCardProps = { className: string; children: React.ReactNode };

const CommonCard: React.FC<CommonCardProps> = ({ className, children }) => {
  return (
    <div
      className={clsx(
        className,
        'w-max min-h-max min-w-max text-slate-950 bg-white rounded-3xl p-5 shadow-lg dark:bg-dark-cpn dark:text-slate-50',
      )}
    >
      {children}
    </div>
  );
};

export default CommonCard;
