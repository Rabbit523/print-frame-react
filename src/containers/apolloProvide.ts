import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { PersistentStorage, PersistedData } from 'apollo-cache-persist/types';
import resolvers from './resolvers';
import typeDefs from './schemas';
import config from '../env';
import { getAuthToken } from './firebase/auth';

const cache = new InMemoryCache();
// await before instantiating ApolloClient, else queries might run before the cache is persisted
export async function makeItPersist(): Promise<void> {
  try {
    await persistCache({
      cache,
      storage: window.localStorage as PersistentStorage<PersistedData<NormalizedCacheObject>>,
    });
  } catch (e) {
    console.error(e);
  }
}
const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await getAuthToken();

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const link = createUploadLink({
  uri: process.env.NODE_ENV === 'production' ? config.PROD_SERVER + 'graphql' : config.DEV_SERVER + 'graphql',
});

const client = new ApolloClient({
  // Provide required constructor fields
  cache,
  link: authLink.concat(link),
  resolvers,
  typeDefs,
  // Provide some optional constructor fields
  name: 'react-web-client',
  version: '1.3',
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
    cartItems: [],
    shippingAddress: {},
    billingAddress: {},
    Images: [],
    discountCode: {},
    user: {},
  },
});

export default client;
