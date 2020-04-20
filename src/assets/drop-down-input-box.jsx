import React from 'react';

class DropDownMenu extends React.Component{


        constructor(props){
            super(props);
            this.state={
                showRequired:""
            }
        }


        customInvalidAction = (e)=>{
            e.preventDefault();
            //this.addRequired();
        }
    
    
        handleInvalid = (e)=>{
                return this.customInvalidAction;
        }
    
        
        showRequired = (e)=>{
            if(e.target.value==="Select Industry*"){
            this.setState({
                showRequired:true
            })
        }
        }


        componentDidMount = ()=>{
            document.addEventListener('invalid', this.handleInvalid(), true);
        }


        render(){
        return(
            <div className="dropdown">
                {this.props.placeholder?"":<label htmlFor="dropdown-select">{this.props.data.labelName.toUpperCase()}</label>}
                <select className="dropdown-select" id={this.props.name} required={this.props.required} onChange={this.props.onChange} name={this.props.name}>
                {this.props.placeholder&&<option value="" disabled selected hidden style={{fontWeight:"100"}}>{this.props.placeholder}</option>}
                    {this.props.data.map((element,index)=>{
                        return(
                            <>
                            <option style={{backgroundColor:"white"}} key={index} value={element}>{element}</option>
                            </>
                        )
                        })}
                </select>
            </div>
        )
    }
}

export default DropDownMenu