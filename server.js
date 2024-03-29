require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const { findOrCreateUser } = require("./controllers/userController");

// https://mongoosejs.com/docs/deprecations.html#-findandmodify-
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log("DB connected!"))
  .catch(console.log);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // 2. Перехватываем запрос, получаем токен с клиента, проверяем в базе, возвращаем найденого юзера или создаём нового
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;

    try {
      authToken = req && req.headers.authorization;
      if (authToken) {
        currentUser = await findOrCreateUser(authToken);
      }
    } catch (error) {
      console.log(`Unable to authenticate user with token ${authToken}`);
    }

    return { currentUser };
  }
  // при деплое на сервер, по умолчанию playground будет выключена и в целях безопасности лучше её не включать, но если сильно нужно то
  // https://www.apollographql.com/docs/apollo-server/features/graphql-playground/#enabling-graphql-playground-in-production
  // introspection: true,
  // playground: true
});

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => console.log(`Server starting listening on ${url}`));
