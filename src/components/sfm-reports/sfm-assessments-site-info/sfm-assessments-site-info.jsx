import React from 'react';
import DropDownMenu from '../../../assets/drop-down-input-box';
import LabelledInputField from '../../../assets/input-field';
import './sfm-assessments-site-info.scss';

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

function secondForm(props,handleChange,changeButtonState){
    return(
        <div className = "client-info-container">
        <div className="client-info">
        <DropDownMenu placeholder={data[0].labelName+"*"} required={true} data={data[0]} name="sectorDropdown" onChange={handleChange}/>
        <DropDownMenu placeholder={data[1].labelName+"*"} required={true} data={data[1]} name="manuArchDropdown" onChange={handleChange}/>
        <LabelledInputField placeholder={true} changeButtonState={changeButtonState} labelName="# of Shifts (optional)" 
         name="numShifts" onChange={handleChange} type="number" min="1" step="1" onKeyDown={(e)=>e.keyCode!==69}/>
        <LabelledInputField placeholder={true} changeButtonState={changeButtonState} labelName="# of Employees (optional)" 
         name="numEmps" onChange={handleChange} type="number" min="1" step="1" onKeyDown={(e)=>e.keyCode!==69}/>
        <LabelledInputField placeholder={true} changeButtonState={changeButtonState} labelName="# of Assets (optional)" 
         name="numAssets" onChange={handleChange} type="number" min="1" step="1" onKeyDown={(e)=>e.keyCode!==69}/>
        <LabelledInputField placeholder={true} changeButtonState={changeButtonState} labelName="Site Revenue (optional)" name="siteRevenue" onChange={handleChange}/>
        <LabelledInputField placeholder={true} changeButtonState={changeButtonState} labelName="Site EPITDA (optional)" name="siteEPITDA" onChange={handleChange}/>
        <LabelledInputField placeholder={true} changeButtonState={changeButtonState} labelName="OTIF % (optional)" 
         name="otif" onChange={handleChange} type="number" min="1" step="1" onKeyDown={(e)=>e.keyCode!==69}/>
        <LabelledInputField placeholder={true} changeButtonState={changeButtonState} labelName="Site OEE (optional)" name="siteOEE" onChange={handleChange}/>
        <LabelledInputField placeholder={true} changeButtonState={changeButtonState} labelName="OEE - Performance % (optional)" 
         name="oeePerformance" onChange={handleChange} type="number" min="1" step="1" onKeyDown={(e)=>e.keyCode!==69}/>
         <LabelledInputField placeholder={true} changeButtonState={changeButtonState} labelName="OEE - Availability % (optional)" 
         name="oeeAvail" onChange={handleChange} type="number" min="1" step="1" onKeyDown={(e)=>e.keyCode!==69}/>
         <LabelledInputField placeholder={true} changeButtonState={changeButtonState} labelName="OEE - Quality % (optional)" 
         name="oeeQuality" onChange={handleChange} type="number" min="1" step="1" onKeyDown={(e)=>e.keyCode!==69}/>
        </div>
        </div>
    )
}


function firstForm(props,handleChange,changeButtonState){
    return(
        <div className = "team-info-container">
        <div className="team-info">
        <LabelledInputField placeholder={true} changeButtonState={changeButtonState} required={true} labelName="Location*" name="location" onChange={handleChange}/>
        <LabelledInputField placeholder={true} changeButtonState={changeButtonState} required={true} labelName="Primary POC*" name="primaryPOC" onChange={handleChange}/>
        <LabelledInputField placeholder={true} changeButtonState={changeButtonState} required={true} labelName="Primary POC Role*" name="primaryPOCRole" onChange={handleChange}/>
        </div>
        </div>
    )
}

function thirdForm(props,state){
    return(
        <div className = "client-info-container">
        <div className="title">Business Function Point of Contact</div>
        <div className="client-info">
        <LabelledInputField placeholder={true}  labelName="Operations" />
        <LabelledInputField placeholder={true}  labelName="Quality" />
        <LabelledInputField placeholder={true}  labelName="Information Technology" />
        <LabelledInputField placeholder={true}  labelName="Procurement &amp; Supplier Management" />
        <LabelledInputField placeholder={true}  labelName="Continuous Improvement" />
        <LabelledInputField placeholder={true}  labelName="Replenishment &amp; Material Management" />
        <LabelledInputField placeholder={true}  labelName="Maintenance" />
        <LabelledInputField placeholder={true}  labelName="Planning &amp; Scheduling" />
        <LabelledInputField placeholder={true}  labelName="Human Resources" />
        <LabelledInputField placeholder={true}  labelName="Engineering &amp; R&amp;D" />
        </div>
        </div>
    )
}

class SiteInfo extends React.Component {
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
             <div className='site-info-container'>
             <form id="site-info-form" onSubmit={this.handleSubmit}>
                {firstForm(this.props,this.handleChange,this.setNextStepState)}
                <div className="border-bottom"></div>
                {secondForm(this.props,this.handleChange,this.setNextStepState)}
                <div className="border-bottom"></div>
                {thirdForm(this.props,this.state)}
             </form>
             </div>
         )
    }
}

export default SiteInfo;