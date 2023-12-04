import Link from 'next/link';

const StartButton = () => {
  return (
    <div className="grid">
      <Link
        href="/login"
        className="flex justify-center items-center cta relative m-auto py-[19px] px-[22px] transition-all duration-[0.2s] ease-linear group active:transform active:scale-96"
      >
        <span
          className="absolute left-0 block rounded-full bg-blue-300 w-[56px] h-[56px] transition-all duration-[0.3s] ease-linear 
      group-hover:w-full group-hover:bg-blue-400 "
        />
        <span className="relative text-xl font-bold uppercase align-middle tracking-[0.25em]">Getting start</span>
        <svg
          width="20px"
          height="17px"
          viewBox="0 0 13 10"
          className="relative top-0 ml-[30px] fill-none stroke-current stroke-2 transform -translate-x-5 transition-all duration-300 ease-linear
          group-hover:translate-x-0"
        >
          <path d="M1,5 L11,5" />
          <polyline points="8 1 12 5 8 9" />
        </svg>
      </Link>
    </div>
  );
};

export default StartButton;
