import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import './target-select.scss';

// let ratings = [1,2,3,4,5,6,7]
export default class TargetSelect extends React.Component {

        constructor(props){
          super(props);
          this.state={
            targetSelected:"",
            currentSelected:"",
            
          }
        }
    //selectedValue1 = props.current;
    // const handleChangeCurrent = (event) => {
    //     let value = event.target.value;
    //     value = value[value.length-1];
    //     setSelectedValue1(event.target.value);
    //     selectedValue1?props.setCurrentValue(value):props.setCurrentValue("")
    //   };
    //   const handleChangeTarget = (event) => {
    //     let value = event.target.value;
    //     value = value[value.length-1];
    //     setSelectedValue(event.target.value);
    //     selectedValue?props.setTargetValue(value):props.setTargetValue("")
    //   };
    handleChangeCurrent = async(e)=>{
      let value = e.target.value;
      value = value[value.length-1];
      await this.setState({
        currentSelected:e.target.value
      })
      this.state.currentSelected?this.props.setCurrentValue(value):this.props.setCurrentValue("")
    }
    handleTargetChange= async(e)=>{
      let value = e.target.value;
      value = value[value.length-1];
      console.log(value);
      await this.setState({
        targetSelected:e.target.value
      })
      this.state.targetSelected?this.props.setTargetValue(value):this.props.setTargetValue("")
    }
      
  //  componentDidUpdate = (prevProps,prevState)=>{
  //   if (prevState.currentSelected !== this.state.currentSelected) {
      
  //     this.setState({currentSelected:});
      
  //   }
  //  }
    render(){
    
    return (
      <>

      <FormControl component="currentfieldset">
        <FormLabel component="legend" color="">Current</FormLabel>
        <RadioGroup row aria-label="current" name="current" onChange={this.handleChangeCurrent}>
            <FormControlLabel
            // checked={this.state.currentSelected==="current1"}
            value="current1"
            control={<Radio color="default" />}
            label="1"
            labelPlacement="top"
            inputProps={{ 'aria-label': "1"  }}
          />
          <div className="right-line"></div>
          <FormControlLabel
            // checked={this.state.currentSelected==="current2"}
            value="current2"
            control={<Radio color="default" />}
            label="2"
            labelPlacement="top"
            inputProps={{ 'aria-label': "1"  }}
          />
          <div className="right-line"></div>
          <FormControlLabel
            // checked={this.state.currentSelected==="current3"}
            value="current3"
            control={<Radio color="default" />}
            label="3"
            labelPlacement="top"
            inputProps={{ 'aria-label': "1" }}
          />
          <div className="right-line"></div>
          <FormControlLabel
            // checked={this.state.currentSelected==="current4"}
            value="current4"
            control={<Radio color="default" />}
            label="4"
            labelPlacement="top"
            inputProps={{ 'aria-label': "1"}}
          />
          <div className="right-line"></div>
          <FormControlLabel
            //checked={this.state.currentSelected==="current5"}
            value="current5"
            control={<Radio color="default" />}
            label="5"
            labelPlacement="top"
            inputProps={{ 'aria-label': "1"}}
          />
          <div className="right-line"></div>
          <FormControlLabel
            //checked={this.props.currentSelected==="current6"}
            value="current6"
            control={<Radio color="default" />}
            label="6"
            labelPlacement="top"
            inputProps={{ 'aria-label': "1"}}
          />
          <div className="right-line"></div>
          <FormControlLabel
            //checked={this.props.currentSelected==="current7"}
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
        <RadioGroup row aria-label="Target" name="Target" defaultValue={this.props.targetSelected}  onChange={this.handleTargetChange}>
          <FormControlLabel
            
            value="target1"
            control={<Radio color="default" />}
            label="1"
            labelPlacement="top"
            inputProps={{ 'aria-label': "1"  }}
          />
          <div className="right-line"></div>
          <FormControlLabel
          
            value="target2"
            control={<Radio color="default" />}
            label="2"
            labelPlacement="top"
            inputProps={{ 'aria-label': "2"  }}
          />
          <div className="right-line"></div>
          <FormControlLabel
          
            value="target3"
            control={<Radio color="default" />}
            label="3"
            labelPlacement="top"
            inputProps={{ 'aria-label': "3" }}
          />
          <div className="right-line"></div>
          <FormControlLabel
         
            value="target4"
            control={<Radio color="default" />}
            label="4"
            labelPlacement="top"
            inputProps={{ 'aria-label': "4"}}
          />
          <div className="right-line"></div>
          <FormControlLabel
          
            value="target5"
            control={<Radio color="default" />}
            label="5"
            labelPlacement="top"
            inputProps={{ 'aria-label': "5"}}
          />
          <div className="right-line"></div>
          <FormControlLabel
         
            value="target6"
            control={<Radio color="default" />}
            label="6"
            labelPlacement="top"
            inputProps={{ 'aria-label': "6"}}
          />
          <div className="right-line"></div>
          <FormControlLabel
          
            value="target7"
            control={<Radio color="default" />}
            label="7"
            labelPlacement="top"
            inputProps={{ 'aria-label': "7"}}
          />
          
            
            
        
          
        </RadioGroup>
      </FormControl>
        
      </>
    );
  }
  }
  

  