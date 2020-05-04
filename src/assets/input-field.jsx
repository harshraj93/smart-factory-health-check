import React from 'react';
import './input-field.scss';


export default class LabelledInputField extends React.Component{

    constructor(props){
        super(props);
        this.state={
            showRequired:false,
            value:"",
            showEmailError:""
        }
    }


    addRequired = (e)=>{
        let value = e.target.value;
        if(value.length===0){
        this.setState({
            showRequired:true
        })
        if(this.props.changeButtonState){this.props.changeButtonState()}
        }
        else{
            if(e.target.name.includes("Email")){
                if(!e.target.value.includes("@")){
                    this.setState({
                        showEmailError:true
                    })
                if(this.props.changeButtonState){this.props.changeButtonState()}
                }
                else{
                    this.setState({
                        showEmailError:false
                    })  
                }
            }
            this.setState({
                showRequired:false
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


    misc=(e,placeholder)=>{
        changeBorder(e,placeholder);
    }



    render(){
    return(
        <div className="labelled-input-field">
            {this.props.placeholder?<label>{(this.props.data||this.props.data===0)?this.props.labelName.toUpperCase():""}</label>:<label htmlFor="input">{this.props.labelName.toUpperCase()}</label>}
            <input 
            type={this.props.type==="number"?"number":"text"}
            min={this.props.min}
            onKeyDown={this.props.onKeyDown}
            step={this.props.step}
            className ={"input-text "+String((this.state.showRequired&&this.props.required&&!this.state.value)||this.state.showEmailError)}
            defaultValue={this.props.data} 
            placeholder={this.props.labelName} 
            onChange={this.props.onChange} 
            required={this.props.required}
            id={this.props.labelName}
            onInput={(e)=>this.misc(e,this.props.labelName)}
            name={this.props.name}
            onBlur={(e)=>this.addRequired(e)}
            readOnly={this.props.readOnly}
            >
            </input>
            {(this.state.showRequired&&this.props.required&&!this.state.value)?<div className="required-text">! Required Field</div>:<div />}
            {this.state.showEmailError&&<div className="required-text">! Invalid Email</div>}
        </div>
    )
    }
}



function changeBorder(e,placeholder){
   
    let id = e.target.id;
    let element = document.getElementById(id).style;
    e.target.value.length>0?element.borderColor="#727279":element.borderColor="#ffffff";
    document.getElementById(id).nextSibling.parentElement.childNodes[0].innerHTML=placeholder.toUpperCase();
}






