import { useCallback, useContext, useEffect, useState } from 'react';

import { ErrorContext, LoadingContext } from '../providers/GoogleAuthProvider';

export const useGoogleAuth = (
  initArgs: Parameters<typeof gapi.client.init>[0]
) => {
  const scriptLoadError = useContext(ErrorContext);

  const [googleAuth, setGoogleAuth] = useState<gapi.auth2.GoogleAuth>();
  const [isSignedIn, setIsSignedIn] = useState(false);

  const isScriptLoading = useContext(LoadingContext);
  const [isClientLoading, setIsLoading] = useState(false);
  const [isGoogleAuthLoading, setIsGoogleAuthLoading] = useState(false);
  const isLoading = isScriptLoading || isClientLoading || isGoogleAuthLoading;

  const initClient = useCallback(() => {
    setIsLoading(true);
    void gapi.client.init(initArgs).then(() => {
      console.log('auth2 client loaded.');
      setGoogleAuth(gapi.auth2.getAuthInstance());
      setIsGoogleAuthLoading(false);
    });
  }, [initArgs]);

  useEffect(() => {
    if (!isScriptLoading && !googleAuth && !isGoogleAuthLoading) {
      setIsGoogleAuthLoading(true);
      gapi.load('client:auth2', initClient);
    }
  }, [googleAuth, initClient, isGoogleAuthLoading, isScriptLoading]);

  useEffect(() => {
    setIsSignedIn(googleAuth?.isSignedIn.get() || false);
    const listener = googleAuth?.isSignedIn.listen((v) => {
      setIsSignedIn(v);
    });
    setIsLoading(false);
    return () => {
      (listener as unknown as { remove: () => void })?.remove();
    };
  }, [googleAuth]);

  const signIn = useCallback(
    async (options?: Parameters<gapi.auth2.GoogleAuth['signIn']>[0]) => {
      setIsLoading(true);
      try {
        await googleAuth?.signIn(options);
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoading(false);
      }
    },
    [googleAuth]
  );

  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      await googleAuth?.signOut();
    } catch (e) {
      console.warn(e);
    } finally {
      setIsLoading(false);
    }
  }, [googleAuth]);

  return {
    googleAuth,
    isLoading,
    isSignedIn,
    scriptLoadError,
    signIn,
    signOut,
  };
};
