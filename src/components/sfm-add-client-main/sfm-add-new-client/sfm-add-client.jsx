import React from 'react';
import {FormNavigationButton} from '../../../assets/sfm-button'
import {withRouter} from 'react-router-dom';
import DropDownMenu from '../../../assets/drop-down-input-box';
import LabelledInputField from '../../../assets/input-field';
import FileUpload from '../../sfm-file-upload/file-upload';
import Header from '../sfm-add-client-main';
import addclientapi from '../../../api/addclient/addclient';
import {apiGetHeader,apiPostHeader} from '../../../api/main/mainapistorage';
let data = 
[{
    labelName:"Select Industry",
    dropDownData:[]
},{
    labelName:"Sector",
    dropDownData:["Selected Sector","Sector 1"]
},{
    labelName:"#Employees",
    dropDownData:["100-200","200-300"]
},]

let requiredFieldNames=["clientName","clientParticipation","clientRole","industryDropdown","numSites","primOwnerName","primOwnerLevel","primOwnerEmail"]


let clientInfoForm=(props,state,handleChange,changeButtonState)=>{
    return(
        <div className = "client-info-container">
        <div className="title">Client Information</div>
        <div className="client-info">
        <LabelledInputField placeholder={true} changeButtonState={changeButtonState} labelName="Client Name*" required={true} name="clientName" onChange={handleChange}/>
        <LabelledInputField placeholder={true} changeButtonState={changeButtonState} labelName="Primary Client Paricipation*" required={true} name="clientParticipation" onChange={handleChange}/>
        <LabelledInputField placeholder={true} changeButtonState={changeButtonState} labelName="Primary Client Role*" required={true} name="clientRole" onChange={handleChange}/>
        <DropDownMenu placeholder={data[0].labelName+"*"} required={true} data={state.dropDownData} name="industryDropdown" onChange={handleChange}/>
        <LabelledInputField placeholder={true} changeButtonState={changeButtonState} labelName="Total Sites in Network (optional)" name="totalSites" onChange={handleChange}/>
        <LabelledInputField placeholder={true} changeButtonState={changeButtonState} labelName="# of Sites to Assess*" 
        required={true} name="numSites" onChange={handleChange} type="number" min="1" step="1" onKeyDown={(e)=>e.keyCode!==69}/>
        <LabelledInputField placeholder={true} changeButtonState={changeButtonState} labelName="Company Revenue (optional)" name="companyRevenue" onChange={handleChange}/>
        <LabelledInputField placeholder={true} changeButtonState={changeButtonState} labelName="Company EBITDA (optional)" name="companyEBITDA" onChange={handleChange}/>
        </div>
        </div>
    )
}


function teamInfoForm(props,handleChange,changeButtonState){
    return(
        <div className = "team-info-container">
        <div className="team-info-title">Deloitte Team Information</div>
        <div className="team-info">
        <LabelledInputField placeholder={true} changeButtonState={changeButtonState} required={true} labelName="Primary Owner Name*" name="primOwnerName" onChange={handleChange}/>
        <LabelledInputField placeholder={true} changeButtonState={changeButtonState} required={true} labelName="Primary Owner Level*" name="primOwnerLevel" onChange={handleChange}/>
        <LabelledInputField placeholder={true} changeButtonState={changeButtonState} required={true} labelName="Primary Owner Email*" name="primOwnerEmail" onChange={handleChange}/>
        </div>
        </div>
    )
}


function addSupportResource(props,state,hideSupportResource){
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
            enableButton:"false",
            dropDownData:[]
        }
        this.props.disableMenu(false);
    }

  
    showSupportResource = ()=>{
        this.setState({
            showSupportResource:true,
        })
    }

    hideSupportResource = ()=>{
        this.setState({
            showSupportResource:false,
        })
    }


    handleChange = async (e)=>{
        let name = e.target.name;
        await this.setState({
            [name]:e.target.value
        })
        this.checkRequiredFields();
    }

    
    handleSubmit = (e)=>{
        e.preventDefault();
        this.triggerFormSubmission();
        this.props.history.push({
           pathname: '/addsitedetails',
           state:{
               sites:this.state.numSites,
               clientName:this.state.clientName,
               industry:this.state.industryDropdown,
               industryList:this.state.dropDownData
            }
        })
        
    }


    triggerFormSubmission = ()=>{
        let addClientJSON={
            clientDetails:{
                clientName:this.state.clientName,
                clientIndustry:this.state.industryDropdown,
                "primaryclientrole": this.state.clientRole,
                "primaryclientparticipant":this.state.clientParticipation,
                "assesssites":this.state.numSites,
                "sumofassesssite":this.state.totalSites,
                "totalsites":40,
                "revenue":null,
                "ebitda":null,
                "createdby":null,
                "createdon":null,
                "modifiedby":null,
                "modifiedon":null}}
    }

    setNextStepState = ()=>{
        this.setState({
            enableButton:false
        })
    }


    checkRequiredFields = ()=>{
        let boolFlag;
        let cnt=0;
        requiredFieldNames.forEach(element=>{
            let stateName = this.state[element]
            if(stateName){
            cnt++;
        }
        })
        if(cnt===requiredFieldNames.length){
            boolFlag=true;
        }
        console.log(boolFlag,cnt,requiredFieldNames.length);
        if(boolFlag){
            this.setState({
            enableButton:true
        })
        }
    }   


    getIndustryList = ()=>{
        fetch(addclientapi.industryList,apiGetHeader)
            .then(resp=>resp.json())
            .then(resp=>this.setState({dropDownData:resp.resultantJSON}))
            .catch(err=>console.log(err))

    }


    componentDidMount = ()=>{
        this.getIndustryList();
    }


    render(){
       return(
            <div className='add-new-client-container'>
            <Header title="Add New Client" props={this.props}/>
            <FileUpload props={this.props} />
            <form id="add-client-form" onSubmit={this.handleSubmit}>
            {clientInfoForm(this.props,this.state,this.handleChange,this.setNextStepState)}
            <div className="border-bottom"></div>
            {teamInfoForm(this.props,this.handleChange,this.setNextStepState)}
            <div className="border-bottom"></div>
            {addSupportResource(this.props,this.state)}
            <div className="border-bottom"></div>
            {this.state.showSupportResource&&addSupportResource(this.props,this.state)}
            {this.state.showSupportResource&&<span className="close-button" onClick={this.hideSupportResource}>&times;</span>}
            <button type="button" className={"add-support-resource "+this.state.showSupportResource} 
            onClick={this.showSupportResource}>
                <span>&#8853;</span> 
                Add Support Resource
            </button>
            <div className="next-step">
                    <FormNavigationButton buttonStatus={this.state.enableButton} labelName="Next Step" />
            </div>
            </form>
            </div>
        )
    }
}

export default withRouter(AddNewClient)

