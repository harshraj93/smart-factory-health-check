import React from 'react';
import {FormNavigationButton} from '../../../assets/sfm-button'
import {withRouter} from 'react-router-dom';
import DropDownMenu from '../../../assets/drop-down-input-box';
import LabelledInputField from '../../../assets/input-field';
import FileUpload from '../../sfm-file-upload/file-upload';
import {Link} from 'react-router-dom';
import Header from '../sfm-add-client-main'


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


let clientInfoForm=(props,handleChange)=>{
    return(
        <div className = "client-info-container">
        <div className="title">Client Information</div>
        <div className="client-info">
        <LabelledInputField placeholder={true} labelName="Client Name*" required={true} name="clientName" onChange={handleChange}/>
        <LabelledInputField placeholder={true} labelName="Primary Client Paricipation*" required={true} name="clientParticipation" onChange={handleChange}/>
        <LabelledInputField placeholder={true} labelName="Primary Client Role*" required={true} name="clientRole" onChange={handleChange}/>
        <DropDownMenu  data={data[0]} name="clientName" onChange={handleChange}/>
        <LabelledInputField placeholder={true} labelName="Total Sites in Network (optional)" name="totalSites" onChange={handleChange}/>
        <LabelledInputField placeholder={true} labelName="# of Sites to Assess*" required={true} name="numSites" onChange={handleChange}/>
        <LabelledInputField placeholder={true} labelName="Company Revenue (optional)" name="companyRevenue" onChange={handleChange}/>
        <LabelledInputField placeholder={true} labelName="Company EBITDA (optional)" name="companyEBITDA" onChange={handleChange}/>
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
        <div className = "support-info-container">
        <div className="support-info">
        <LabelledInputField placeholder={false} labelName="Support Resource Name" />
        <LabelledInputField placeholder={false} labelName="Support Resource Level" />
        <LabelledInputField placeholder={false} labelName="Support Resource Email" />
        </div>
        </div>
    )
}


class AddNewClient extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showSupportResource:false,
        }
        this.props.disableMenu(false);
    }

  
    showSupportResource = ()=>{
        this.setState({
            showSupportResource:!this.state.showSupportResource
        })
    }

    handleChange = (e)=>{
        
        let name = e.target.name;
        console.log(e.target.value);
        this.setState({
            [name]:e.target.value
        })
    }


    render(){
       return(
            <div className='add-new-client-container'>
            <Header title="Add New Client" props={this.props}/>
            <FileUpload props={this.props} />
            <form id="add-client-form">
            {clientInfoForm(this.props,this.handleChange)}
            <div className="border-bottom"></div>
            {teamInfoForm(this.props)}
            <div className="border-bottom"></div>
            {addSupportResource(this.props,this.state)}
            <div className="border-bottom"></div>
            {this.state.showSupportResource&&addSupportResource(this.props,this.state)}
            <button className={"add-support-resource "+this.state.showSupportResource} 
            onClick={this.showSupportResource}>
                <span>&#8853;</span> 
                Add Support Resource
            </button>
            <div className="next-step">
                <Link to="/addsitedetails">
                    <FormNavigationButton labelName="Next Step" />
                </Link>
            </div>
            </form>
            </div>
        )
    }
}

export default withRouter(AddNewClient)

