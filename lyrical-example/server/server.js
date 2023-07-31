const express = require("express");
const models = require("./models");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require("./schema/schema");
require("dotenv").config();

const app = express();

// Replace with your Mongo Atlas URI
const MONGO_URI = `mongodb+srv://voidwebdizayn:${process.env.MONGODB_PASSWORD}@graphql.cdcxb81.mongodb.net/lyrical?retryWrites=true&w=majority`;
if (!MONGO_URI) {
    throw new Error("You must provide a Mongo Atlas URI");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once("open", () => console.log("Connected to Mongo Atlas instance."))
    .on("error", (error) =>
        console.log("Error connecting to Mongo Atlas:", error)
    );

app.use(bodyParser.json());
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
