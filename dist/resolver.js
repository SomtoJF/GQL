import _db from "./_db.js";
// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
    Query: {
        games: () => _db.games,
        reviews: () => _db.reviews,
        authors: () => _db.authors,
    },
};
export default resolvers;
