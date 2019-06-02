const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    _id: ID
    name: String
    email: String
    picture: String
  }

  type Pin {
    _id: ID
    createdAt: String
    title: String
    content: String
    image: String
    latitude: Float
    longitude: Float
    author: User
    comments: [Comment]
  }

  type Comment {
    text: String
    createdAt: String
    author: User
  }

  input CreatePinInput {
    title: String
    content: String
    image: String
    latitude: Float
    longitude: Float
  }

  type Query {
    me: User
    getPins: [Pin!]
  }

  type Mutation {
    createPin(input: CreatePinInput!): Pin
    deletePin(pinId: ID!): Pin
    createComment(pinId: ID!, text: String!): Pin
  }

  # наши подписки соотвествуют мутациям по порядку createPin -> pinAdded, deletePin -> pinDeleted, createComment -> pinUpdated
  type Subscription {
    pinAdded: Pin
    pinDeleted: Pin
    pinUpdated: Pin
  }
`;

/* graphql comments
https://stackoverflow.com/questions/39962867/how-do-i-add-a-description-to-a-field-in-graphql-schema-language
*/

/*
query {
  me {
    _id
    name
    email
    picture
  }
}
*/
