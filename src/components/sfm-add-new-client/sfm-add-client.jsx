import React from 'react';
import {CustomButton} from '../../assets/sfm-button'
import leftIcon from '../../images/icon-small-chevron-left.svg';
import {withRouter} from 'react-router-dom';
import DropDownMenu from '../../assets/drop-down-input-box';
import LabelledInputField from '../../assets/input-field';
import Collapse from 'react-bootstrap/Collapse';
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
        <LabelledInputField placeholder={false} labelName="Client Name*" />
        <LabelledInputField placeholder={false} labelName="Primary Client Paricipation*" />
        <LabelledInputField placeholder={false} labelName="Primary Client Role*" />
        <DropDownMenu  data={data[0]} />
        <LabelledInputField placeholder={false} labelName="Total Sites in Network (optional)" />
        <LabelledInputField placeholder={false} labelName="# of Sites to Assess*" />
        <LabelledInputField placeholder={false} labelName="Company Revenue (optional)" />
        <LabelledInputField placeholder={false} labelName="Company EBITDA (optional)" />
        </div>
        </div>
    )
}


function teamInfoForm(props){
    return(
        <div className = "team-info-container">
        <div className="team-info-title">Deloitte Team Information</div>
        <div className="team-info">
        <LabelledInputField placeholder={false} labelName="Primary Owner Name*" />
        <LabelledInputField placeholder={false} labelName="Primary Owner Level*" />
        <LabelledInputField placeholder={false} labelName="Primary Owner Email*" />
        </div>
        </div>
    )
}


function addSupportResource(props,state){
    return(
        <Collapse in={state.showSupportResource}>
        <div className = "support-info-container">
        <div className="support-info">
        <LabelledInputField placeholder={false} labelName="Support Resource Name" />
        <LabelledInputField placeholder={false} labelName="Support Resource Level" />
        <LabelledInputField placeholder={false} labelName="Support Resource Email" />
        </div>
        </div>
        </Collapse>
    )
}


class AddNewClient extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showSupportResource:false
        }
        this.props.disableMenu(false);
    }

    showSupportResource = ()=>{
        this.setState({
            showSupportResource:!this.state.showSupportResource
        })
    }


    render(){
       return(
            <div className='add-new-client-container'>
            {header(this.props)}
            {clientInfoForm(this.props)}
            <div className="border-bottom"></div>
            {teamInfoForm(this.props)}
            <div className="border-bottom"></div>
            {this.state.showSupportResource&&addSupportResource(this.props,this.state)}
            <button className={"add-support-resource "+this.state.showSupportResource} onClick={this.showSupportResource}><img alt="" />Add Support Resource</button>
            <div className="next-step"><CustomButton labelName="Next Step"></CustomButton></div>
            </div>
        )
    }
}

export default withRouter(AddNewClient);