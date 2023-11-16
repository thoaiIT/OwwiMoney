import React, { Suspense } from 'react';
import Loading from '../loading';
import { ScrollCustom } from '../scroll';
import SideBar from './SideBar';

const CoreDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:container p-5">
      <div className="flex">
        <SideBar />
        <ScrollCustom className="h-screen w-full lg:w-2/4 md:w-3/4 lg:px-8 lg:py-4 xl:px-12  md:p-6">
          {children}
        </ScrollCustom>
        <Suspense fallback={<Loading />}>hello</Suspense>
      </div>
    </div>
  );
};

export default CoreDashboard;
