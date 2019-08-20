export const typeDefs = `
  type Image {
    isLiked: Boolean
    url: String
  }

  type Mutation {
    toggleLikedPhoto(id: ID!): Boolean
  }

  type Query {
    likedPhotos: [Image]
  }
`;
