import React from "react";
import { GoogleLogin } from "react-google-login";
import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";

const Login = ({ classes }) => {
  const onSuccess = (googleUser) => {
    console.log("googleUser :", googleUser);
    const idToken = googleUser.getAuthResponse().id_token;
    console.log({ idToken });
  };

  return (
    <GoogleLogin
      clientId="207652413635-rbddvc382u0aq1pt9hhddr6m55snb7b0.apps.googleusercontent.com"
      onSuccess={onSuccess}
      isSignedIn={true}
    />
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
