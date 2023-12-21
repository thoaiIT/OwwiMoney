'use client';

// import Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import type { WalletStatisticType } from '@/actions/services/statisticService';
import WalletCard from '@/components/cardslider/WalletCard';
import 'swiper/css/scrollbar';
import { Navigation, Pagination } from 'swiper/modules';
type Props = {
  wallets: WalletStatisticType[];
  onNextCard: () => void;
  onPreviousCard: () => void;
};
const CardSlider = ({ wallets, onNextCard, onPreviousCard }: Props) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination]}
      onInit={(swiper) => {
        if (swiper.params.navigation) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          swiper.params.navigation.nextEl = navigationNextRef.current;
        }
        swiper.navigation.init();
        swiper.navigation.update();
      }}
      navigation={{
        prevEl: navigationPrevRef.current!, // Assert non-null
        nextEl: navigationNextRef.current!, // Assert non-null
      }}
      spaceBetween={0}
      slidesPerView={1}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      className="!w-full !h-[230px]"
    >
      {wallets.map((item, idx) => (
        <SwiperSlide
          key={`wallet-card-${idx}`}
          // className="!w-[300px]"
          className="!mr-0 !w-full"
        >
          <WalletCard wallet={item} />
        </SwiperSlide>
      ))}

      <button
        className="swiper-button-prev after:!text-2xl"
        ref={navigationPrevRef}
        onClick={onPreviousCard}
      />
      <button
        className="swiper-button-next after:!text-2xl"
        ref={navigationNextRef}
        onClick={onNextCard}
      />
    </Swiper>
  );
};

export default CardSlider;
