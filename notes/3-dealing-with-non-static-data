# Configration with Non-Hardcoded Data

Let's add dynamic data instead of hard-coded one. It's possible to deploy our own database or use 3rd party databases or APIs.

Let's start with `json server`.

Installation:

```bash
npm i json-server
```

Create a file called `db.json` 

```json
{
    "users":[
        {
            "id":"23",
            "firstName":"Bill",
            "age":20
        },
        {
            "id":"40",
            "firstName":"Angelica",
            "age":55
        },
        {
            "id":"41",
            "firstName":"Bill",
            "age":12
        },
        {
            "id":"42",
            "firstName":"Mike",
            "age":5
        },
        {
            "id":"43",
            "firstName":"Bob",
            "age":20
        }
    ]
}
```

add `"json:server": "json-server --watch db.json" ` to package.json's script field.

> Before moving on, lets install nodemon aswell `npm i nodemon --save-dev` and add following script `"graphql:server": "nodemon ./server.js` to package.json. It'll automatically restart our server when we make changes.

Next step is to run our fake json server by typing `npm run json:server`. Open browser and go to `localhost:3000/users`. You should see our user list.

Now, we can connect our fake server to GraphQL structure. To get data from our fake server, we need to make http calls. We can do it either by using `fetch` or package `axios`. I generally prefer axios. To install type following command to terminal `npm i axios`. And format your resolve function and delete your hard-coded data.

```js
//schema.js

const graphql = require("graphql");
const _ = require("lodash");
const axios = require("axios");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

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
            resolve: async (parentValue, args) => {
                const users = await axios.get(
                    `http://localhost:3000/users/${args.id}`
                );
                return users.data;
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
```