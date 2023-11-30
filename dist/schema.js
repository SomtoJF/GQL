const typeDefs = `#graphql 
type Game{
    id: ID!
    title: String!
    platforms: [String!]!
}

type Review{
    id: ID!
    author: String!
    content: String!
}

type Author{
    id: ID!
    name: String!
    verified: Boolean!
}

type Query{
    games: [Game]
    reviews: [Review]
    authors: [Author]
    game(id: ID!): Game 
    review(id: ID!): Review
    author(id: ID!): Author
}`;
export default typeDefs;
