import CommonAvatar from '@/components/CommonAvatar';
import Breadcrumb from '@/components/breadscrumb';
import { CommonCard } from '@/components/card';
import { Box, Flex, IconButton, Strong, Text } from '@radix-ui/themes';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const NavBar = ({ noti = true }: { noti?: boolean }) => {
  const { data: session } = useSession({
    required: true,
  });

  const [togglePanel, setTogglePanel] = useState(false);
  return (
    <Box className="flex justify-between h-20 items-center ">
      <Breadcrumb />
      <Box className="flex items-center gap-4 h-5/4">
        {/* <CustomSwitch id="airplane-mode" /> */}
        {/* Uncomment when functions completed*/}
        {/* <ThemeSwitch /> */}
        {/* <Box className="flex gap-3">
          <IoMdMail
            size={20}
            onClick={() => console.log('Mail')}
          />
          <Box className="relative ">
            {noti && <Box className="rounded-xl p-1 absolute right-0" />}
            <IoNotifications
              size={20}
              onClick={() => console.log('Noti')}
            />
          </Box>
        </Box> */}
        <Box className="bg-white-500 h-full w-[35vw] md:w-[17rem] rounded-2xl flex items-center py-2 px-4 justify-between shadow-md relative">
          <CommonAvatar
            alt="User avatar"
            src={
              session?.user?.image
                ? session?.user?.image
                : 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80'
            }
            className="w-12 h-12"
          />
          <Flex
            direction="column"
            gap="3"
          >
            <Text size={'1'}>
              <span className="text-red-400 font-bold">Hi,</span>{' '}
              <Strong>
                {session?.user?.name && session?.user?.name?.length > 12
                  ? session?.user?.name?.substring(0, 12) + '...'
                  : session?.user?.name}
              </Strong>
            </Text>
            {/* <Text size={'1'}>{session?.user?.email}</Text> */}
          </Flex>
          <IconButton
            onClick={() => {
              setTogglePanel((prev) => !prev);
            }}
            className="cursor-pointer"
          >
            {togglePanel ? <IoIosArrowUp size={22} /> : <IoIosArrowDown size={22} />}
          </IconButton>
          {togglePanel && (
            <CommonCard className="absolute bottom-[-0.2rem] right-0 transform translate-y-full w-48 rounded-lg shadow-md">
              <Link href={'/settings'}>
                <div className="hover:text-white hover:bg-[#1eabf8] px-4 py-4 rounded-lg rounded-bl-none rounded-br-none w-[100%]">
                  Setting
                </div>
              </Link>
              <button
                className="text-red-500 hover:text-white hover:bg-[#1eabf8] px-4 py-4 rounded-lg rounded-tl-none rounded-tr-none w-full text-left"
                onClick={() => signOut({ callbackUrl: '/login' })}
              >
                Logout
              </button>
            </CommonCard>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default NavBar;
