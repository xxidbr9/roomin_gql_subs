const { ApolloServer, PubSub } = require("apollo-server");

const typeDef = require("./typeDef");
const resolver = require("./resolver");

const pubsub = new PubSub();

const server = new ApolloServer({
    resolvers: resolver,
    typeDefs: typeDef,
    context: { pubsub }
});

server.listen().then(({ url, subscriptionsPath, subscriptionsUrl }) => {
    console.log(`app run in ${url}`);
    console.log(`sub run in ${subscriptionsUrl}`);
});
