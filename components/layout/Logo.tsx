import OwwiLogo from '@/public/img/Owwi.png';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className="relative mt-5">
      <Image
        src={OwwiLogo}
        width={68}
        height={68}
        alt="Logo"
        className="absolute -top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4"
      />
      <span className="text-theme-logo font-bold text-[46px]">O</span>
      <span className="text-theme-logo font-bold text-[32px]">WWIMONE</span>
      <span className="text-theme-logo font-bold text-[46px]">Y</span>
    </div>
  );
};

export default Logo;
