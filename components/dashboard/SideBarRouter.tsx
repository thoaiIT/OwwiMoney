'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tailwindMerge } from '../../utils/helper';

interface ListItemProps {
  className?: string;
  title: string;
  href: string;
}

const SideBarRouter = () => {
  const pathname = usePathname();

  const ListItem = ({ className, title, href, ...props }: ListItemProps) => (
    <li>
      <Link
        href={href}
        className={tailwindMerge(
          'flex justify-start items-center hover:font-bold',
          className,
          `${pathname === href ? 'font-bold' : ''}`,
        )}
        {...props}
      >
        <div className="text-violet12 mb-[5px] font-medium leading-[1.2]">{title}</div>
      </Link>
    </li>
  );

  return (
    <ul className="mt-10">
      <ListItem
        title="Dashboard"
        href="/dashboard"
      />
      <ListItem
        title="My wallet"
        href="/wallet"
      />
      <ListItem
        title="Transactions"
        href="/transactions"
      />
      <ListItem
        title="Analitycs"
        href="/analitycs"
      />
      <ListItem
        title="Borrowers"
        href="/borrowers"
      />
      <ListItem
        title="Settings"
        href="/settings"
      />
    </ul>
  );
};

export default SideBarRouter;
