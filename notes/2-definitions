# Definitions 

## Schema Definition

```js
// schema/schema.js

const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: {
            type: GraphQLString,
        },
        firstName: {
            type: GraphQLString,
        },
        age: { type: GraphQLInt },
    },
});

```

## Root Query Definition

To use GraphQL in our application, we have to define Root Query. Root Query is the entry point of GraphQL API.

```js
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                // the way we gather data from DB
                // the most important field of RootQuery
            },
        },
    },
});
```

At first step, let's use static data, and fill resolve function. Don't forget to create Schema and export it.

```js
// schema.js

const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const users = [
    {
        id: "23",
        firstName: "Bill",
        age: 20,
    },
    {
        id: "47",
        firstName: "Samantha",
        age: 21,
    },
];

const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: {
            type: GraphQLString,
        },
        firstName: {
            type: GraphQLString,
        },
        age: { type: GraphQLInt },
    },
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                const { id } = args;
                return _.find(users, { id });
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});

```


```js
// server.js

const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const schema = require("./schema/schema");

const app = express();
app.use(
    "/graphql",
    expressGraphQL({
        schema,
        graphiql: true,
    })
);

app.listen("4000", () => {
    console.log("Listening port 4000");
});

```

We're ready to try our query now. Now enter `localhost:4000/graphql` and you'll see graphiql UI that you can enter your queries.