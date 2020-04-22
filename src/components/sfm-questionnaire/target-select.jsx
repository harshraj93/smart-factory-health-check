import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import './target-select.scss';

let ratings = [1,2,3,4,5,6,7]
export default function TargetSelect(props) {

    const [selectedValue1, setSelectedValue1] = React.useState("a");
    const [selectedValue, setSelectedValue] = React.useState("a");
    const handleChangeCurrent = (event) => {
        let value = event.target.value;
        value = value[value.length-1];
        setSelectedValue1(event.target.value);
        selectedValue1?props.setCurrentValue(value):props.setCurrentValue("")
      };
      const handleChangeTarget = (event) => {
        let value = event.target.value;
        value = value[value.length-1];
        setSelectedValue(event.target.value);
        selectedValue?props.setTargetValue(value):props.setTargetValue("")
      };

    
    return (
      <>

      <FormControl component="currentfieldset">
        <FormLabel component="legend" color="">Current</FormLabel>
        <RadioGroup row aria-label="current" name="current"  onChange={handleChangeCurrent}>
            <FormControlLabel
            checked={selectedValue1 === "current1"}
            value="current1"
            control={<Radio color="default" />}
            label="1"
            labelPlacement="top"
            inputProps={{ 'aria-label': "1"  }}
          />
          <div className="right-line"></div>
          <FormControlLabel
          checked={selectedValue1 === "current2"}
            value="current2"
            control={<Radio color="default" />}
            label="2"
            labelPlacement="top"
            inputProps={{ 'aria-label': "1"  }}
          />
          <div className="right-line"></div>
          <FormControlLabel
          checked={selectedValue1 === "current3"}
            value="current3"
            control={<Radio color="default" />}
            label="3"
            labelPlacement="top"
            inputProps={{ 'aria-label': "1" }}
          />
          <div className="right-line"></div>
          <FormControlLabel
          checked={selectedValue1 === "current4"}
            value="current4"
            control={<Radio color="default" />}
            label="4"
            labelPlacement="top"
            inputProps={{ 'aria-label': "1"}}
          />
          <div className="right-line"></div>
          <FormControlLabel
          checked={selectedValue1 === "current5"}
            value="current5"
            control={<Radio color="default" />}
            label="5"
            labelPlacement="top"
            inputProps={{ 'aria-label': "1"}}
          />
          <FormControlLabel
          checked={selectedValue1 === "current6"}
            value="current6"
            control={<Radio color="default" />}
            label="6"
            labelPlacement="top"
            inputProps={{ 'aria-label': "1"}}
          />
          <FormControlLabel
          checked={selectedValue1 === "current7"}
            value="current7"
            control={<Radio color="default" />}
            label="7"
            labelPlacement="top"
            inputProps={{ 'aria-label': "1"}}
          />
        </RadioGroup>
        </FormControl>
        <FormControl component="targetfieldset">
        <FormLabel component="legend" style={{marginTop:"45px"}}>Target</FormLabel>
        <RadioGroup row aria-label="Target" name="Target" onChange={handleChangeTarget}>
          <FormControlLabel
            checked={selectedValue === "target1"}
            value="target1"
            control={<Radio color="default" />}
            label="1"
            labelPlacement="top"
            inputProps={{ 'aria-label': "1"  }}
          />
          <div className="right-line"></div>
          <FormControlLabel
          checked={selectedValue === "target2"}
            value="target2"
            control={<Radio color="default" />}
            label="2"
            labelPlacement="top"
            inputProps={{ 'aria-label': "2"  }}
          />
          <div className="right-line"></div>
          <FormControlLabel
          checked={selectedValue === "target3"}
            value="target3"
            control={<Radio color="default" />}
            label="3"
            labelPlacement="top"
            inputProps={{ 'aria-label': "3" }}
          />
          <div className="right-line"></div>
          <FormControlLabel
          checked={selectedValue === "target4"}
            value="target4"
            control={<Radio color="default" />}
            label="4"
            labelPlacement="top"
            inputProps={{ 'aria-label': "4"}}
          />
          <FormControlLabel
          checked={selectedValue === "target5"}
            value="target5"
            control={<Radio color="default" />}
            label="5"
            labelPlacement="top"
            inputProps={{ 'aria-label': "5"}}
          />
          <FormControlLabel
          checked={selectedValue === "target6"}
            value="target6"
            control={<Radio color="default" />}
            label="6"
            labelPlacement="top"
            inputProps={{ 'aria-label': "6"}}
          />
          <FormControlLabel
          checked={selectedValue === "target7"}
            value="target7"
            control={<Radio color="default" />}
            label="7"
            labelPlacement="top"
            inputProps={{ 'aria-label': "7"}}
          />
          <div className="right-line"></div>
            
            
        
          
        </RadioGroup>
      </FormControl>
        
      </>
    );
    
  }
  

  