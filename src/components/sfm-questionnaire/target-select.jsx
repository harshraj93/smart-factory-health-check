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
            current1:"",
            current2:"",
            current3:"",
            current4:"",
            current5:"",
            current6:"",
            current7:"",
            target1:"",
            target2:"",
            target3:"",
            target4:"",
            target5:"",
            target6:"",
            target7:"",
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
    setRadioButtonValue=(value1,value2)=>{
      console.log(value1,value2);
      switch (value1){
        case "current1":
          this.setState({
            current1:"checked"
          })
          break;
        case "current2":
          this.setState({
            current2:"checked"
          })
          break;
        case "current3":
          this.setState({
            current3:"checked"
          })
          break;
        case "current4":
          this.setState({
            current4:"checked"
          })
          break;
        case "current5":
          this.setState({
            current5:"checked"
          })
          break;
        case "current6":
          this.setState({
            current6:"checked"
          })
          break;
          case "current7":
            this.setState({
              current7:"checked"
          })
          default:

          
      }
      switch(value2){
        case "target1":
          this.setState({
            target1:"checked"
          })
          break;
        case "target2":
          this.setState({
            target2:"checked"
          })
          break;
        case "target3":
          this.setState({
            target3:"checked"
          })
          break;
        case "target4":
          this.setState({
            target4:"checked"
          })
          break;
        case "target5":
          this.setState({
            target5:"checked"
          })
          break;
        case "target6":
          this.setState({
            target6:"checked"
          })
          break;
          case "target7":
            this.setState({
              target7:"checked"
          })
          default:
      }
    }
   componentDidMount = ()=>{
    //this.setRadioButtonValue(this.props.current,this.props.target)
   }
    render(){
    
    return (
      <>

      <FormControl component="currentfieldset">
        <FormLabel component="legend" color="">Current</FormLabel>
        <RadioGroup row aria-label="current" name="current"  onChange={this.handleChangeCurrent}>
            <FormControlLabel
            //checked={this.state.current1}
            value="current1"
            control={<Radio color="default" />}
            label="1"
            labelPlacement="top"
            inputProps={{ 'aria-label': "1"  }}
            
          />
          <div className="right-line"></div>
          <FormControlLabel
            //checked={this.state.current2}
            value="current2"
            control={<Radio color="default" />}
            label="2"
            labelPlacement="top"
            inputProps={{ 'aria-label': "1"  }}
          />
          <div className="right-line"></div>
          <FormControlLabel
            //checked={this.state.current3}
            value="current3"
            control={<Radio color="default" />}
            label="3"
            labelPlacement="top"
            inputProps={{ 'aria-label': "1" }}
          />
          <div className="right-line"></div>
          <FormControlLabel
            //checked={this.state.current4}
            value="current4"
            control={<Radio color="default" />}
            label="4"
            labelPlacement="top"
            inputProps={{ 'aria-label': "1"}}
          />
          <div className="right-line"></div>
          <FormControlLabel
            //checked={this.state.current5}
            value="current5"
            control={<Radio color="default" />}
            label="5"
            labelPlacement="top"
            inputProps={{ 'aria-label': "1"}}
          />
          <div className="right-line"></div>
          <FormControlLabel
            //checked={this.state.current6}
            value="current6"
            control={<Radio color="default" />}
            label="6"
            labelPlacement="top"
            inputProps={{ 'aria-label': "1"}}
          />
          <div className="right-line"></div>
          <FormControlLabel
            //checked={this.state.current7}
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
        <RadioGroup row aria-label="Target" name="Target" onChange={this.handleTargetChange}>
          <FormControlLabel
            //checked={this.state.target1}
            value="target1"
            control={<Radio color="default" />}
            label="1"
            labelPlacement="top"
            inputProps={{ 'aria-label': "1"  }}
          />
          <div className="right-line"></div>
          <FormControlLabel
            //checked={this.state.target2}
            value="target2"
            control={<Radio color="default" />}
            label="2"
            labelPlacement="top"
            inputProps={{ 'aria-label': "2"  }}
          />
          <div className="right-line"></div>
          <FormControlLabel
            //checked={this.state.target3}
            value="target3"
            control={<Radio color="default" />}
            label="3"
            labelPlacement="top"
            inputProps={{ 'aria-label': "3" }}
          />
          <div className="right-line"></div>
          <FormControlLabel
            //checked={this.state.target4}
            value="target4"
            control={<Radio color="default" />}
            label="4"
            labelPlacement="top"
            inputProps={{ 'aria-label': "4"}}
          />
          <div className="right-line"></div>
          <FormControlLabel
            //checked={this.state.target5}
            value="target5"
            control={<Radio color="default" />}
            label="5"
            labelPlacement="top"
            inputProps={{ 'aria-label': "5"}}
          />
          <div className="right-line"></div>
          <FormControlLabel
            //checked={this.state.target6}
            value="target6"
            control={<Radio color="default" />}
            label="6"
            labelPlacement="top"
            inputProps={{ 'aria-label': "6"}}
          />
          <div className="right-line"></div>
          <FormControlLabel
            //checked={this.state.target7}
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
  

  