const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID);

exports.findOrCreateUser = async (token) => {
  const googleUser = await verifyAuthToken(token);
  const user = await checkIfUserExists(googleUser.email);

  return user ? user : createNewUser(googleUser);
};

const verifyAuthToken = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_CLIENT_ID
    });

    return ticket.getPayload();
  } catch (error) {
    console.log("Error verifying auth token: ", error);
  }
};

const checkIfUserExists = async (email) => await User.findOne({ email }).exec();

const createNewUser = (googleUser) => {
  const { name, email, picture } = googleUser;
  const user = { name, email, picture };

  return new User(user).save();
};
