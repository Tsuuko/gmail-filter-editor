import { ChakraProvider } from '@chakra-ui/react';

import { GoogleAuthProvider } from '@/lib/googleAuth/providers/GoogleAuthProvider';

import { Sandbox } from './features/sandbox/pages/Sandbox';

export const App = () => (
  <ChakraProvider>
    <GoogleAuthProvider>
      <Sandbox />
    </GoogleAuthProvider>
  </ChakraProvider>
);
