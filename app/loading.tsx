import WaterFill from '@/components/WaterFill';

const Loading = () => {
  return (
    <div className="flex flex-col bg-celestial_blue items-center justify-center h-screen marker:text-center">
      <WaterFill />
    </div>
    // <div className="animate-spin w-20 h-20 border-t-4 border-b-4  border-orange-400 rounded-full" />
  );
};

export default Loading;
