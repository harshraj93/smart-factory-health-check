import React from 'react';
import {FormNavigationButton} from '../../../assets/sfm-button'
import {withRouter} from 'react-router-dom';
import DropDownMenu from '../../../assets/drop-down-input-box';
import LabelledInputField from '../../../assets/input-field';
import FileUpload from '../../sfm-file-upload/file-upload';
//import {Link} from 'react-router-dom';
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
        <DropDownMenu placeholder={data[0].labelName} data={data[0]} name="clientName" onChange={handleChange}/>
        <LabelledInputField placeholder={true} labelName="Total Sites in Network (optional)" name="totalSites" onChange={handleChange}/>
        <LabelledInputField placeholder={true} labelName="# of Sites to Assess*" 
        required={true} name="numSites" onChange={handleChange} type="number" min="0" step="1"/>
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
        <LabelledInputField placeholder={true} required={true} labelName="Primary Owner Name*" />
        <LabelledInputField placeholder={true} required={true} labelName="Primary Owner Level*" />
        <LabelledInputField placeholder={true} required={true} labelName="Primary Owner Email*" />
        </div>
        </div>
    )
}


function addSupportResource(props,state){
    return(
        <div className = "support-info-container">
        <div className="support-info">
        <LabelledInputField placeholder={true}  labelName="Support Resource Name" />
        <LabelledInputField placeholder={true}  labelName="Support Resource Level" />
        <LabelledInputField placeholder={true}  labelName="Support Resource Email" />
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
            showSupportResource:!this.state.showSupportResource,
            validateForm:""
        })
    }


    handleChange = (e)=>{
        let name = e.target.name;
        this.setState({
            [name]:e.target.value
        })
    }

    
    validateForm = ()=>{
        this.setState({
            validateForm:true
        })
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.history.push({
           pathname: '/addsitedetails',
           state:{sites:this.state.numSites}
        })
    }

    render(){
       return(
            <div className='add-new-client-container'>
            <Header title="Add New Client" props={this.props}/>
            <FileUpload props={this.props} />
            <form id="add-client-form" onSubmit={this.handleSubmit}>
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
                    <FormNavigationButton labelName="Next Step" clickFunction={this.validateForm} type="submit"/>
            </div>
            </form>
            </div>
        )
    }
}

export default withRouter(AddNewClient)

