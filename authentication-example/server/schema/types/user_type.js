const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;

const UserType = GraphQLObjectType({
    name: "user",
    fields: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
});

module.exports = UserType;
