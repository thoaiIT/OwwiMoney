import CommonAvatar from '@/components/CommonAvatar';
import Breadcrumb from '@/components/breadscrumb';
import { CustomSwitch } from '@/components/switch';
import ThemeSwitch from '@/components/theme-switch';
import { Box, Flex, IconButton, Strong, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import { IoIosArrowDown, IoMdMail } from 'react-icons/io';
import { IoNotifications } from 'react-icons/io5';

const NavBar = ({ noti = true }: { noti?: boolean }) => {
  const { data: session } = useSession({
    required: true,
  });
  return (
    <Box className="flex justify-between h-20 items-center ">
      <Breadcrumb />
      <Box className="flex items-center gap-4 h-5/4">
        <CustomSwitch id="airplane-mode" />
        <ThemeSwitch />
        <Box className="flex gap-3">
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
        </Box>
        <Box className="bg-white-500 h-full w-[30vh] rounded-2xl flex items-center py-2 px-4 justify-between shadow-md">
          <CommonAvatar
            alt="User avatar"
            src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
            className="w-12 h-12"
          />
          <Flex
            direction="column"
            gap="3"
          >
            <Text size={'1'}>
              <span className="text-red-400 font-bold">Hi,</span> <Strong>{session?.user?.name}</Strong>
            </Text>
            {/* <Text size={'1'}>{session?.user?.email}</Text> */}
          </Flex>
          <IconButton
            onClick={() => console.log('Noti')}
            className="cursor-pointer"
          >
            <IoIosArrowDown size={22} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default NavBar;
