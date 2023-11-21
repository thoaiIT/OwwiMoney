'use client';

import SideBarRouter from '@/components/dashboard/SideBarRouter';
import Logo from '@/components/layout/Logo';
import Link from 'next/link';
import { CiLogout } from 'react-icons/ci';

const SideBar = () => {
  return (
    <div className="h-[100% - 8px] m-2 border-r-2 lg:w-1/4 md:w-2/5 lg:p-6 md:pt-5 bg-theme text-theme-foreground shadow-lg rounded-3xl flex flex-col justify-between">
      <div>
        <Link href={'/dashboard'}>
          <div className="flex justify-center items-center my-10">
            <Logo />
          </div>
        </Link>
        <SideBarRouter />
      </div>
      <Link
        href="/api/auth/signout?callbackUrl=/login"
        className="flex justify-start items-center py-5 px-4 mb-[5px] leading-[1.2] text-base font-medium hover:font-bold text-color-resend"
      >
        <CiLogout className="w-6 h-6 mr-4" />
        Logout
      </Link>
    </div>
  );
};

export default SideBar;
