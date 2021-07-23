const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();
// 2
const resolvers = {
	Query: {
		info: () => `This is the API of a Hackernews Clone`,
		feed: async (parent, args, context) => {
			return context.prisma.link.findMany();
		},
	},

	Mutation: {
		// 2
		post: async (parent, args, context) => {
			const newLink = await context.prisma.link.create({
				data: {
					url: args.url,
					description: args.description,
				},
			});
			return newLink;
		},
	},
};

// 3
const server = new ApolloServer({
	typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
	resolvers,
	context: {
		prisma,
	},
});

server.listen().then(() => {
	console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `);
});
