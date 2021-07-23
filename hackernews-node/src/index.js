const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const { getUserId } = require('./utils');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
const Vote = require('./resolvers/Vote');

const prisma = new PrismaClient();
// 2
const resolvers = {
	Query,
	Mutation,
	User,
	Link,
	Vote,
};

// 3
const server = new ApolloServer({
	typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
	resolvers,
	context: ({ req }) => {
		return {
			...req,
			prisma,
			userId: req && req.headers.authorization ? getUserId(req) : null,
		};
	},
});

server.listen().then(() => {
	console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `);
});
