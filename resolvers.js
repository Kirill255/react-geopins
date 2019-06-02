const { AuthenticationError } = require("apollo-server");

const Pin = require("./models/Pin");

/* const user = {
  _id: "1",
  name: "Reed",
  email: "reed#gmail.com",
  picture: "https://cloudinary.com/someurl"
}; */

// authenticated мидлвара
const authenticated = (next) => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError("You must be logged in");
  }
  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    me: authenticated((root, args, ctx) => ctx.currentUser),
    getPins: async (root, args, ctx) => {
      const pins = await Pin.find({})
        .populate("author")
        .populate("comments.author");

      return pins;
    }
  },
  Mutation: {
    createPin: authenticated(async (root, args, ctx) => {
      // await new Pin(args.input); // но нам нужно добавить автора, поэтому мы завернули всё в authenticated, чтобы получить юзера в context
      const newPin = await new Pin({
        ...args.input,
        author: ctx.currentUser._id
      }).save();

      const pinAdded = await Pin.populate(newPin, "author");
      return pinAdded;
    })
  }
};
