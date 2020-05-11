import React from 'react';
import arrowIcon from '../images/icon-small-dropdown.svg';
class DropDownMenu extends React.Component{

      
        constructor(props){
            super(props);
            this.state={
                showRequired:"",
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
            this.changePlaceholder(e)
        }

        changePlaceholder = (e)=>{
            if(this.props.placeholder){
          document.getElementsByClassName("tkey-dropdown")[this.props.dropdownIndex].parentElement.childNodes[0].innerHTML = this.props.placeholder.toUpperCase();
        }
        }
        render(){
        return(
            <div className = "dropdown-container">
            <label></label>
        <div className="tkey-dropdown"> 
            
            <span className="toggle" name={this.props.name} onClick={this.changeValue}><span>{this.props.value?this.props.value:this.props.placeholder}</span><img src={arrowIcon} alt=""/></span>
            <div className={"dropdown-options-container "+ this.state.showDropdown } onClick={this.changeValue}  name={this.props.name}> 
                {this.props.data.map((item,index) => {
                    return (
                    <>
                    <div className="dropdown-options" key={index} value={item} onClick={(e)=> this.setDropdownSelectedValue(e)}> 
                    {item}
                </div>
                </>)})}
            </div>
        </div>
           </div>

        )
    }
}

export default DropDownMenu