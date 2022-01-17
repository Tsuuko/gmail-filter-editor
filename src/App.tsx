import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Inspector } from 'react-dev-inspector';

import { GoogleAuthProvider } from '@/lib/googleAuth/providers/GoogleAuthProvider';

import { Sandbox } from './features/sandbox/pages/Sandbox';

const InspectorWrapper = import.meta.env.DEV ? Inspector : React.Fragment;

export const App = () => (
  <InspectorWrapper keys={['control', 'space']}>
    <ChakraProvider>
      <GoogleAuthProvider>
        <Sandbox />
      </GoogleAuthProvider>
    </ChakraProvider>
  </InspectorWrapper>
);
