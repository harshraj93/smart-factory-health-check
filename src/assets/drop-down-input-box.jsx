import React from 'react';
import arrowIcon from '../images/icon-small-dropdown.svg';
let data = ["A","B"]
class DropDownMenu extends React.Component{

      
        constructor(props){
            super(props);
            this.state={
                showRequired:"",
                value:this.props.placeholder,
                showDropdown:"",

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


        setDropdownSelectedValue = (e)=>{
            this.setState({
                value:e.target.getAttribute("value")
            })
        }


        componentDidMount = ()=>{
            document.addEventListener('invalid', this.handleInvalid(), true);
        }


        toggleDropdown = () => {
            if(this.state.showDropdown === ""){
                this.setState({
                    showDropdown:"show"
                })
               
            }else{
               this.setState({
                   showDropdown:""
               })
            }
        }

        changeValue = (e)=>{
            this.toggleDropdown(e);
            this.props.onChange(e);
        }

        render(){
        return(
        <div className="tkey-dropdown"> 
            <span className="toggle" name={this.props.name} onClick={this.changeValue}><span>{this.state.value}</span><img src={arrowIcon} /></span>
            <div className={"dropdown-options-container "+ this.state.showDropdown } onClick={this.changeValue}  name={this.props.name}> 
                {data.map((item,index) => {
                    
                    return (
                    <>
                    <div className="dropdown-options" key={index} value={item} onClick={(e)=> this.setDropdownSelectedValue(e)}> 
                    {item}
                </div>
                </>)})}
            </div>
        </div>
            // {/* <div className="dropdown">
                
            //     {this.props.placeholder?<label></label>:<label htmlFor="dropdown-select">{this.props.data.labelName?this.props.data.labelNametoUpperCase():""}</label>}
            //     <select className="dropdown-select" value={this.props.value} id={this.props.name} required={this.props.required} onChange={this.props.onChange} name={this.props.name}>
            //     {this.props.placeholder&&<option value="" disabled selected style={{fontWeight:"100"}}>{this.props.placeholder}</option>}
            //         {this.props.data.map((element,index)=>{
            //             return(
                            
            //                 <option style={{backgroundColor:"#35353b"}} key={index} value={element}>{element}</option>
                            
            //             )
            //             })}
            //     </select>
                
            // </div> */}
        )
    }
}

export default DropDownMenu