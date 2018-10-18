import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel, StepContent, Button, Paper, Typography, FormGroup } from "@material-ui/core";
import Refresh from "@material-ui/icons/Refresh";
import Submit from "./Submit";
import Step1 from './Submit/GetUserData/Step1/'
import Step2 from './Submit/GetUserData/Step2/'
import Step3 from './Submit/GetUserData/Step3/'
import Step4 from './Submit/GetUserData/Step4/'

const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});

var getNameObj;
function getName(nickName, phone) {
  getNameObj = { nickName, phone };
}

var getUrlsArray;
function getUrls(array_urls) {
  getUrlsArray = array_urls;
}

var getBeveragesObj;
function getBeverages(array_time, array_beverages) {
  getBeveragesObj = {
    time: array_time,
    beverages: array_beverages
  }
}

var locationObj
function getLocation(coordinates) {
  locationObj = coordinates
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Step1 getNameAndPhone={getName} />;
    case 1:
      return <Step2 getImagesURL={getUrls} />;
    case 2:
      return <Step3 getTimeAndBeverages={getBeverages} />;
    case 3:
      return <Step4 getCurrentLocation={getLocation} />;
    default:
      return 'Unknown step';
  }
}

function getSteps() {
  return ['Enter your nick name & phone number', 'Upload 3 images (necessary)', 'Set Meeting Time & Select Beverages', 'Set your location'];
}

class VerticalLinearStepper extends React.Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  // handleBack = () => {
  //   this.setState(state => ({
  //     activeStep: state.activeStep - 1,
  //   }));
  // };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{getStepContent(index)}</Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      {/* <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button> */}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&quot;re finished</Typography>
            {/* RENDER Submit COMPONENT */}
            <FormGroup row={true}>
              <Button variant="contained" color="primary" onClick={this.handleReset}><Refresh /> Reset</Button>
              <Submit step1={getNameObj} step2={getUrlsArray} step3={getBeveragesObj} step4={locationObj} handleReset={this.handleReset} {...this.props} />
            </FormGroup>
          </Paper>
        )}
      </div>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(VerticalLinearStepper);
