import _db from "./_db";

// Resolvers define how to fetch the types defined in your schema.
const resolver = {
	Query: {
		games: () => _db.games,
		reviews: () => _db.reviews,
		authors: () => _db.authors,
	},
};
export default resolver;
