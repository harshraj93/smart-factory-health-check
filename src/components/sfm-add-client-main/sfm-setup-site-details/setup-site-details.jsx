import React from 'react';
import Header from '../sfm-add-client-main'
import {withRouter} from 'react-router-dom';
import LabelledInputField from '../../../assets/input-field';
import DropDownMenu from '../../../assets/drop-down-input-box'
import {FormNavigationButton} from '../../../assets/sfm-button'
//import {Link} from 'react-router-dom';

let data = 
[{
    labelName:"Manufacturing Archetype",
    dropDownData:["Manufacturing","Fabricating"]
},{
    labelName:"Sector",
    dropDownData:["Selected Sector","Sector 1"]
},{
    labelName:"#Employees",
    dropDownData:["100-200","200-300"]
},]

let siteNumber=[];

function siteHeader(props,enableButton){
    return(
        <div className="site-header-container">
            <span className="site-name">Rotiva</span>
         <FormNavigationButton labelName="Next Step" buttonStatus={enableButton}/>
        </div>
    )
}


class AddSiteDetails extends React.Component{
    constructor(props){
        super(props);
        this.state={
            enableButton:false
        }
        this.props.disableMenu(false)
    }

    setNextStepState = ()=>{
        this.setState({
            enableButton:"false"
        })
    }


    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.history.push({
            pathname:'/addbusinessfunctions'
        })
    }

    siteInfoForm =(siteNumber)=>{
        return(
            <>
        <div className="site-form-modal">
        <div className="site-number">{siteNumber}</div>
        
        <div className="site-form">
        
        <LabelledInputField placeholder={true} changeButtonState={this.setNextStepState} required={true} labelName="Site Name*" />
        <LabelledInputField placeholder={true} changeButtonState={this.setNextStepState} required={true} labelName="Primary POC*" />
        <LabelledInputField placeholder={true} changeButtonState={this.setNextStepState} required={true} labelName="Primary POC Role*" />
        <div className="bottom-border"></div>
        <div className="bottom-border"></div>
        <div className="bottom-border"></div>
        <DropDownMenu placeholder="Manufacturing Archetype*"  data={data[0]} name="clientName" />
        <DropDownMenu placeholder="Sector*"  data={data[1]} name="clientName" />
        <LabelledInputField placeholder={true} labelName="# of Shifts (optional)" />
        <LabelledInputField placeholder={true} labelName="# Employees (optional)" />
        <LabelledInputField placeholder={true} labelName="# of Assets (optional)" />
        <LabelledInputField placeholder={true} labelName="Site Revenue(optional)" />
        <LabelledInputField placeholder={true} labelName="Site EBITDA (optional)" />
        <LabelledInputField placeholder={true} labelName="OTIF % (optional)" />
        <LabelledInputField placeholder={true} labelName="Site OEE (optional)" />
        <LabelledInputField placeholder={true} labelName="OEE - Performance % (optional)" />
        <LabelledInputField placeholder={true} labelName="OEE - Availability % (optional)" />
        <LabelledInputField placeholder={true} labelName="OEE - Quality % (optional)" />
        
        </div>
       
        </div>
        <div className="border-bottom"></div>
        </>
        )
    }   


    componentDidMount = ()=>{
        siteNumber = this.evaluateSiteNumber();
    }


    evaluateSiteNumber = ()=>{
        let siteNumArray=[];
        let siteNum = this.props.location.state.sites;
        for(let i=1;i<=siteNum;i++){
            siteNumArray.push("Site "+i);
        }
        return siteNumArray;
    }


    render(){
        
         return(
             <div className="setup-site-details">
            <Header title="Enter site details" handleSubmit={this.handleSubmit} props={this.props}/>
            <form id="setup-site-details" onSubmit={this.handleSubmit}>
            {siteHeader(this.props,this.state.enableButton)}
            {siteNumber.map((number,element)=>{
                return (
                    
                    this.siteInfoForm(number)
                    
                )
                })}
           
           <FormNavigationButton labelName="Next Step" buttonStatus={this.state.enableButton} type="submit"/>
           </form>
            
            </div>
         )
    }
}

export default withRouter(AddSiteDetails)