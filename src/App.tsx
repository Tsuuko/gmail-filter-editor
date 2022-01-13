import { ChakraProvider } from '@chakra-ui/react';

import { Sandbox } from './features/sandbox/pages/Sandbox';

export const App = () => (
  <ChakraProvider>
    <Sandbox />
  </ChakraProvider>
);
