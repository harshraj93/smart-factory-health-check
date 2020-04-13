import React from 'react';
import './input-field.scss';


export default class LabelledInputField extends React.Component{

    constructor(props){
        super(props);
        this.state={
            showRequired:false,
            value:""
        }
    }


    addRequired = (e)=>{
        let value = e.target.value;
        if(value.length===0){
        this.setState({
            showRequired:true
        })
    }
    }


    customInvalidAction = (e)=>{
        e.preventDefault();
        //this.addRequired();
    }


    handleInvalid = (e)=>{
            return this.customInvalidAction;
    }


    componentDidMount = ()=>{
        document.addEventListener('invalid', this.handleInvalid(), true);
    }


    setValueBorder=(e)=>{
        changeBorder(e);
        this.setValue(e)
    }


    setValue=(e)=>{
        let value = e.target.value;
        this.setState({
            value:value
        })
    }


    render(){
    return(
        <div className="labelled-input-field">
            {this.props.placeholder?"":<label htmlFor="input">{this.props.labelName.toUpperCase()}</label>}
            <input 
            type={this.props.type==="number"?"number":"text"}
            min={this.props.min}
            onKeyDown={this.props.onKeyDown}
            step={this.props.step}
            className ={"input-text "+String(this.state.showRequired&&this.props.required&&!this.state.value)}
            defaultValue={this.props.data} 
            placeholder={this.props.labelName} 
            onChange={this.props.onChange} 
            required={this.props.required}
            id={this.props.labelName}
            onInput={(e)=>this.setValueBorder(e)}
            name={this.props.name}
            onBlur={(e)=>this.addRequired(e)}
            >
            </input>
            {this.state.showRequired&&this.props.required&&!this.state.value&&<div className="required-text">! Required Field</div>}
        </div>
    )
    }
}



function changeBorder(e){
    let id = e.target.id;
    let element = document.getElementById(id).style;
    e.target.value.length>0?element.borderColor="#727279":element.borderColor="#ffffff";
}






