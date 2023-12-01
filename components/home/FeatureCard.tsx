import { CardDescription } from '@/components/card';
import { tailwindMerge } from '@/utils/helper';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

type FeatureCardProps = {
  image: string | StaticImport;
  title: string;
  customTitle?: string;
};
const FeatureCard = ({ image, title, customTitle }: FeatureCardProps) => {
  return (
    <div className={tailwindMerge('w-full h-full flex flex-col justify-center items-center p-4')}>
      <Image
        src={image}
        alt="feature card"
        width={0}
        height={0}
        sizes="(max-width: 768px) 33vw, (max-width: 1024px) 50vw, 100vw"
        className="w-[100px] h-[100px] flex justify-center items-center"
      />
      <div className="mb-3">
        <CardDescription className={`${customTitle} text-xl font-semibold`}>{title}</CardDescription>
      </div>
    </div>
  );
};
export default FeatureCard;
