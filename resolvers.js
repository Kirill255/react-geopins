const user = {
  _id: "1",
  name: "Reed",
  email: "reed#gmail.com",
  picture: "https://cloudinary.com/someurl"
};

module.exports = {
  Query: {
    me: () => user
  }
};
