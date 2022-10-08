import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';
import { initSupertokens } from './supertokens';
import { SuperTokensWrapper } from 'supertokens-auth-react';

export const env={
  apiUrl:"https://2d76-2003-da-7f3c-1000-a139-8548-c26f-1ab4.ngrok.io",
  websiteDomain: 'http://localhost',
}
const client = new ApolloClient({
  uri: `${env.apiUrl}/graphql`,
  cache: new InMemoryCache(),
});

initSupertokens();

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <SuperTokensWrapper>
        <App />
      </SuperTokensWrapper>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
