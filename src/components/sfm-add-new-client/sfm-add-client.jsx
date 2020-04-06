import React from 'react';
import CustomButton from '../../assets/sfm-button'
import leftIcon from '../../images/icon-small-chevron-left.svg';
import {withRouter} from 'react-router-dom';
import DropDownMenu from '../../assets/drop-down-input-box';
import LabelledInputField from '../../assets/input-field';

let data = 
[{
    labelName:"Select Industry",
    dropDownData:["Manufacturing","Fabricating"]
},{
    labelName:"Sector",
    dropDownData:["Selected Sector","Sector 1"]
},{
    labelName:"#Employees",
    dropDownData:["100-200","200-300"]
},]
function header(props){
    return(
        <div className="add-new-client-title">
                <CustomButton imgSrc={leftIcon} clickFunction={props.history.goBack}/>
                <span className="title-text">
                    Add New Client
                </span>
        </div>
    )
}

function clientInfoForm(props){
    return(
        <div className = "client-info-container">
        <div className="title">Client Information</div>
        <div className="client-info">
        <LabelledInputField placeholder={true} labelName="Client Name*" />
        <LabelledInputField placeholder={true} labelName="Primary Client Paricipation*" />
        <LabelledInputField placeholder={true} labelName="Primary Client Role*" />
        <DropDownMenu placeholder={data[0].labelName+"*"} data={data[0]} />
        <LabelledInputField placeholder={true} labelName="Total Sites in Network (optional)" />
        <LabelledInputField placeholder={true} labelName="# of Sites to Assess*" />
        <LabelledInputField placeholder={true} labelName="Company Revenue (optional)" />
        <LabelledInputField placeholder={true} labelName="Company EBITDA (optional)" />
        </div>
        </div>
    )
}

function teamInfoForm(props){
    return(
        <div className = "client-info-container">
        <div className="title">Deloitte Team Information</div>
        <div className="client-info">
        <LabelledInputField placeholder={true} labelName="Primary Owner Name*" />
        <LabelledInputField placeholder={true} labelName="Primary Owner Level*" />
        <LabelledInputField placeholder={true} labelName="Primary Owner Email*" />
        </div>
        </div>
    )
}

function addSupportResource(props){
    return(
        <div className="client-info">
        <LabelledInputField placeholder={true} labelName="Support Resource Name" />
        <LabelledInputField placeholder={true} labelName="Support Resource Level" />
        <LabelledInputField placeholder={true} labelName="Support Resource Email" />
        </div>
    )
}

class AddNewClient extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
        this.props.disableMenu(false);
    }



    render(){
       
        return(
            <div className='add-new-client-container'>
            {header(this.props)}
            {clientInfoForm(this.props)}
            {teamInfoForm(this.props)}
            </div>
        )
    }
}

export default withRouter(AddNewClient);