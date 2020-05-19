import React from 'react';
import LabelledInputField from '../../../assets/input-field';
import clientInfoApi from '../../../api/assessments/assess-clientInfo';
import {apiGetHeader} from '../../../api/main/mainapistorage';
import './sfm-assessments-client-info.scss';


class ClientInfo extends React.Component {
    constructor(props){
        super(props);
        this.state={
            enableButton:"false",
            jsonData: {}
        }
        // this.props.disableMenu(false);
    }

    // handleChange = async (e)=>{
    //     let name = e.target.name;
        
    //     await this.setState({
    //         [name]:e.target.value
    //     })
    //     this.checkRequiredFields();
    // }

    
    // handleSubmit = (e)=>{
    //     e.preventDefault();
    //     this.props.history.push({
    //        pathname: '/addsitedetails',
    //        state:{
    //            sites:this.state.numSites,
    //            clientName:this.state.clientName
    //         }
    //     })
        
    // }

    // checkRequiredFields = ()=>{
    //     let prevValue;
    //     let boolFlag;
    //     requiredFieldNames.forEach(element=>{
    //         boolFlag = prevValue&&this.state[element];
    //         prevValue = this.state[element];
    //         boolFlag!==undefined?boolFlag=true:boolFlag=false
    //     })

    //     if(boolFlag){
    //         this.setState({
    //         enableButton:true
    //     })
    //     }
    // }

    fetchSiteInfo = async(clientName)=> {
        // console.log(this.props.data);
        // apiPostHeader.body = JSON.stringify(this.props.data);
        
        try{
        const response = await fetch(clientInfoApi.clientInfo+`?clientName=${clientName}`,apiGetHeader)
        const siteInfoData = await response.json();
        return siteInfoData;
        }
        catch(err){
            return err
        }
    }

    componentDidMount = async()=> {
        let clientName = this.props.client;
        let siteInfoData = await this.fetchSiteInfo(clientName);
        await this.setState({
            jsonData:siteInfoData.resultantJSON
        })
    }

    render(){
        return(
             <div className='client-info-container-main'>
             <div className = "client-info-container">
                <div className="client-info">
                <LabelledInputField placeholder={false}  labelName="Primary Client Name*" data={this.state.jsonData.clientname} readOnly={true} />
                <LabelledInputField placeholder={false}  labelName="Primary Client Participant*" data={this.state.jsonData.primaryclientparticipant} readOnly={true} />
                <LabelledInputField placeholder={false}  labelName="Total # of Sites (optional)" data={this.state.jsonData.totalsites} readOnly={true} />
                <LabelledInputField placeholder={false}  labelName="Primary Participant Role*" data={this.state.jsonData.primaryclientrole} readOnly={true} />
                <LabelledInputField placeholder={false}  labelName="# of Sites to Assess (optional)" data={this.state.jsonData.assesssites} readOnly={true} />
                <LabelledInputField placeholder={false}  labelName="Company Revenue (optional)" data={this.state.jsonData.revenue} readOnly={true} />
                <LabelledInputField placeholder={false}  labelName="Company EBIDTA (optional)" data={this.state.jsonData.ebitda} readOnly={true} />
                </div>
                </div>
             </div>
         )
    }
}

export default ClientInfo;