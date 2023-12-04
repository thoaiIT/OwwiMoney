'use client';

import { tailwindMerge } from '@/utils/helper';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { CiWallet } from 'react-icons/ci';
import { GiOwl } from 'react-icons/gi';
import { IoMdPaperPlane } from 'react-icons/io';
import { IoAnalytics, IoSettingsOutline } from 'react-icons/io5';
import { LuLayoutDashboard, LuTicket } from 'react-icons/lu';

const Breadcrumb = () => {
  const pathName = usePathname();
  const pathSegments = pathName?.split('/').filter(Boolean);

  const iconMap: Record<string, React.ReactNode> = {
    home: <AiOutlineHome />,
    dashboard: <LuLayoutDashboard />,
    transactions: <IoMdPaperPlane />,
    wallet: <CiWallet />,
    analytics: <IoAnalytics />,
    borrowers: <LuTicket />,
    setting: <IoSettingsOutline />,
  };

  return (
    <nav className="flex">
      <Link
        href={'/'}
        className="flex items-center gap-2 font-medium text-theme-foreground"
      >
        <span>{iconMap['home']}</span>
        <span> Home</span>
        <span> &gt;</span>
      </Link>
      {pathSegments?.map((segment, index) => (
        <Fragment key={segment}>
          <Link
            href={`/${pathSegments.slice(0, index + 1).join('/')}`}
            className={tailwindMerge(
              'flex gap-2 items-center ml-2 font-medium',
              index >= pathSegments.length - 1 && 'text-theme-text font-semibold',
            )}
          >
            {pathSegments[index - 1] === 'wallet' ? (
              <>
                <span className="flex items-center gap-2">
                  <GiOwl />
                  Details
                </span>
                <span>{index < pathSegments.length - 1 && ' > '}</span>
              </>
            ) : (
              <>
                {iconMap[segment.toLowerCase()] && <span>{iconMap[segment.toLowerCase()]}</span>}
                <span>{segment.charAt(0).toUpperCase() + segment.slice(1)}</span>
                <span>{index < pathSegments.length - 1 && ' > '}</span>
              </>
            )}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
