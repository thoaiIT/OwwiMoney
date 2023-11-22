'use client';

import { CommonButton } from '@/components/button';
import OwwiError from '@/public/img/Owwi_error.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { GrPowerReset } from 'react-icons/gr';
import { VscArrowLeft } from 'react-icons/vsc';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();

  return (
    <div className="relative xl:grid xl:grid-cols-2 h-screen p-4 flex items-center justify-center">
      <svg
        width="100%"
        height="100vh"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 bg-[#E2EEF5] -z-10"
      >
        <path
          d="M-6.60047 937.848C27.4044 835.976 160.649 621.706 421.591 579.607C747.768 526.984 969.481 709.552 1335.83 629.445C1628.9 565.359 1895.84 184.359 1992.67 1.86937M-66.9516 591.847C-23.4799 665.515 130.147 798.611 396.878 741.647C730.292 670.442 1202.02 145.074 1621.68 163.493C1957.41 178.227 2241.68 208.019 2341.84 221.073M-73.4908 789.104C-47.9822 667.361 82.422 408.608 399.97 347.539C796.904 271.203 1077.21 475.77 1506.45 385.542C1849.84 313.36 2084.36 137.413 2158.7 58.4627"
          stroke="white"
          strokeOpacity="0.8"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <div className="text-black xl:flex items-center justify-center hidden">
        <div className="mx-10 pl-20 flex flex-col gap-4">
          <div className="font-medium text-6xl">I have bad news for you</div>
          <div className="font-normal text-3xl text-red-600">{error.message}</div>
          <div className="flex gap-4">
            <CommonButton
              intent={'outline'}
              className="w-48 flex items-center"
              onClick={() => {
                router.back();
              }}
            >
              <VscArrowLeft className="mr-2" />
              Go back
            </CommonButton>
            <CommonButton
              intent={'secondary'}
              className="w-48 flex items-center"
              onClick={() => reset()}
            >
              Reload
              <GrPowerReset className="ml-2" />
            </CommonButton>
          </div>
        </div>
      </div>
      <div className="text-black flex flex-col items-center justify-center gap-2">
        <Image
          src={OwwiError}
          width={600}
          height={600}
          alt="404"
        />
        <div className="xl:hidden flex flex-col items-center gap-4">
          <p className="text-3xl font-medium text-red-600">{error.message}</p>
          <CommonButton
            intent={'outline'}
            className="w-48 flex items-center"
            onClick={() => {
              router.back();
            }}
          >
            <VscArrowLeft className="mr-2" />
            Go back
          </CommonButton>
          <CommonButton
            intent={'secondary'}
            className="w-48 flex items-center"
            onClick={() => reset()}
          >
            Reload
            <GrPowerReset className="ml-2" />
          </CommonButton>
        </div>
      </div>
    </div>
  );
}
