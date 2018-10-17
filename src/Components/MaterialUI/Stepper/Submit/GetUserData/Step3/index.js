import React, { Component } from "react";
import { Typography, FormControlLabel, Checkbox, FormControl, InputLabel, Select, Input, Chip, MenuItem } from "@material-ui/core";

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
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: '5px',
  },
  inputLabel: {
  }
}

class Step1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkedA: false,
      checkedB: false,
      checkedC: false,
      time: []
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleTime = event => {
    this.setState({ time: event.target.value });
  };

  componentDidUpdate() {
    const { getTimeAndBeverages } = this.props
    const { checkedA, checkedB, checkedC, time } = this.state
    if (((checkedA || checkedB || checkedC) && time) || (checkedA && checkedB && checkedC && time)) {
      let beverages = [];//"Coffee", "Juice", "Cocktail"

      checkedA && beverages.push('Coffee');
      checkedB && beverages.push('Juice');
      checkedC && beverages.push('Cocktail');

      getTimeAndBeverages(time, beverages)
    }
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
          <FormControl className={customStyle.formControl} fullWidth={false}>
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
                  <img width="100%" height="100%" src="https://cafedeoro-rw.com/wp-content/uploads/2017/10/mocha.jpg" alt="" />
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
                  <img width="200px" height="200px" src="http://file.hstatic.net/1000258047/article/669973646-612x612_1024x1024.jpg" alt="" />
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
                  <img width="200px" height="200px" src="https://images.lecker.de/melon-crush-F3870901,id=1a21e330,b=lecker,w=590,h=442,cg=c.jpg" alt="" />
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

export default Step1;