export const CREATE_PIN_MUTATION = `
mutation($title: String!, $content: String!, $image: String!, $latitude: Float!, $longitude: Float!) {
  createPin(input: {
    title: $title,
    content: $content,
    image: $image,
    latitude: $latitude,
    longitude: $longitude,
  }) {
    _id
    createdAt
    title
    content
    image
    latitude
    longitude
    author {
      _id
      name
      email
      picture
    }
  }
}
`;
