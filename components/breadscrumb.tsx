'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

const Breadcrumb = () => {
  const pathName = usePathname();
  const pathSegments = pathName?.split('/').filter(Boolean);

  const iconMap: Record<string, React.ReactNode> = {
    home: '🏠',
    products: '🛍️',
  };

  return (
    <nav>
      {pathSegments?.map((segment, index) => (
        <Fragment key={segment}>
          <Link href={`/${pathSegments.slice(0, index + 1).join('/')}`}>
            {iconMap[segment.toLowerCase()] && <span>{iconMap[segment.toLowerCase()]} </span>}
            {segment.charAt(0).toUpperCase() + segment.slice(1)}
          </Link>
          {index < pathSegments.length - 1 && ' > '}
        </Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
