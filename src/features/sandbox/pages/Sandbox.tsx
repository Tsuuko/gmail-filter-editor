import { Button, Heading, useToast } from '@chakra-ui/react';

import { ColorModeSwitcher } from '@/components/ColorModeSwitcher';

export const Sandbox = () => {
  const toast = useToast();
  return (
    <div>
      <Heading>Sandbox</Heading>
      <ColorModeSwitcher />
      <Button
        colorScheme="blue"
        onClick={() =>
          toast({
            title: 'Hello!',
            description: "I'm a toast!",
            status: 'info',
            duration: 5000,
            isClosable: true,
          })
        }
      >
        Button
      </Button>
    </div>
  );
};
