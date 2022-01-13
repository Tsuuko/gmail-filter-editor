import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';

// You can import global CSS files here.

// No-op wrapper.
export const Wrapper: React.FC = ({ children }) => (
  <ChakraProvider>{children}</ChakraProvider>
);
