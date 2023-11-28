'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

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
    <div className="h-screen overflow-hidden px-4 bg-[#0e0e0e]">
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
          className="object-cover brightness-50"
        />
      </motion.div>

      <motion.div
        className="flex justify-between items-center"
        variants={logoAnimate}
        initial="hidden"
        animate="show"
      >
        <div className="text-xl font-semibold text-yellow-200 underline">OwwimoneY</div>
      </motion.div>

      <div className="relative top-[120px]">
        <motion.div
          className="relative left-[25%]"
          variants={textAnimate1}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            className="text-9xl text-light-blue tracking-tighter font-bold"
            variants={textAnimate2}
            custom={-150}
          >
            OwwiMoney
          </motion.h1>
        </motion.div>

        <motion.p
          className="absolute w-[600px] text-sm text-justify right-32 top-12 leading-2 font-semibold text-light-blue"
          variants={textParagraph}
          initial="hidden"
          animate="show"
        >
          <span className="text-blue-300">OwwiMoney</span> is a solution that helps users manage their finances
          effectively. It is built on a foundation of modern technology and techniques, creativity and high security.
        </motion.p>
        <motion.div
          className="relative left-[25%]"
          variants={textAnimate1}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            className="text-9xl text-blue-300 tracking-tighter font-bold"
            variants={textAnimate2}
            custom={100}
          >
            EXPERIENCE
          </motion.h1>
        </motion.div>
      </div>

      <motion.div
        className="flex gap-4 absolute bottom-4"
        variants={imageAnimate}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="relative w-[25vw] h-[30vh]"
          variants={imageAnimateChild}
        >
          <Image
            src="/home/BudgetPage.png"
            alt="Budget Page Design"
            fill
            sizes="(max-width: 768px) 33vw, (max-width: 1024px) 50vw, 100vw"
            className="rounded-sm saturate-150"
          />
        </motion.div>
        <motion.div
          className="relative flex-1 w-[25vw] h-[30vh]"
          variants={imageAnimateChild}
        >
          <Image
            src="/home/MyWalletPage.png"
            alt="Budget Page Design"
            fill
            sizes="(max-width: 768px) 33vw, (max-width: 1024px) 50vw, 100vw"
            className="rounded-sm saturate-150"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;
