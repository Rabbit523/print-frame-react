import './html/css/style.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import client, { makeItPersist } from './containers/apolloProvide';
import * as Sentry from '@sentry/browser';
import { CloudinaryContext } from 'cloudinary-react';
import config from './env';
import './i18n';
import MainRoutes from './screens/MainRoutes';
import { AuthProvider } from './containers/firebase/AuthProvider';
if (process.env.NODE_ENV !== 'development') {
  Sentry.init({ dsn: 'https://c554008accb9497c8bda152e2cb49509@sentry.io/2924014' });
  console.log('sentryInit');
}

const App = (): JSX.Element => {
  const loader = document.querySelector('.loader') as HTMLInputElement;
  const hideLoader = (): void => loader.classList.add('loader--hide');
  const [hydrated, setHydrated] = useState<boolean>(false);
  useEffect((): void => {
    makeItPersist().then(() => {
      hideLoader();
      setHydrated(true);
    });
  }, []);

  if (hydrated) {
    return (
      <ApolloProvider client={client}>
        <CloudinaryContext cloudName={config.CLOUDINARY_NAME}>
          <AuthProvider>
            <MainRoutes />
          </AuthProvider>
        </CloudinaryContext>
      </ApolloProvider>
    );
  } else {
    return <></>;
  }
};

ReactDOM.render(<App />, document.getElementById('root'));
