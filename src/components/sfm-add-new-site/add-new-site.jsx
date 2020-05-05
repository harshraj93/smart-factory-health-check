import React from 'react';
import {CustomButton,FormNavigationButton} from '../../assets/sfm-button';
import leftIcon from '../../images/icon-small-chevron-left.svg';
import {withRouter} from 'react-router-dom';
import CustomCheckBox from '../../assets/check-box';
import LabelledInputField from '../../assets/input-field';
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
        }
        this.props.disableMenu(false)
    }

    handleChange = (e)=>{
        let name = e.target.name;
        console.log(name,e)

    }

    changeButtonState = ()=>{
        this.setState({
            enableButton:false
        })
    }

    selectCheckBox = (e)=>{
        console.log(e.target.name)
        this.setState({
            [e.target.name+"showInput"]:!this.state[e.target.name+"showInput"]
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
                    changeButtonState={this.changeButtonState} 
                    labelName="#Number of sites to assess" required={true} 
                        name="siteNum" onChange={this.handleChange} />
                        </div>
                    </>
                )
            })}
           
            </div>
            <button type="button" className={"add-new-sector "+this.state.addNewSector} >
                <span>&#8853;</span> 
                Add New Sector
            </button>
            
            
            <FormNavigationButton buttonStatus={this.state.enableButton} labelName="Next Step" />
            </div>
        )
    }
}
export default withRouter(AddNewSite)