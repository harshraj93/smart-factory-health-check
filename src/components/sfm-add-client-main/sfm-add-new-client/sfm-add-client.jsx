import React from 'react';
import {FormNavigationButton} from '../../../assets/sfm-button'
import {withRouter} from 'react-router-dom';
import DropDownMenu from '../../../assets/drop-down-input-box';
import LabelledInputField from '../../../assets/input-field';
//import FileUpload from '../../sfm-file-upload/file-upload';
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
        <LabelledInputField placeholder={true} 
        changeButtonState={changeButtonState} 
        labelName="Client Name*" required={true} 
        name="clientName" onChange={handleChange} 
        data={(state.clientName!==undefined?state.clientName:"")}/>
        <LabelledInputField 
        placeholder={true} 
        changeButtonState={changeButtonState} 
        labelName="Primary Client Participation*" 
        required={true} name="clientParticipation" 
        onChange={handleChange} 
        data={(state.clientParticipation!==undefined?state.clientParticipation:"")}/>
        <LabelledInputField placeholder={true} 
        changeButtonState={changeButtonState} 
        labelName="Primary Client Role*" 
        required={true} name="clientRole" 
        onChange={handleChange} 
        data={(state.clientRole!==undefined?state.clientRole:"")}/>
        <DropDownMenu 
        placeholder={data[0].labelName+"*"} 
        required={true} data={state.dropDownData} 
        name="industryDropdown" 
        onChange={handleChange}
        value={(state.industryDropdown!==undefined?state.industryDropdown:"")}
        />
        <LabelledInputField 
        placeholder={true} 
        changeButtonState={changeButtonState} 
        type="number" min="1" 
        labelName="Total Sites in Network (optional)" 
        name="totalSites" onChange={handleChange} 
        data={(state.totalSites!==undefined?state.totalSites:"")}/>
        <LabelledInputField 
        placeholder={true} 
        changeButtonState={changeButtonState} 
        labelName="# of Sites to Assess*" 
        required={true} name="numSites" 
        onChange={handleChange} type="number" min="1" step="1" onKeyDown={(e)=>e.keyCode!==69} 
        data={(state.numSites!==undefined?state.numSites:"")}/>
        <LabelledInputField 
        placeholder={true} changeButtonState={changeButtonState} 
        labelName="Company Revenue (optional)" min="1" type="number" 
        name="companyRevenue" onChange={handleChange} 
        data={state.backData.companyRevenue!==undefined?state.backData.companyRevenue:""}/>
        <LabelledInputField 
        placeholder={true} changeButtonState={changeButtonState} 
        labelName="Company EBITDA (optional)" min="1" type="number" 
        name="companyEBITDA" onChange={handleChange} 
        data={(state.companyEBITDA!==undefined?state.backData.companyEBITDA:"")}/>
        </div>
        </div>
    )
}


function teamInfoForm(props,state,handleChange,changeButtonState){
    return(
        <div className = "team-info-container">
        <div className="team-info-title">Deloitte Team Information</div>
        <div className="team-info">
        <LabelledInputField placeholder={true} changeButtonState={changeButtonState} required={true} 
        labelName="Primary Owner Name*" name="primOwnerName" onChange={handleChange} 
        data={(state.primOwnerName!==undefined?state.primOwnerName:"")}/>
        <LabelledInputField placeholder={true} changeButtonState={changeButtonState} required={true} 
        labelName="Primary Owner Level*" name="primOwnerLevel" onChange={handleChange} 
        data={(state.primOwnerLevel!==undefined?state.primOwnerLevel:"")}/>
        <LabelledInputField placeholder={true} changeButtonState={changeButtonState} required={true} 
        labelName="Primary Owner Email*" name="primOwnerEmail" onChange={handleChange} 
        data={(state.primOwnerEmail!==undefined?state.primOwnerEmail:"")}/>
        </div>
        </div>
    )
}


function addSupportResource(handleChange,state,index,changeButtonState,hideSupportResource){
    
    return(
        <div className = "support-info-container">
        <div className="support-info">
        <LabelledInputField placeholder={true}  
        labelName="Support Resource Name" changeButtonState={changeButtonState} 
         name={"supResourceName"+index} onChange={handleChange}
         data={(state["supResourceName"+index])!==undefined?(state["supResourceName"+index]):""}
         />
        <LabelledInputField placeholder={true}  
        labelName="Support Resource Level" changeButtonState={changeButtonState} 
        name={"supResourceLevel"+index} onChange={handleChange}
        data={(state.backData["supResourceLevel"+index])!==undefined?(state.backData["supResourceLevel"+index]):""}
        />
        <>
        <LabelledInputField placeholder={true}  
        labelName={(supportEmailRequired(index,state))?"Support Resource Email*":"Support Resource Email"} 
        required = {supportEmailRequired(index,state)} changeButtonState={changeButtonState}
         name={"supResourceEmail"+index} onChange={handleChange}
         data={(state.backData["supResourceEmail"+index])!==undefined?state.backData["supResourceEmail"+index]:""}
         />
        </>
        </div>
        {(index===2)&&<button className="close-button" onClick={hideSupportResource}>&times;</button>}
        </div>
    )
}


let supportEmailRequired = (index,state)=>{
    if(index===1&&state.supResourceName1)
    {
        requiredFieldNames.push("supResourceEmail1")
        return true
    }
    return false 
}


class AddNewClient extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showSupportResource:false,
            enableButton:"false",
            dropDownData:[],
            backData:{}
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
        }


    navigate = (clientid)=>{

        let state={
            sites:this.state.numSites,
            clientName:this.state.clientName,
            industry:this.state.industryDropdown,
            industryList:this.state.dropDownData,
            clientid:clientid
         }

        localStorage.setItem("sitedetailsstate",JSON.stringify({
            state:state
        }))

        this.props.history.push({
            pathname: '/addsitedetails',
            state:state
         })
    }


    triggerFormSubmission = ()=>{
        let clientid;
        let addClientJSON={
            clientDetails:{
                "clientname":this.state.clientName,
                "clientindustry":this.state.industryDropdown,
                "primaryclientrole": this.state.clientRole,
                "primaryclientparticipant":this.state.clientParticipation,
                "assesssites":this.state.numSites,
                "totalsites":this.state.totalSites,
                "revenue":this.state.companyRevenue,
                "ebitda":this.state.companyEBITDA,
                "createdby":null,
                "createdon":null,
                "modifiedby":null,
                "modifiedon":null,
            },
                "deloitteResources":{
                    "primary_owner_name":this.state.primOwnerName,
                    "primary_owner_email":this.state.primOwnerEmail,
                    "primary_owner_level":this.state.primOwnerLevel,
                    "SupportResources":this.state.supResource1?[{
                    "support_resource_name":this.state.supResourceName1,
                    "support_resource_email":this.state.supResourceEmail1,
                    "support_resource_level":this.state.supResourceLevel1
                    },
                    this.state.supResourceName2?{
                        "support_resource_name":this.state.supResourceName2,
                        "support_resource_email":this.state.supResourceEmail2,
                        "support_resource_level":this.state.supResourceLevel2
                        }:""
                      ]:[]
            }
        }
        let body = addClientJSON;
        apiPostHeader.body = JSON.stringify(body);
        fetch(addclientapi.addClient,apiPostHeader)
            .then(resp=>resp.json())
            .then(resp=>{
            clientid=resp.clientid;
           if(!resp.errorMessage){
                this.navigate(clientid);
                this.setData();
           }
        })
            .catch(err=>console.log(err))

        }

    
    setData = ()=>{
        localStorage.setItem("addnewclient",JSON.stringify({
            "clientName":this.state.clientName,
            "industryDropdown":this.state.industryDropdown,
            "clientRole": this.state.clientRole,
            "clientParticipation":this.state.clientParticipation,
            "numSites":this.state.numSites,
            "totalSites":this.state.totalSites,
            "companyRevenue":this.state.companyRevenue,
            "companyEBITDA":this.state.companyEBITDA,
            "primOwnerName":this.state.primOwnerName,
            "primOwnerEmail":this.state.primOwnerEmail,
            "primOwnerLevel":this.state.primOwnerLevel,
            "supResourceName1":this.state.supResourceName1,
            "supResourceEmail1":this.state.supResourceEmail1,
            "supResourceLevel1":this.state.supResourceLevel1,
            "supResourceName2":this.state.supResourceName2,
            "supResourceEmail2":this.state.supResourceEmail2,
            "supResourceLevel2":this.state.supResourceLevel2
        }))
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
        if(cnt>=requiredFieldNames.length){
            boolFlag=true;
        }
        //console.log(boolFlag,cnt,requiredFieldNames.length);
        if(boolFlag){
            this.setState({
            enableButton:true
        })
        }
    }  
    
    checkRequiredBack = (state)=>{
        let cnt=0;
        let boolFlag;
        if(this.state.backData){
        requiredFieldNames.forEach(element=>{

            if(this.state[element]){
                cnt++;
            }
        console.log(this.state[element])
        })
        if(cnt>=requiredFieldNames.length){
            boolFlag=true;
        }
        console.log(boolFlag,cnt,requiredFieldNames.length);
        if(boolFlag){
            this.setState({
            enableButton:true
        })
        }
    }
    }


    getIndustryList = ()=>{
        fetch(addclientapi.industryList,apiGetHeader)
            .then(resp=>resp.json())
            .then(resp=>this.setState({dropDownData:resp.resultantJSON}))
            .catch(err=>console.log(err))

    }


    componentDidMount = async()=>{
        this.getIndustryList();
        let backData = this.props.location.data;
        if(backData){
        await this.setState({
            clientName:backData.clientName,
            industryDropdown:backData.industryDropdown,
            clientRole: backData.clientRole,
            clientParticipation:backData.clientParticipation,
            numSites:backData.numSites,
            "totalSites":backData.totalSites,
            "companyRevenue":backData.companyRevenue,
            "companyEBITDA":backData.companyEBITDA,
            "primOwnerName":backData.primOwnerName,
            "primOwnerEmail":backData.primOwnerEmail,
            "primOwnerLevel":backData.primOwnerLevel,
            "supResourceName1":backData.supResourceName1,
            "supResourceEmail1":backData.supResourceEmail1,
            "supResourceLevel1":backData.supResourceLevel1,
            "supResourceName2":backData.supResourceName2,
            "supResourceEmail2":backData.supResourceEmail2,
            "supResourceLevel2":backData.supResourceLevel2

        })
        console.log(this.state.backData);
        this.checkRequiredBack()
    }
    }


    render(){
       return(
            <div className='add-new-client-container'>
            <Header title="Add New Client" props={this.props}/>
            <div className="required">* Required</div>
            <form id="add-client-form" onSubmit={this.handleSubmit}>
            {clientInfoForm(this.props,this.state,this.handleChange,this.setNextStepState)}
            <div className="border-bottom"></div>
            {teamInfoForm(this.props,this.state,this.handleChange,this.setNextStepState)}
            <div className="border-bottom"></div>
            {addSupportResource(this.handleChange,this.state,1,this.setNextStepState)}
            <div className="border-bottom"></div>
            {this.state.showSupportResource&&addSupportResource(this.handleChange,this.state,2,this.setNextStepState,this.hideSupportResource)}
            
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

