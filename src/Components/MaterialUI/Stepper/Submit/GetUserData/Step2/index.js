import React, { Component } from "react";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
import firebase from "../../../../../../Config/firebase";
import Toast from "../../../../../../Constants/Toast";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper } from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 0,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: 200,
    width: 200,
    margin: 0
  },
});

class Step2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      avatar: "",
      isUploading: false,
      progress: 0,
      avatarURL1: "",
      avatarURL2: "",
      avatarURL3: "",
    }
  }

  handleUploadStart = () => {
    this.setState({ isUploading: true, progress: 0 });
    Toast({
      type: 'info',
      title: 'Upload is start'
    })
  };

  handleProgress = progress => {
    this.setState({ progress });
    Toast({
      type: progress === 100 ? 'success' : 'info',
      title: progress === 100 ? 'Upload Complete' : `Uploaded: ${progress}%`
    })
  };

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
    Toast({
      type: 'error',
      title: `Error: ${error}`
    })
  };

  componentDidUpdate() {
    const { getImagesURL } = this.props;
    let { avatarURL1, avatarURL2, avatarURL3 } = this.state

    if (avatarURL1 && avatarURL2 && avatarURL3) {
      let imgUrls = [avatarURL1, avatarURL2, avatarURL3]
      getImagesURL(imgUrls)
    }
    // else {
    //   Toast({
    //     type: "error",
    //     title: "Please upload all (3) images"
    //   })
    // }
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={16} className={classes.root}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            {this.state.avatarURL1 && <img src={this.state.avatarURL1} width="200px" height="200px" />}
            <CustomUploadButton
              required={true}
              accept="image/*"
              storageRef={firebase.storage().ref('images')}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={(filename) => {
                this.setState({ avatar: filename, progress: 100, isUploading: false });
                firebase
                  .storage()
                  .ref("images")
                  .child(filename)
                  .getDownloadURL()
                  .then(url => this.setState({ avatarURL1: url }));
              }}
              onProgress={this.handleProgress}
              style={
                {
                  backgroundColor: 'steelblue', color: 'white', padding: "40px 10px", borderRadius: 4,
                  cursor: 'pointer', lineHeight: "120px"
                }}
            >
              Select your awesome avatar
            </CustomUploadButton>

          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            {this.state.avatarURL2 && <img src={this.state.avatarURL2} width="200px" height="200px" />}
            <CustomUploadButton
              required={true}
              accept="image/*"
              storageRef={firebase.storage().ref('images')}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={(filename) => {
                this.setState({ avatar: filename, progress: 100, isUploading: false });
                firebase
                  .storage()
                  .ref("images")
                  .child(filename)
                  .getDownloadURL()
                  .then(url => this.setState({ avatarURL2: url }));
              }}
              onProgress={this.handleProgress}
              style={
                {
                  backgroundColor: 'steelblue', color: 'white', padding: "40px 10px", borderRadius: 4,
                  cursor: 'pointer', lineHeight: "120px"
                }}
            >
              Select your awesome avatar
            </CustomUploadButton>

          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            {this.state.avatarURL3 && <img src={this.state.avatarURL3} width="200px" height="200px" />}
            <CustomUploadButton
              required={true}
              accept="image/*"
              storageRef={firebase.storage().ref('images')}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={(filename) => {
                this.setState({ avatar: filename, progress: 100, isUploading: false });
                firebase
                  .storage()
                  .ref("images")
                  .child(filename)
                  .getDownloadURL()
                  .then(url => this.setState({ avatarURL3: url }));
              }}
              onProgress={this.handleProgress}
              style={
                {
                  backgroundColor: 'steelblue', color: 'white', padding: "40px 10px", borderRadius: 4,
                  cursor: 'pointer', lineHeight: "120px"
                }}
            >
              Select your awesome avatar
            </CustomUploadButton>

          </Paper>
        </Grid>
      </Grid>
    )
  }
}

Step2.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Step2);