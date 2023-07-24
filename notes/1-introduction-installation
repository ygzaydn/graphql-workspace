# Introduction & Installation

Shortcomings of RESTful routings:

-	When we need specific data, the nested structure of RESTful APIs getting more and more complex. 
-	On highly related data, using of RESTful APIs may harm our software, since we have to make lots of calls.
-	We fetch all the data from the backend although we do not need them. RESTful APIs may serve dramatically heavy data.


GraphQL does not change the way that we store data. It only deals with the data send to the client.

An example query:

```gql
query {
	users(id: "23"){
		friends{
			id
			name
			company{
				name
			}
			position{
				name
			}
		}
	}
}
```

Packages that we need to install:

`npm i express express-graphql graphql lodash --save`

## Basic configuration

```js
const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;

const app = express();
app.use(
    "/graphql",
    expressGraphQL({
        graphiql: true,
    })
);

app.listen("4000", () => {
    console.log("Listening port 4000");
});
```

> GraphiQL is the reference implementation of this monorepo, GraphQL IDE, an official project under the GraphQL Foundation. Graphiql is a development tool to train developers to use GraphQL.

We must define & use a schema to use GraphQL. Lets start with basic schema definition.