'use client';

import SideBarRouter from '@/components/dashboard/SideBarRouter';
import Logo from '@/components/layout/Logo';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { CiLogout } from 'react-icons/ci';

const SideBar = () => {
  return (
    <div className="h-[100% - 8px] overflow-y-auto m-2 hidden border-r-2 lg:w-1/6 md:w-2/5 md:max-w-[316px] p-4 bg-theme text-theme-foreground shadow-lg rounded-3xl md:flex md:flex-col justify-between">
      <div>
        <Link href={'/dashboard'}>
          <div className="flex justify-center items-center my-10">
            <Logo />
          </div>
        </Link>
        <SideBarRouter />
      </div>
      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="flex justify-start items-center py-5 px-4 mb-[5px] leading-[1.2] text-base font-medium hover:font-bold text-color-resend"
      >
        <CiLogout className="w-6 h-6 mr-4" />
        Logout
      </button>
    </div>
  );
};

export default SideBar;
