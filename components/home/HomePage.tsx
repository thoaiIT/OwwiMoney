'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import StartButton from '@/components/home/StartButton';
import WaterWave from '@/components/home/WaterWave';
import { Lobster } from 'next/font/google';

const lobster = Lobster({ variable: '--display-font', preload: false, subsets: ['latin'], weight: ['400', '400'] });
const HomePage = () => {
  const bgAnimate = {
    hidden: {
      clipPath: 'polygon(21% 27%, 77% 26%, 77% 77%, 21% 77%)',
    },
    show: {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      transition: {
        ease: 'easeInOut',
        duration: 0.8,
        delay: 1,
      },
    },
  };

  const textAnimate1 = {
    hidden: {
      y: '100%',
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        ease: 'easeInOut',
        duration: 0.8,
        staggerChildren: 0.4,
        delayChildren: 1,
      },
    },
  };

  const textAnimate2 = {
    hidden: {
      x: 0,
    },
    show: (i: number) => ({
      x: i,
      opacity: 1,
      transition: {
        ease: 'easeInOut',
        duration: 0.8,
      },
    }),
  };

  const imageAnimate = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.6,
        delayChildren: 3.6,
        ease: 'easeInOut',
      },
    },
  };

  const imageAnimateChild = {
    hidden: {
      x: 100,
      opacity: 0,
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        ease: 'easeInOut',
      },
    },
  };

  const WaterWaveAnime = {
    hidden: {
      y: '0%', // start from left
      opacity: 0,
    },
    show: {
      y: '0%', // end at right
      opacity: 1,
      transition: {
        ease: 'easeInOut', // change this to 'linear', 'easeIn', 'easeOut', 'easeInOut', etc.
        duration: 1, // increase this to make the animation slower and smoother
        delay: 3.9,
      },
    },
  };

  const textParagraph = {
    hidden: {
      y: '-100%',
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 60,
        delay: 2.8,
      },
    },
  };

  const logoAnimate = {
    hidden: {
      y: '-110%',
    },
    show: {
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 60,
        delay: 2,
      },
    },
  };

  return (
    <div className="h-screen overflow-hidden bg-dark-mode dark:bg-light-mode">
      <motion.div
        className="absolute inset-0 h-screen w-screen z-0"
        variants={bgAnimate}
        initial="hidden"
        animate="show"
      >
        <Image
          src="/img/Owwi_background.png"
          alt="background"
          fill
          priority
          className="object-cover brightness-80"
        />
      </motion.div>

      <motion.div
        className="flex justify-between items-center px-8"
        variants={logoAnimate}
        initial="hidden"
        animate="show"
      >
        <div className={`text-2xl font-semibold text-light-mode underline ${lobster.className}`}>Owwimutiverse</div>
      </motion.div>

      <div className="relative top-[120px]">
        <motion.div
          className="relative left-[25%]"
          variants={textAnimate1}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            className="lg:text-9xl lg:text-left md:text-8xl sm:text-6xl text-4xl text-center text-light-mode dark:text-dark-mode tracking-tighter font-bold"
            variants={textAnimate2}
            custom={-150}
          >
            OwwiMoney
          </motion.h1>
        </motion.div>

        <motion.p
          className=" 2xl:absolute 2xl:block hidden 2xl:w-[30vw] w-[20vw] text-sm text-justify right-32 top-12 leading-2 font-semibold text-light-blue"
          variants={textParagraph}
          initial="hidden"
          animate="show"
        >
          Are you ready to take control of your finances and embark on a journey towards financial well-being? Look no
          further! <span className="text-blue-300">OwwiMoney</span> is your ultimate financial companion, designed to
          empower you in managing your money effectively and achieving your financial goals.
        </motion.p>
        <motion.div
          className="relative left-[25%]"
          variants={textAnimate1}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            className="lg:text-9xl md:text-8xl sm:text-6xl text-4xl text-blue-300 tracking-tighter font-bold"
            variants={textAnimate2}
            custom={100}
          >
            EXPERIENCE
          </motion.h1>
        </motion.div>
      </div>

      <motion.div
        className="lg:flex gap-8 bottom-[30%] left-[40%] px-8 hidden lg:absolute "
        variants={imageAnimate}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="flex justify-center items-center"
          variants={imageAnimateChild}
        >
          {/* <Link
            href={'/login'}
            className="uppercase p-4 bg-slate-100 rounded-2xl font-extrabold"
          >
            getting start
          </Link> */}
          <StartButton />
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute bottom-0 w-screen"
        variants={WaterWaveAnime}
        initial="hidden"
        animate="show"
      >
        <WaterWave />
      </motion.div>
    </div>
  );
};

export default HomePage;
