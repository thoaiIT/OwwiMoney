'use client';

import NextTopLoader from '@/components/progressbar/NextTopLoader';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import nProgress from 'nprogress';
import { Suspense, useEffect } from 'react';

export function FinishingLoader() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    nProgress.done();
  }, [pathname, router, searchParams]);

  return null;
}

export default function ProgressBar() {
  return (
    <>
      <NextTopLoader />

      <Suspense fallback={null}>
        <FinishingLoader />
      </Suspense>
    </>
  );
}
