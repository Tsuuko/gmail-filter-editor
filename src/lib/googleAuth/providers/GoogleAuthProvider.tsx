import React, { createContext } from 'react';
import useScript from 'react-script-hook';

export const LoadingContext = createContext(false);
export const ErrorContext = createContext<
  ReturnType<typeof useScript>[1] | undefined
>(undefined);

export const GoogleAuthProvider: React.FC = ({ children }) => {
  const [loading, error] = useScript({
    src: 'https://apis.google.com/js/api.js',
  });

  return (
    <LoadingContext.Provider value={loading}>
      <ErrorContext.Provider value={error}>{children}</ErrorContext.Provider>
    </LoadingContext.Provider>
  );
};
