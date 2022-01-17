import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { ColorModeSwitcher } from '@/components/ColorModeSwitcher';
import { UserCard } from '@/components/UserCard';
import { useGoogleAuth } from '@/lib/googleAuth/hooks/useGoogleAuth';

export const Sandbox = () => {
  const {
    googleAuth,
    isLoading,
    isSignedIn,
    scriptLoadError,
    signIn,
    signOut,
  } = useGoogleAuth({
    clientId: import.meta.env.VITE_GOOGLE_API_CLIENT_ID,
    scope: [
      'https://www.googleapis.com/auth/gmail.labels',
      'https://www.googleapis.com/auth/gmail.settings.basic',
    ].join(' '),
    discoveryDocs: [
      'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest',
    ],
  });

  const [textareaValue, setTextareaValue] = useState<string>();
  const [userProfile, setUserProfile] = useState<gapi.auth2.BasicProfile>();

  useEffect(() => {
    if (!isSignedIn) {
      setTextareaValue(undefined);
    }
  }, [isSignedIn]);

  useEffect(() => {
    setUserProfile(googleAuth?.currentUser.get().getBasicProfile());
    googleAuth?.currentUser.listen((v) => setUserProfile(v.getBasicProfile()));
  }, [googleAuth?.currentUser]);

  return (
    <Box h="100vh">
      <Heading>Sandbox</Heading>
      <ColorModeSwitcher />
      {isSignedIn ? (
        <Button isLoading={isLoading} onClick={signOut}>
          logout
        </Button>
      ) : (
        <Button isLoading={isLoading} onClick={() => signIn()}>
          login
        </Button>
      )}

      <Button
        onClick={() => {
          setTextareaValue('Loading...');
          gapi.client.gmail.users.labels.list({ userId: 'me' }).execute((v) => {
            console.log(v);
            setTextareaValue(JSON.stringify(v, null, 2));
          });
        }}
      >
        list labels
      </Button>
      <Button
        onClick={() => {
          setTextareaValue('Loading...');
          gapi.client.gmail.users.settings.filters
            .list({ userId: 'me' })
            .execute((v) => {
              console.log(v);
              setTextareaValue(JSON.stringify(v, null, 2));
            });
        }}
      >
        list filters
      </Button>
      <Box minW="xs" w="fit-content" m="3">
        <UserCard
          name={isSignedIn ? userProfile?.getName() : undefined}
          email={isSignedIn ? userProfile?.getEmail() : undefined}
          imageUrl={isSignedIn ? userProfile?.getImageUrl() : undefined}
        />
      </Box>
      {String(isSignedIn)}
      <FormControl>
        <FormLabel>Access Token</FormLabel>
        <Input
          readOnly
          defaultValue={
            googleAuth?.currentUser.get().getAuthResponse().access_token
          }
          onClick={(e) => e.currentTarget.select()}
        />
      </FormControl>
      <Textarea bg="whiteAlpha.200" h="70%" readOnly value={textareaValue} />
    </Box>
  );
};
