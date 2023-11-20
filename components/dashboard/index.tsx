'use client';

import { Box } from '@radix-ui/themes';
import React, { Suspense } from 'react';
import Breadcrumb from '../breadscrumb';
import Loading from '../loading';
import { ScrollCustom } from '../scroll';
import SideBar from './SideBar';

const CoreDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:container">
      <div className="flex h-screen">
        <SideBar />
        <ScrollCustom className="h-full w-full lg:w-4/5 md:w-3/5 lg:px-8 lg:py-4 xl:px-12 md:p-6">
          {children}
        </ScrollCustom>
        <Suspense fallback={<Loading />}>
          <Breadcrumb />
          <Box>hello</Box>
        </Suspense>
      </div>
    </div>
  );
};

export default CoreDashboard;
