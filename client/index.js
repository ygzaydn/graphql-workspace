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
import SongDetail from "./components/songdetail";

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
    { path: "/song/:id", element: <SongDetail /> },
]);

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <RouterProvider router={router} />
        </ApolloProvider>
    );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
