import { initFirebase, facebookAuthProvider, googleAuthProvider } from './firebase';
import firebase from 'firebase/app';
export const auth = initFirebase.auth();
import * as Sentry from '@sentry/browser';

export const useSignInWithGoogle = (): Function => {
  return async (): Promise<void> => {
    try {
      if (auth.currentUser && !auth.currentUser.isAnonymous) {
        console.log('We have current user', auth.currentUser);
        await auth.currentUser.linkWithPopup(googleAuthProvider);
      } else {
        await auth.signInWithRedirect(googleAuthProvider);
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const useSingInAnonymously = (): Function => {
  return async (): Promise<void> => {
    try {
      await auth.signInAnonymously();
    } catch (e) {
      console.log(e);
    }
  };
};

export const useSignInWithFacebook = (): Function => {
  return async (): Promise<void> => {
    try {
      if (auth.currentUser && !auth.currentUser.isAnonymous) {
        await auth.currentUser.linkWithPopup(facebookAuthProvider);
      } else {
        await auth.signInWithRedirect(facebookAuthProvider);
      }
    } catch (e) {
      console.log(e);
    }
  };
};

//This hook will sing the user up with email and password
export const useSignInEmailPassword = (): Function => {
  return async (email: string, password: string): Promise<void> => {
    try {
      const credential = await firebase.auth.EmailAuthProvider.credential(email, password);
      if (auth.currentUser) {
        auth.currentUser.linkWithCredential(credential).then(
          function(user) {
            console.log('Anonymous account successfully upgraded', user);
          },
          function(error) {
            Sentry.captureException(error);
          },
        );
      } else {
        auth.signInWithEmailAndPassword(email, password);
      }
    } catch (e) {
      console.log(e);
    }
  };
};

//This hook will create a user with user and password
export const useCreateUserWithEmailAndPassword = (): Function => {
  return async (email: string, password: string): Promise<any> => {
    try {
      const credential = firebase.auth.EmailAuthProvider.credential(email, password);
      if (auth.currentUser) {
        auth.currentUser.linkWithCredential(credential).then(
          function(user) {
            console.log('Anonymous account successfully upgraded', user);
          },
          function(error) {
            Sentry.captureException(error);
          },
        );
      } else {
        await auth.createUserWithEmailAndPassword(email, password);
      }
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        return false;
      }
    }
  };
};

//This hook will get us the token for the currently logged in user(It can be anonymous user too)
export const getAuthToken = async (): Promise<string> => {
  if (!auth.currentUser) {
    await auth.signInAnonymously();
  }
  if (auth.currentUser) {
    return await auth.currentUser.getIdToken();
  }
  return '';
};

//This hook will send password reset link
export const useRecoverPassword = (): Function => {
  return (email: string): void => {
    auth.sendPasswordResetEmail(email);
  };
};

//This hook will check to see if user is logged in
export const isLoggedIn = (): boolean => {
  if (auth.currentUser) {
    return !auth.currentUser.isAnonymous;
  } else {
    return false;
  }
};
