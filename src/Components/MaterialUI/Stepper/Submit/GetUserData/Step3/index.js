import React, { Component } from "react";
import { Typography, FormControlLabel, Checkbox, FormControl, InputLabel, Select, Input, Chip, MenuItem } from "@material-ui/core";
import img1 from "../../../../../../Images/img1.jpg";
import img2 from "../../../../../../Images/img2.jpg";
import img3 from "../../../../../../Images/img3.jpg";
import Toast from "../../../../../../Constants/Toast";

const customStyle = {
  drinksImages: {
    height: "200px",
    width: "200px",
    borderRadius: 5,
    display: 'inline-block',
    margin: '5px 10px',
    textAlign: "center"
  },
  chipDiv: {
    maxWidth: "200px"
  },
  formControl: {
    margin: "10px",
    minWidth: 120,
    maxWidth: "300",
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: '5px',
  },
}

class Step3 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkedA: false,
      checkedB: false,
      checkedC: false,
      time: []
    }
    this.sendData = this.sendData.bind(this)
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleTime = event => {
    this.setState({ time: event.target.value });
  };

  sendData(){
    const { getTimeAndBeverages, handleChangeState } = this.props
    const { checkedA, checkedB, checkedC, time } = this.state
    if ((checkedA || checkedB || checkedC) && time.length) {
      let beverages = [];//"Coffee", "Juice", "Cocktail"
      
      checkedA && beverages.push('Coffee');
      checkedB && beverages.push('Juice');
      checkedC && beverages.push('Cocktail');

      getTimeAndBeverages(time, beverages)
      handleChangeState(3)
    } else {
      handleChangeState(2)
    }
    if (!(checkedA || checkedB || checkedC)) {
      Toast({
        type: "warning",
        title: "Please select beverages"
      })
    }
    if (!time.length) {
      Toast({
        type: "warning",
        title: "Please select time"
      })
    }
  }

  componentDidUpdate() {
    this.sendData()
  }
  componentDidMount() {
    this.sendData()
  }

  render() {
    const timings = ['20 min', ' 60 min', '120 min'];
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
    return (
      <div>
        <div className={customStyle.chipDiv}>
          <Typography variant="headline">Select Time</Typography>
          <FormControl className={customStyle.formControl} fullWidth={true}>
            <InputLabel className={customStyle.inputLabel} htmlFor="select-multiple-chip">Time</InputLabel>
            <Select
              multiple
              value={this.state.time}
              onChange={this.handleTime}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className={customStyle.chips}>
                  {selected.map(value => (
                    <Chip key={value} label={value} className={customStyle.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {timings.map(time => (
                <MenuItem
                  key={time}
                  value={time}
                >
                  {time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <br />
        <div>
          <Typography variant="headline">Select Drinks</Typography>
          <div style={customStyle.drinksImages}>
            <FormControlLabel
              control={
                <div>
                  <img width="100%" height="100%" src={img1} alt="" />
                  <Checkbox
                    checked={this.state.checkedA}
                    onChange={this.handleChange('checkedA')}
                    value="checkedA"
                  />
                </div>
              }
            // label="Coffee"
            />
            Coffee
          </div>
          <div style={customStyle.drinksImages}>
            <FormControlLabel
              control={
                <div>
                  <img width="200px" height="200px" src={img2} alt="" />
                  <Checkbox
                    checked={this.state.checkedB}
                    onChange={this.handleChange('checkedB')}
                    value="checkedB"
                  />
                </div>
              }
            // label="Juice"
            />
            Juice
          </div>
          <div style={customStyle.drinksImages}>
            <FormControlLabel
              control={
                <div>
                  <img width="200px" height="200px" src={img3} alt="" />
                  <Checkbox
                    checked={this.state.checkedC}
                    onChange={this.handleChange('checkedC')}
                    value="checkedC"
                  />
                </div>
              }
            // label="Juice"
            />
            Cocktail
          </div>
        </div>
      </div>
    )
  }

}

export default Step3;