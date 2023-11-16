'use client';

import SideBarRouter from './SideBarRouter';

const SideBar = () => {
  return (
    <div className="h-screen border-r-2 md:w-1/4 lg:p-10 md:pt-5  hidden md:block">
      <div className="flex justify-start items-center">
        <h1 className="font-bold text-xl ml-2">owwi money</h1>
      </div>
      <SideBarRouter />
    </div>
  );
};
