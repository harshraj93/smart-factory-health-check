import React from 'react';
import Header from '../sfm-add-client-main'
import {withRouter} from 'react-router-dom';
import LabelledInputField from '../../../assets/input-field';
import DropDownMenu from '../../../assets/drop-down-input-box'
import {FormNavigationButton} from '../../../assets/sfm-button'
import {Link} from 'react-router-dom';

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

let siteNumber = ["Site 1","Site 2","Site 3","Site 4"]


function siteHeader(props){
    return(
        <div className="site-header-container">
            <span className="site-name">Rotiva</span>
            <Link to="/addbusinessfunctions"><FormNavigationButton labelName="Next Step" /></Link>
        </div>
    )
}


class AddSiteDetails extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
        this.props.disableMenu(false)
    }

    siteInfoForm =(siteNumber)=>{
        return(
            <>
        <div className="site-form-modal">
        <div className="site-number">{siteNumber}</div>
        <div className="site-form">
        
        <LabelledInputField placeholder={true} labelName="Site Name*" />
        <LabelledInputField placeholder={true} labelName="Primary POC*" />
        <LabelledInputField placeholder={true} labelName="Primary POC Role*" />
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

    render(){
         return(
             <div className="setup-site-details">
            <Header title="Enter site details" props={this.props} />
            {siteHeader(this.props)}
            {siteNumber.map((number,element)=>{
                return (
                    this.siteInfoForm(number)
                )
                })}
            <Link to="/addbusinessfunctions"><FormNavigationButton labelName="Next Step" /></Link>
            
            </div>
         )
    }
}

export default withRouter(AddSiteDetails)