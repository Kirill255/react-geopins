import React, { useState, useContext } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from "@material-ui/icons/AddAPhotoTwoTone";
import LandscapeIcon from "@material-ui/icons/LandscapeOutlined";
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/SaveTwoTone";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { CREATE_PIN_MUTATION } from "../../graphql/mutations";
import { useClient } from "../../hooks/useClient";
import Context from "../../context";

const CreatePin = ({ classes }) => {
  const client = useClient();
  const { state, dispatch } = useContext(Context);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const mobileSize = useMediaQuery("(max-width: 650px)"); // если меньше 650px то вернётся true

  const handleDeleteDraft = () => {
    setTitle("");
    setImage("");
    setContent("");
    dispatch({ type: "DELETE_DRAFT" });
  };

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "iiau0zhe"); // Upload presets name https://cloudinary.com/console/settings/upload
    data.append("cloud_name", "dyvai5rk9"); // Cloud name https://cloudinary.com/console
    const res = await axios.post("https://api.cloudinary.com/v1_1/dyvai5rk9/image/upload", data);
    return res.data.url;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const url = await handleImageUpload();
      const { latitude, longitude } = state.draft;
      const variables = { title, image: url, content, latitude, longitude };
      await client.request(CREATE_PIN_MUTATION, variables);

      // const { createPin } = await client.request(CREATE_PIN_MUTATION, variables);

      // теперь вызываем dispatch в соответствующих подписках
      // console.log("Pin created: ", { createPin });
      // dispatch({ type: "CREATE_PIN", payload: createPin });

      setSubmitting(false);
      handleDeleteDraft();
    } catch (error) {
      setSubmitting(false);
      console.log("Error creating pin: ", error);
    }
  };

  return (
    <form className={classes.form}>
      <Typography className={classes.alignCenter} component="h2" variant="h4" color="secondary">
        <LandscapeIcon className={classes.iconLarge} /> Pin Location
      </Typography>
      <div>
        <TextField
          name="title"
          label="Title"
          placeholder="Insert pin title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          accept="image/*"
          id="image"
          type="file"
          className={classes.input}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="image">
          <Button
            style={{ color: image && "green" }}
            component="span"
            size="small"
            className={classes.button}
          >
            <AddAPhotoIcon />
          </Button>
        </label>
      </div>

      <div className={classes.contentField}>
        <TextField
          name="content"
          laben="Content"
          multiline
          rows={mobileSize ? "3" : "6"}
          margin="normal"
          fullWidth
          variant="outlined"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleDeleteDraft}
        >
          <ClearIcon className={classes.leftIcon} />
          Discard
        </Button>
        <Button
          type="submit"
          className={classes.button}
          variant="contained"
          color="secondary"
          disabled={!title.trim() || !content.trim() || !image || submitting}
          onClick={handleSubmit}
        >
          Submit
          <SaveIcon className={classes.rightIcon} />
        </Button>
      </div>
    </form>
  );
};

const styles = (theme) => ({
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: theme.spacing()
  },
  contentField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: "95%"
  },
  input: {
    display: "none"
  },
  alignCenter: {
    display: "flex",
    alignItems: "center"
  },
  iconLarge: {
    fontSize: 40,
    marginRight: theme.spacing()
  },
  leftIcon: {
    fontSize: 20,
    marginRight: theme.spacing()
  },
  rightIcon: {
    fontSize: 20,
    marginLeft: theme.spacing()
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(),
    marginLeft: 0
  }
});

export default withStyles(styles)(CreatePin);

/*
https://cloudinary.com/documentation/upload_images#uploading_with_a_direct_call_to_the_api
*/
