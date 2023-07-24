# GraphQL Clients

So far we've worked on backend side of GraphQL. We've executed our queries by using GrahpiQL. In real world, we need to transport our query results to frontend side to make them usable for production environment. That is where we need to use GraphQL Clients.

The main architecture of how it works is shown below:

![7.1](./images/7.1.png)

There are several alternatives that we may use as a GraphQL client. Some of them:

![7.2](./images/7.2.png)

We'll move with Apollo Client. Apollo also has backend server for GraphQL. (remember we've used express-graphql)

![7.3](./images/7.3.png)

## Connecting Apollo Client

Our structure will look like

![7.5](./images/7.5.png)

In between our react application and GraphQL server, we have 2 big structure, Apollo Store and Apollo Provider.

Apollo Store is a store that exists on client side that manages the data coming from GraphQL Server. Apollo Store is an abstract structure that is agnostic to frontend framework.

Apollo Provider provides the data from the store and inject into react application. It works as a glue.

Setuping Apollo Store is short, we generally will work on Apollo Provider.

We will define a client and wrap our react app with provider.

```jsx
//client/index.js
import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
});

const Root = () => {
    return (
        <ApolloProvider client={client}>
          <div>Lyrical</div>
        </ApolloProvider>
    );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
```

From now on, any component wrapped in `ApolloProvider` can react GraphQL sources.

### Creating First Component and Fetch Data

Let's create a component `SongList` that fetches songs and lists inside itself. It's so easy to write query and execute in the component. All we need to use `useQuery` hook and `gql` funtion that Apollo Client serves us.

```jsx
import React from "react";
import { gql, useQuery } from "@apollo/client";

const GET_SONGS = gql`
    query GetSongs {
        songs {
            title
        }
    }
`;

const SongList = () => {
    const { loading, error, data } = useQuery(GET_SONGS);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return (
        <ul>
            {data.songs.map((el) => (
                <li key={el.title}>{el.title}</li>
            ))}
        </ul>
    );
};

export default SongList;
```

> In case of any error, you should check your console everytime. Error codes and their definitions are placed in `node_modules/@apollo/client/invariantErrorCodes.js`
>
> 