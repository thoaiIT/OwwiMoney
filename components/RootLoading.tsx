import Image from 'next/image';

const RootLoading = () => {
  return (
    <div>
      <Image
        src="/loading/PineappleTart.gif"
        alt="loading_gif"
        width={0}
        height={0}
        className="w-[200px] h-[200px]"
      />
      <div className="flex justify-center items-end">
        <span className="text-3xl font-bold mr-[5px] animate-jump">L</span>
        <span className="text-3xl font-bold mr-[5px] animate-[jump_0.5s_ease-in_0.05s_infinite]">o</span>
        <span className="text-3xl font-bold mr-[5px] animate-[jump_0.5s_ease-in_0.1s_infinite]">a</span>
        <span className="text-3xl font-bold mr-[5px] animate-[jump_0.5s_ease-in_0.15s_infinite]">d</span>
        <span className="text-3xl font-bold mr-[5px] animate-[jump_0.5s_ease-in_0.2s_infinite]">i</span>
        <span className="text-3xl font-bold mr-[5px] animate-[jump_0.5s_ease-in_0.25s_infinite]">n</span>
        <span className="text-3xl font-bold mr-[5px] animate-[jump_0.5s_ease-in_0.3s_infinite]">g</span>
      </div>
    </div>
  );
};

export default RootLoading;
