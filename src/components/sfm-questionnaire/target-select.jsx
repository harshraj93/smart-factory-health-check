import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import './target-select.scss';


export default class TargetSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      targetSelected: "",
      currentSelected: "",
      current:props.current,
      target:props.target
    }
  }

  createRadioButtons = (type) => {
    let parentDiv = [];
    for (let i = 1; i <= 7; i++) {
      let htmlDiv = <FormControlLabel
        value={type + i}
        control={<Radio color="default" />}
        label={i}
        labelPlacement="top"
        inputProps={{ 'aria-label': i }}
      />
      let rightLineDiv = i !== 7 ? <div className="right-line"></div> : ""
      parentDiv.push(htmlDiv);
      parentDiv.push(rightLineDiv);
    }
    return parentDiv;
  }

  render() {
    return (
      <>
        <FormControl component="currentfieldset">
          <FormLabel component="legend" color="">Current</FormLabel>
          <RadioGroup row aria-label="current"  name="current" value = {this.props.currentvalue} onChange={(e) => this.props.handleChangeCurrent(e)}>
            {this.createRadioButtons("current")}
          </RadioGroup>
        </FormControl>
        <FormControl component="targetfieldset">
          <FormLabel component="legend" style={{ marginTop: "45px" }}>Target</FormLabel>
          <RadioGroup row aria-label="Target" name="Target" value = {this.props.targetvalue} onChange={(e) => this.props.handleTargetChange(e)}>
          {this.createRadioButtons("target")}
          </RadioGroup>
        </FormControl>
      </>
    );
  }
}


