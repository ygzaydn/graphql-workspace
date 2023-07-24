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

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
});
