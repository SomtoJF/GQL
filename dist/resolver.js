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
    Mutation: {
        deleteGame: (_, args) => {
            const game = _db.games.find((item) => item.id === args.id);
            _db.games = _db.games.filter((game) => game.id !== args.id);
            return game;
        },
        addGame: (_, args) => {
            const game = { ...args.game, id: Date.now().toString() };
            _db.games = _db.games.concat(game);
            return game;
        },
        updateGame: (_, args) => {
            const originalGame = _db.games.find((game) => game.id === args.id);
            const updatedGame = { ...originalGame, ...args.edits };
            _db.games = _db.games.map((game) => {
                if (game.id === args.id) {
                    game = updatedGame;
                }
                return game;
            });
            return updatedGame;
        },
    },
};
export default resolvers;
