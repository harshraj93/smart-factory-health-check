import React from 'react';
import DropDownMenu from '../../../assets/drop-down-input-box';
import LabelledInputField from '../../../assets/input-field';
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
        <DropDownMenu placeholder={data[2].labelName+"*"} required={true} data={data[2]} name="industry" onChange={handleChange}/>
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
            enableButton:"false"
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

    render(){
        return(
             <div className='client-info-container'>
             <form id="add-client-form" onSubmit={this.handleSubmit}>
                {clientInfo(this.props,this.handleChange,this.setNextStepState)}
             </form>
             </div>
         )
    }
}

export default ClientInfo;