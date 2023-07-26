import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import SongList from "./components/songlist";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
});

const router = createBrowserRouter([
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
