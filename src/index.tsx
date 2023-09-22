import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./Redux/Store/Store";
// import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from '@apollo/client/link/ws';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

export const serviceInstanceAuth = ({
  type,
  mutate,
  variables,
}: {
  type: string;
  mutate: any;
  variables?: any;
}) => {
  if (type === "subscribe") {
    console.log("object");
    const subscriptionOptions= {
      query: mutate, // Your subscription query
      variables: variables, // Your subscription variables
      // Other options like operationName, context, etc., if needed
    };
    return client
      .subscribe(subscriptionOptions)
      .subscribe({
        next: (response) => {
          // Handle the data emitted by the Observable
          console.log("Received data:", response);
        },
        error: (error) => {
          // Handle any errors
          console.error("Error:", error);
        },
        complete: () => {
          // Handle completion of the Observable (optional)
          console.log("Subscription complete");
        },
      });
  }

  if (type === "mutate") {
    return client.mutate({
      mutation: mutate,
      variables: variables,
    });
  } else {
    return client
      .query({
        query: mutate,
        variables: variables,
      })
      .then((response) => {
        return response;
      });
  }
};


const httpLink = new HttpLink({
  uri: 'http://192.168.1.69:3000/graphql'
});

  
const wsLink = new WebSocketLink({
  uri: "ws://192.168.1.69:3000/graphql",
  options: {
    reconnect: true
  }
});

 const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([splitLink]) ,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
