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

Before moving on, lets add routes to our project, we will need them on next parts. Import necessary functions from `react-router` and edit `index.js` as follows:

```js
import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import SongList from "./components/songlist";
import {
    createBrowseouter,
    createHashRouter,
    RouterProvider,
} from "react-router-dom";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
});

const router = createHashRouter([
    {
        path: "/",
        element: <SongList />,
    },
]);

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <RouterProvider router={router} />
        </ApolloProvider>
    );
};

ReactDOM.render(<Root />, document.querySelector("#root"));

```


## Caching on Apollo

Whenever Apollo Client fetches query results from server, it automatically *caches* those results locally. This makes later executions of that same query extremely fast. Codes on this section are for references, they are not used in our system.

### Polling

Polling provides near-real-time synchronization with your server by executing your query periodically at a specified interval. To enable polling for a query, pass a pollInterval configuration option to the useQuery hook with an interval in milliseconds. As an example:

```jsx
const { loading, error, data } = useQuery   (GET_DOG_PHOTO, {
  variables: { breed },
  pollInterval: 500,
});

```

By setting pollInterval to `500`, we fetch the current breed's image from the server every 0.5 seconds. Note that if you set pollInterval to `0`, the query does not poll.

### Refetching

In order to force refetching, we can use `refetch` method that useQuery serves us.

```jsx
const { loading, error, data, refetch } = useQuery(GET_DOG_PHOTO, {
    variables: { breed },
});
/*--*/
<button onClick={() => refetch({ breed: 'new_dog_breed' })}>
    Refetch new breed!
</button>
```

## Mutation

Operating mutations is similar to queries. We use `useMutation` hook this time. Let's create a new component `SongCreate` to create new songs. In our component, if our gql component is `ADD_SONG` and function to add song is `addSong`, then the hook call should look like:

```jsx
const [addSong, { data, loading, error }] = useMutation(ADD_SONG);
```

### Passing Variables to GQL

Before moving on our component, it is important to know how to pass variable to our gql query.

We need to define our variable and its type on query definition, then we can call it inside our query. Variables are called with prefix `$`. And we add `!` at the end of type declaration if the variable is must.

To add new song, we'll use `addSong` endpoint, so it will look like:

```gql
mutation AddSong($title:String!){
    addSong(title:$title){
        title
    }
}
```
So our `SongCreate` component should look like:

```jsx
import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_SONG = gql`
    mutation AddSong($title: String!) {
        addSong(title: $title) {
            title
        }
    }
`;

const SongCreate = () => {
    const [name, setName] = useState("");
    const [addSong, { data, loading, error }] = useMutation(ADD_SONG);

    if (loading) return "Submitting...";
    if (error) return `Submission error! ${error.message}`;

    return (
        <div>
            <h3>Create a new song</h3>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    addSong({
                        variables: {
                            title: name,
                        },
                    });
                }}
            >
                <label htmlFor="title">Song Title:</label>
                <input
                    id="title"
                    placeholder="Enter Song Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Create a new song</button>
            </form>
        </div>
    );
};

export default SongCreate;
```

And, add `SongCreate` component to */create* endpoint.

```js
import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import SongList from "./components/songlist";
import SongCreate from "./components/songcreate";
import {
    createBrowseouter,
    createHashRouter,
    RouterProvider,
} from "react-router-dom";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
});

const router = createHashRouter([
    {
        path: "/",
        element: <SongList />,
    },
    {
        path: "/create",
        element: <SongCreate />,
    },
]);

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <RouterProvider router={router} />
        </ApolloProvider>
    );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
```

> Notice that we've used `HashRouter`. So, in order to react `SongCreate` component, we should navigate to *http://localhost:4000/#/create*.

