# Mutations on GraphQL

It is time to work on editing records instead of fetching them. It is called `mutations` on GraphQL environment. On REST APIs, we use `PUT, PATCH, DELETE, UPDATE` methods to edit our records. In GraphQL, approach is similar a bit.

> Before moving on, it is important to say that our json server has conventional backends. For example, to add a new record on companies, we can make a put request to `/companies` endpoint, or for example to delete a user, we can make a delete request to `/user/:id`.

Right now, our GraphQL schema contains only one query (which is `RootQuery`), which gives us access to data. To operate mutations, we will define mutation field on our schema, which will look similar to `RootQuery`.

Let's define a new GraphQL object called `mutation`. First operation that we will define is to add new user to our database.

```js
const mutation = new GraphQLObject({
    name:'Mutation',
    fields:{
        addUser:{
            type:{},
            args:{}
            resolve:async(parentNode, args) => {}
        }
    }
})
```

On `type` field, we should consider the result of the operation. What will return when we add new user? The answer is the user itself. So it should have type of `UserType`.

```js
const mutation = new GraphQLObject({
    name: 'Mutation',
    fields:{
        addUser: {
            type: UserType,
            args: {},
            resolve:async(parentNode, args) => {}
        }
    }
})
```

On `args` field, we need to add the inputs that we'll use on our `addUser` operation. We basically need `firstName`, `age` and `companyId` to add new user. Some of those parameters should be present (not be null). To prevent null inputs, we use `GraphQLNonNull` object from graphql library. Let's make `firstName` and `age` mandatory, and `companyId` optional.

```js
const mutation = new GrahpQLObject({
    name: 'Mutation',
    fields: {
        type: UserType,
        args: {
            firstName: {type: new GrahpQLNonNull(GraphQLString)},
            age: { type: new GraphQLNonNull(GraphQLInt) },
            companyId: { type: GraphQLString },
        },
        resolve: async (parentNode, args) => {}
    }
})
```

As a last step, we need to fulfill our `resolve` field.

```js
const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                companyId: { type: GraphQLString },
            },
            resolve: async (parentNode, args) => {
                const res = await axios.post("http://localhost:3000/users", {
                    ...args,
                });
                return res.data;
            },
        },
    },
});
```

So our mutation object is ready. Lets export it. Full schema.js should look like:

```js

const graphql = require("graphql");
const _ = require("lodash");
const axios = require("axios");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLSchema,
    GraphQLNonNull,
} = graphql;

const CompanyType = new GraphQLObjectType({
    name: "Company",
    fields: () => ({
        id: {
            type: GraphQLString,
        },
        name: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        users: {
            type: GraphQLList(UserType),
            resolve: async (parentValue, args) => {
                const users = await axios.get(
                    `http://localhost:3000/companies/${parentValue.id}/users`
                );

                return users.data;
            },
        },
    }),
});

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {
            type: GraphQLString,
        },
        firstName: {
            type: GraphQLString,
        },
        age: { type: GraphQLInt },
        company: {
            type: CompanyType,
            resolve: async (parentValue, args) => {
                const company = await axios.get(
                    `http://localhost:3000/companies/${parentValue.companyId}`
                );
                return company.data;
            },
        },
    }),
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
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve: async (parentValue, args) => {
                const company = await axios.get(
                    `http://localhost:3000/companies/${args.id}`
                );
                return company.data;
            },
        },
    },
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                companyId: { type: GraphQLString },
            },
            resolve: async (parentNode, args) => {
                const res = await axios.post("http://localhost:3000/users", {
                    ...args,
                });
                return res.data;
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
});

```

Now, we're ready to operate `addUser`. Go into browser and open `localhost:4000/graphql`. Our query should look like:

```gql
mutation {
  addUser(firstName: "Stephen", age: 23, companyId: "1") {
    id
  }
}
```

> mutation word is compulsory here.

And the result

```json
{
  "data": {
    "addUser": {
      "id": "1_Sokby"
    }
  }
}
```

## Adding More Operations

Lets add `deleteUser` operation aswell. It'll be similar to `addUser`.

```js
const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                companyId: { type: GraphQLString },
            },
            resolve: async (parentNode, args) => {
                const res = await axios.post("http://localhost:3000/users", {
                    ...args,
                });
                return res.data;
            },
        },
        deleteUser: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve: async (parentNode, args) => {
                const result = await axios.delete(
                    `http://localhost:3000/users/${args.id}`
                );
                return result.data;
            },
        },
    },
});
```

Similarly, `editUser`

```js
const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                companyId: { type: GraphQLString },
            },
            resolve: async (parentNode, args) => {
                const res = await axios.post("http://localhost:3000/users", {
                    ...args,
                });
                return res.data;
            },
        },
        deleteUser: {
            type: UserType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve: async (parentNode, args) => {
                const result = await axios.delete(
                    `http://localhost:3000/users/${args.id}`
                );
                return result.data;
            },
        },
        editUser: {
            type: UserType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString),
                },
                firstName: { type: GraphQLString },
                age: { type: GraphQLInt },
                companyId: { type: GraphQLString },
            },
            resolve: async (parentNode, args) => {
                const { id, ...rest } = args;
                const result = await axios.patch(
                    `http://localhost:3000/users/${id}`,
                    { ...rest }
                );
                return result.data;
            },
        },
    },
});
```
