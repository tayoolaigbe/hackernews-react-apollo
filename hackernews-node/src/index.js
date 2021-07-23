const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');

let links = [
	{
		id: 'link-0',
		url: 'www.howtographql.com',
		description: 'Fullstack tutorial for GraphQL',
	},
	{
		id: 'link-1',
		url: 'www.laslas.com',
		description: 'Everybody go de aii las las',
	},
];

let idCount = links.length;
// 2
const resolvers = {
	Query: {
		info: () => `This is the API of a Hackernews Clone`,
		feed: () => links,
	},

	Mutation: {
		// 2
		post: (parent, args) => {
			const link = {
				id: `link-${idCount++}`,
				description: args.description,
				url: args.url,
			};
			links.push(link);
			return link;
		},
	},
};

// 3
const server = new ApolloServer({
	typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
	resolvers,
});

server.listen().then(() => {
	console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `);
});
