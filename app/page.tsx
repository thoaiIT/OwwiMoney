import { Button, Flex } from '@radix-ui/themes';

export default function Home() {
  return (
    <Flex gap="3">
      <Button
        color="indigo"
        variant="soft"
        className="bg-red-400"
      >
        Edit profile
      </Button>
    </Flex>
  );
}
