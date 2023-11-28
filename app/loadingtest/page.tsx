import ProcessIndicator from '@/components/ProcessIndicator';
import WaterFill from '@/components/WaterFill';

const Page = () => {
  return (
    <div className="flex flex-col bg-celestial_blue items-center justify-center h-screen">
      <WaterFill />
      <ProcessIndicator />
    </div>
  );
};

export default Page;
