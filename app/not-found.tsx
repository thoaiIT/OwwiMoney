export default function NotFound() {
  return (
    <div className="relative flex flex-cols h-screen">
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
      <div className="text-black w-[50vw] flex flex-cols">left</div>
      <div className="text-black w-[50vw]">right</div>
    </div>
  );
}
