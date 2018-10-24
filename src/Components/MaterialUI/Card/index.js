import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const styles = theme => ({
  card: {
    maxWidth: 300,
    margin: "0px auto",
    // maxHeight: 400
  },
  displayName: {
    textAlign: 'center'
  },
  actions: {
    margin: "0px",
    padding: "0px"
  }
});

class MUICard extends React.Component {

  render() {
    const { classes, item, onSwipeRight } = this.props;

    return (
      <div style={{ margin: "0px auto" }}>
        <Card className={classes.card}>
          <Carousel showArrows={true}
            showStatus={false}
            showThumbs={false}
            infiniteLoop={true}
            swipeable={true}
            emulateTouch={true}
            autoPlay={true}>
            {
              item.images.map(path => (
                <div>
                  <img src={path} height="300px" alt="userImg" />
                </div>
              ))
            }
          </Carousel>
          <Grid container
            direction="row"
            justify="center"
            alignItems="center">

            <Grid item xs={2}>
              <IconButton aria-label="Add to favorites">
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item xs={8}>
              <CardContent>
                <Grid direction="row" justify="center" alignItems="center">
                  <Typography variant="caption" className={classes.displayName}>
                    <b>{this.props.children}</b>
                  </Typography>
                </Grid>
                <Grid direction="row" justify="center" alignItems="center">
                  <Typography variant="caption" className={classes.displayName}>{item.nickName}</Typography>
                </Grid>
              </CardContent>
            </Grid>
            <Grid item xs={2}>
              <IconButton aria-label="Share" onClick={() => { onSwipeRight(item) }}>
                <CheckIcon />
              </IconButton>
            </Grid>

          </Grid>
          <CardActions className={classes.actions} disableActionSpacing>


          </CardActions>
        </Card>
      </div>
    );
  }
}

MUICard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MUICard);
