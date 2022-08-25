import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  useQuery,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { LOAD_PRODUCTS } from './GraphQL/Queries';
import { useLocalStorage } from './utilites/useLocalStorage';
import { useEffect } from 'react';
import ListPage from './Components/Main/ListPage';
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: 'http://localhost:4000/graphql' }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ListPage />
      <h1>ads</h1>
    </ApolloProvider>
  );
}

export default App;
