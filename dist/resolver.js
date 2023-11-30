import _db from "./_db.js";
// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
    Query: {
        games: () => _db.games,
        reviews: () => _db.reviews,
        authors: () => _db.authors,
        game: (_, args) => _db.games.find((game) => args.id === game.id),
        review: (_, args) => _db.reviews.find((review) => args.id === review.id),
        author: (_, args) => _db.authors.find((author) => args.id === author.id),
    },
    Game: {
        reviews: (parent) => _db.reviews.filter((review) => review.game_id === parent.id),
    },
    Author: {
        reviews: (parent) => _db.reviews.filter((review) => review.author_id === parent.id),
    },
    Review: {
        author: (parent) => _db.authors.find((author) => author.id === parent.author_id),
        game: (parent) => _db.games.find((game) => game.id === parent.game_id),
    },
};
export default resolvers;
