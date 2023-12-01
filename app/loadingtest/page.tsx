import WaterFill from '@/components/WaterFill';
import WaterWave from '@/components/home/WaterWave';

const Page = () => {
  return (
    <div className="flex flex-col bg-celestial_blue items-center justify-center h-screen">
      <WaterFill />
      <WaterWave />
    </div>
  );
};

export default Page;
