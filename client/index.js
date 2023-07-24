import React from "react";
import ReactDOM from "react-dom";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";
import SongList from "./components/songlist";

const client = new ApolloClient({});

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <SongList />
        </ApolloProvider>
    );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
