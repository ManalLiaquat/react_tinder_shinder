import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardActions, IconButton, Typography, Grid } from '@material-ui/core/';
import { green } from "@material-ui/core/colors";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import StarRatingComponent from 'react-star-rating-component';

const styles = theme => ({
  card: {
    maxWidth: 300,
    margin: "0px auto",
    minHeight: 420
  },
  displayName: {
    textAlign: 'center'
  },
  actions: {
    margin: "0px",
    padding: "0px"
  },
  green: {
    color: green[500],
    '&:hover': {
      backgroundColor: green[50],
    },
  }
});

class MUICard extends React.Component {

  render() {
    const { classes, item, onSwipeRight, removeCard, index } = this.props;
    
    return (
      <div style={{ margin: "0px auto" }}>
        <Card className={classes.card}>
          <Carousel showArrows={true}
            showStatus={true}
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
          <CardActions className={classes.actions} disableActionSpacing>
            <Grid container
              direction="row"
              justify="center"
              alignItems="center">

              <Grid item xs={2}>
                <IconButton color="secondary" aria-label="Remove Card" onClick={() => { removeCard(index) }}>
                  <CloseIcon />
                </IconButton>
              </Grid>
              <Grid item xs={8}>
                <CardContent>
                  <Grid direction="row" justify="center" alignItems="center">
                  <center>{
                      item.ratings && <StarRatingComponent name="rate user" editing={false} value={item.ratings.map(v=>{
                        for(var key in v){ 
                          return v[key] 
                         }
                        }).reduce((a,b)=> {return a+b}, 0)/item.ratings.length} /> 
                    }</center>
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
                <IconButton className={classes.green} aria-label="Meet Person" onClick={() => { onSwipeRight(item) }}>
                  <CheckIcon />
                </IconButton>
              </Grid>

            </Grid>


          </CardActions>
        </Card>
      </div >
    );
  }
}

MUICard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MUICard);
