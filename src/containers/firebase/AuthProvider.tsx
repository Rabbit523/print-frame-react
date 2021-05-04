import React, { useState, useEffect, createContext } from 'react';
import { auth } from './auth';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { SAVE_USER, GET_USER, CHANGE_ORDER_UID } from '../../queries/auth';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const clearCtx = { currentUser: {}, authenticated: false, roles: {}, handleSignOut: (): void => {} };
export const AuthContext = createContext(clearCtx);

export const AuthProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [setUser] = useMutation(SAVE_USER);
  const [updateUid] = useMutation(CHANGE_ORDER_UID);
  const { data } = useQuery(GET_USER);
  let currentUser: any;
  if (data) {
    currentUser = data.user;
  }
  const [authenticated, setAuthenticated] = useState(false);
  const [roles, setRoles] = useState();
  const changeUserStatus = async (user: firebase.User | null): Promise<void> => {
    if (currentUser && currentUser.isAnonymous && user && !user.isAnonymous) {
      //This is the case that we had anonymous user and then user logged in.
      updateUid({ variables: { input: { currentUid: currentUser.uid, newUid: user.uid } } });
    }
    if (user) {
      const input = { uid: user.uid, isAnonymous: user.isAnonymous };
      setUser({ variables: { input } });
    }

    if (user && !user.isAnonymous) {
      setAuthenticated(true);
      user.getIdToken().then(value => {
        if (process.env.NODE_ENV === 'development') {
          console.log('Token => ', value);
        }
      });
      const { claims } = await user.getIdTokenResult();
      setRoles(claims);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSignOut = (): void => {
    setAuthenticated(false);
    setRoles({});
    auth.signOut();
    localStorage.clear();
  };
  useEffect(() => {
    auth.onAuthStateChanged(changeUserStatus);
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser, authenticated, roles, handleSignOut }}>{children}</AuthContext.Provider>
  );
};
