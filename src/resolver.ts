import _db from "./_db.js";

interface ResolverArgs {
	id: string;
}

interface AddGameInputResolverArgs {
	game: Game;
}

type Game = {
	title: string;
	platform: string[];
};

interface UpdateGameResolverArgs {
	id: string;
	edits: UpdateGameResolverArgs;
}

type UpdateGameType = {
	title?: string;
	platform?: string[];
};

// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
	Query: {
		games: () => _db.games,
		reviews: () => _db.reviews,
		authors: () => _db.authors,
		game: (_: any, args: ResolverArgs) =>
			_db.games.find((game) => args.id === game.id),
		review: (_: any, args: ResolverArgs) =>
			_db.reviews.find((review) => args.id === review.id),
		author: (_: any, args: ResolverArgs) =>
			_db.authors.find((author) => args.id === author.id),
	},
	Game: {
		reviews: (parent: any) =>
			_db.reviews.filter((review) => review.game_id === parent.id),
	},
	Author: {
		reviews: (parent: any) =>
			_db.reviews.filter((review) => review.author_id === parent.id),
	},
	Review: {
		author: (parent: any) =>
			_db.authors.find((author) => author.id === parent.author_id),
		game: (parent: any) => _db.games.find((game) => game.id === parent.game_id),
	},
	Mutation: {
		deleteGame: (_: any, args: ResolverArgs) => {
			const game = _db.games.find((item) => item.id === args.id);
			_db.games = _db.games.filter((game) => game.id !== args.id);
			return game;
		},
		addGame: (_: any, args: AddGameInputResolverArgs) => {
			const game = { ...args.game, id: Date.now().toString() };
			_db.games = _db.games.concat(game);
			return game;
		},
		updateGame: (_: any, args: UpdateGameResolverArgs) => {
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
