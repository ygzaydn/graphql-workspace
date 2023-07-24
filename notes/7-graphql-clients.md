# GraphQL Clients

So far we've worked on backend side of GraphQL. We've executed our queries by using GrahpiQL. In real world, we need to transport our query results to frontend side to make them usable for production environment. That is where we need to use GraphQL Clients.

The main architecture of how it works is shown below:

![7.1](./images/7.1.png)

There are several alternatives that we may use as a GraphQL client. Some of them:

![7.2](./images/7.2.png)

We'll move with Apollo Client. Apollo also has backend server for GraphQL. (remember we've used express-graphql)

![7.3](./images/7.3.png)