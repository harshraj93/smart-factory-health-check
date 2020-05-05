import React from 'react';
import {CustomButton,FormNavigationButton} from '../../assets/sfm-button';
import leftIcon from '../../images/icon-small-chevron-left.svg';
import {withRouter} from 'react-router-dom';
import CustomCheckBox from '../../assets/check-box';
import LabelledInputField from '../../assets/input-field';
import DropDownMenu from '../../assets/drop-down-input-box';

let sectors = ["Consumer Products","Automotive"]


function Header(props){
    return(
        <div className="add-new-client-title">
                <CustomButton imgSrc={leftIcon} clickFunction={()=>props.props.history.push("/")}/>
                <span className="title-text">
                    {props.title}
                </span>
        </div>
    )
}


 class AddNewSite extends React.Component{
    constructor(props){
        super(props);
        this.state={
            addNewSector:false,
            enableButton:false,
            addSectorDiv:""
        }
        this.props.disableMenu(false)
    }

    
    handleChange = async (e)=>{
            let name = e.currentTarget.getAttribute("name");
            e.target.value?await this.setState({
                [name]:e.target.value
            }):
            await this.setState({
                [name]:e.target.getAttribute("value")
            })
            console.log(name,this.state[name])
            
    }

    showNewSector = ()=>{
        this.setState({
            addSectorDiv:!this.state.addSectorDiv
        })
    }

    changeButtonState = ()=>{
        this.setState({
            enableButton:false
        })
    }

    selectCheckBox = (e)=>{
        !this.state[e.target.name+"showInput"]?document.getElementById(e.target.name).style.color="#ffffff":document.getElementById(e.target.name).style.color="#9e9e9e";
        this.setState({
            [e.target.name+"showInput"]:!this.state[e.target.name+"showInput"],
            addNewSector:!this.state.addNewSector
        })
    }

    render(){
        return(
            <div className="add-new-site">
            <Header title="Add New Site" props={this.props}/>
            <div className="select-sector-text">Select sector to add site(s)</div>
            <div className="checkbox-container">
            {sectors.map((element,index)=>{
                return (
                    <>
                    <CustomCheckBox label={element} name={element.replace(/\s/g,'')} onClick={this.selectCheckBox}/>
                    <div className={"show-input-box "+this.state[element.replace(/\s/g,'')+"showInput"]}>
                    <LabelledInputField placeholder={true} 
                    type="number"
                    changeButtonState={this.changeButtonState} 
                    labelName="# of sites to assess*" required={true} 
                        name="siteNum" onChange={this.handleChange} />
                        </div>
                    </>
                )
            })}
           
            </div>
            <button type="button" className={"add-new-sector "+this.state.addNewSector} onClick={this.showNewSector}>
                <span>&#8853;</span> 
                Add New Sector
            </button>
            
            <div className="border-bottom" />
            {this.state.addSectorDiv&&<div className="add-new-sector-text">Add New Sector</div>}
            {this.state.addSectorDiv&&<div className="container-add-sector">
            <DropDownMenu placeholder = "Select Sector*" data={["A","B"]} onChange={this.handleChange} dropdownIndex={0}/>
            <LabelledInputField placeholder={true} 
                    type="number"
                    changeButtonState={this.changeButtonState} 
                    labelName="# of sites to assess*" required={true} 
                        name="siteNum" onChange={this.handleChange} />
            </div>}
            <FormNavigationButton buttonStatus={this.state.enableButton} labelName="Next Step" />
            </div>
        )
    }
}
export default withRouter(AddNewSite)