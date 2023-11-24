'use client';

import NavBar from '@/components/dashboard/NavBar';
import SideBar from '@/components/dashboard/SideBar';
import Loading from '@/components/loading';
import { ScrollCustom } from '@/components/scroll';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { Suspense, useEffect } from 'react';

const CoreDashboard = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession({
    required: true,
  });
  const router = useRouter();
  useEffect(() => {
    if (!session?.user?.emailConfirmed && session) {
      router.push('/verification');
    }
    console.log(session);
  }, [session]);

  if (!session?.user?.emailConfirmed) return <div>Loading</div>;
  return (
    <div className="w-full">
      <div className="flex h-screen">
        <SideBar />
        <ScrollCustom className="h-full w-full lg:w-5/6 md:w-3/5 lg:px-8 lg:py-4 xl:px-12 md:p-6 flex flex-col">
          <Suspense fallback={<Loading />}>
            <NavBar />
          </Suspense>
          {children}
        </ScrollCustom>
      </div>
    </div>
  );
};

export default CoreDashboard;
