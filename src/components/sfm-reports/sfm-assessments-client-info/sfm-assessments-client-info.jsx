import React from 'react';
import DropDownMenu from '../../../assets/drop-down-input-box';
import LabelledInputField from '../../../assets/input-field';
import clientInfoApi from '../../../api/assessments/assess-clientInfo';
import {apiGetHeader,apiPostHeader} from '../../../api/main/mainapistorage';
import './sfm-assessments-client-info.scss';

let data = [
    {
        labelName:"Sector",
        dropDownData:["Selected Sector","Sector 1"]
    },
    {
        labelName:"Manufacturing Archetype",
        dropDownData:["Manufacturing","Fabricating"]
    },
    {
        labelName:"Industry",
        dropDownData:["Consumer Products","Fabricating"]
    },
];

let requiredFieldNames=["location","primaryPOC","primaryPOCRole","sectorDropdown","manuArchDropdown"];

function clientInfo (props, handleChange) {
    return (
        <div className = "client-info-container">
        <div className="client-info">
        <LabelledInputField placeholder={true}  labelName="Primary Client Name*" />
        <LabelledInputField placeholder={true}  labelName="Primary Client Participant*" />
        <LabelledInputField placeholder={true}  labelName="Total # of Sites (optional)" />
        <LabelledInputField placeholder={true}  labelName="Primary Participant Role*" />
        <LabelledInputField placeholder={true}  labelName="# of Sites to Assess (optional)" />
        <LabelledInputField placeholder={true}  labelName="Company Revenue (optional)" />
        <LabelledInputField placeholder={true}  labelName="Company EBIDTA (optional)" />
        </div>
        </div>
    )
}

class ClientInfo extends React.Component {
    constructor(props){
        super(props);
        this.state={
            enableButton:"false",
            jsonData: {}
        }
        this.props.disableMenu(false);
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
        this.props.history.push({
           pathname: '/addsitedetails',
           state:{
               sites:this.state.numSites,
               clientName:this.state.clientName
            }
        })
        
    }

    checkRequiredFields = ()=>{
        let prevValue;
        let boolFlag;
        requiredFieldNames.forEach(element=>{
            boolFlag = prevValue&&this.state[element];
            prevValue = this.state[element];
            boolFlag!==undefined?boolFlag=true:boolFlag=false
        })

        if(boolFlag){
            this.setState({
            enableButton:true
        })
        }
    }

    fetchSiteInfo = async()=> {
        // console.log(this.props.data);
        // apiPostHeader.body = JSON.stringify(this.props.data);
        try{
        const response = await fetch(clientInfoApi.clientInfo,apiGetHeader)
        const siteInfoData = await response.json();
        return siteInfoData;
        }
        catch(err){
            return err
        }
    }

    componentDidMount = async()=> {
        let siteInfoData = await this.fetchSiteInfo();
        await this.setState({
            jsonData:siteInfoData.resultantJSON
        })
    }

    render(){
        return(
             <div className='client-info-container'>
             <div className = "client-info-container">
                <div className="client-info">
                <LabelledInputField placeholder={false}  labelName="Primary Client Name*" data={this.state.jsonData.clientname} />
                <LabelledInputField placeholder={false}  labelName="Primary Client Participant*" data={this.state.jsonData.primaryclientparticipant} />
                <LabelledInputField placeholder={false}  labelName="Total # of Sites (optional)" data={this.state.jsonData.totalsites} />
                <LabelledInputField placeholder={false}  labelName="Primary Participant Role*" data={this.state.jsonData.primaryclientrole} />
                <LabelledInputField placeholder={false}  labelName="# of Sites to Assess (optional)" data={this.state.jsonData.assesssites} />
                <LabelledInputField placeholder={false}  labelName="Company Revenue (optional)" data={this.state.jsonData.revenue} />
                <LabelledInputField placeholder={false}  labelName="Company EBIDTA (optional)" data={this.state.jsonData.ebitda} />
                </div>
                </div>
             </div>
         )
    }
}

export default ClientInfo;