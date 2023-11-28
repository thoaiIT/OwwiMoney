'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { IconType } from 'react-icons';
import { FaPaperPlane, FaWallet } from 'react-icons/fa';
import { IoMdAnalytics } from 'react-icons/io';
import { IoSettings } from 'react-icons/io5';
import { MdDashboard } from 'react-icons/md';
import { PiTicketFill } from 'react-icons/pi';
import { tailwindMerge } from '../../utils/helper';

interface ListItemProps {
  className?: string;
  title: string;
  href: string;
  icon: IconType;
}

const SideBarRouter = () => {
  const pathname = usePathname();
  const ListItem = ({ className, title, href, icon: Icon, ...props }: ListItemProps) => (
    <li>
      <Link
        href={href}
        className={tailwindMerge(
          'flex justify-start items-center py-5 px-4 mb-[5px] leading-[1.2] text-base font-medium',
          className,
          `${
            pathname === href
              ? 'font-bold bg-theme-component text-theme rounded-3xl'
              : 'hover:font-bold hover:bg-theme-hover hover:rounded-3xl hover:duration-300'
          }`,
        )}
        {...props}
      >
        <Icon className="w-6 h-6 mr-4" />
        {title}
      </Link>
    </li>
  );

  return (
    <ul className="mt-10 gap-2 ">
      <ListItem
        icon={MdDashboard}
        title="Dashboard"
        href="/dashboard"
      />
      <ListItem
        icon={FaWallet}
        title="My wallet"
        href="/wallet"
      />
      <ListItem
        icon={FaPaperPlane}
        title="Transactions"
        href="/transactions"
      />
      <ListItem
        icon={FaPaperPlane}
        title="Partners"
        href="/partners"
      />
      <ListItem
        icon={IoMdAnalytics}
        title="Analytics"
        href="/analytics"
      />
      <ListItem
        icon={PiTicketFill}
        title="Borrowers"
        href="/borrowers"
      />
      <ListItem
        icon={IoSettings}
        title="Settings"
        href="/settings"
      />
    </ul>
  );
};

export default SideBarRouter;
