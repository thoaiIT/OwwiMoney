'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { VscArrowRight } from 'react-icons/vsc';
import { CommonButton } from '../components/button';
import Owwi404 from '../public/img/Owwi_404.png';

export default function NotFound() {
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
          <div className="font-bold text-5xl">Oops...</div>
          <div className="font-medium text-6xl">Page not found</div>
          <div className="font-normal text-3xl">
            ...maybe the page you’re looking for is not found or never existed.
          </div>
          <CommonButton
            intent={'secondary'}
            className="w-48 flex items-center"
            onClick={() => {
              router.back();
            }}
          >
            Go back
            <VscArrowRight className="ml-6" />
          </CommonButton>
        </div>
      </div>
      <div className="text-black flex flex-col items-center justify-center gap-2">
        <Image
          src={Owwi404}
          width={600}
          height={600}
          alt="404"
        />
        <div className="xl:hidden">
          <p className="text-2xl mb-4">Page not found</p>
          <CommonButton
            intent={'secondary'}
            className="w-48 flex items-center"
            onClick={() => {
              router.back();
            }}
          >
            Go back
            <VscArrowRight className="ml-6" />
          </CommonButton>
        </div>
      </div>
    </div>
  );
}
