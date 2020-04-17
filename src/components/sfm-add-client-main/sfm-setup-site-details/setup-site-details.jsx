import React from 'react';
import Header from '../sfm-add-client-main'
import {withRouter} from 'react-router-dom';
import LabelledInputField from '../../../assets/input-field';
import DropDownMenu from '../../../assets/drop-down-input-box'
import {FormNavigationButton} from '../../../assets/sfm-button'
import {apiGetHeader} from '../../../api/main/mainapistorage';
import addclientapi from '../../../api/addclient/addclient';



let siteNumber=[];
let requiredFieldNames=[];


function siteHeader(props,enableButton){
    return(
        <div className="site-header-container">
            <span className="site-name">{props.location.state.clientName}</span>
         <FormNavigationButton labelName="Next Step" buttonStatus={enableButton}/>
        </div>
    )
}


class AddSiteDetails extends React.Component{
    constructor(props){
        super(props);
        this.state={
            enableButton:"false",
            manuArchetype:[],
            sectorData:[]
        }
        this.props.disableMenu(false)
    }


    setNextStepState = ()=>{
        this.setState({
            enableButton:"false"
        })
    }


    handleSubmit=(e)=>{
        e.preventDefault();
        let clientNameArray = []
        let clientNames=requiredFieldNames.filter(element=>{
            return element.includes("siteName")
        })
        clientNames.forEach(element=>{
            clientNameArray.push(this.state[element])
        })
        let dataForBusinessFunctions = {
            clientNames:clientNameArray
        }
        let sitedetailsJSON = this.triggerFormSubmission();
        console.log(sitedetailsJSON);
        this.props.history.push({
            pathname:'/addbusinessfunctions',
            state:{
                dataForBusinessFunctions:dataForBusinessFunctions,
                siteName:this.props.location.state.clientName,
                sitedetailsJSON:sitedetailsJSON
            }
        })
    }

    triggerFormSubmission = ()=>{
        let sitesJSON=[];
        let siteDetails={
            sites:[]
        };
        siteNumber.forEach((site,index)=>{
            let indexString=String(index)
            let siteDetailsJSON=
                    {
                        siteDetails:{
                            "sitename": this.state["siteName"+indexString],
                            "clientID": this.props.location.state.clientid,
                            "primaryPOC": this.state["primePoc"+indexString],
                            "primaryPOCRole": this.state["primPocRole"+indexString],
                            "sector": this.state["sector"+indexString],
                            "archetype": this.state["manfArch"+indexString],
                            "shifts": this.state["numShifts"+index],
                            "employees": this.state["numEmployees"+index],
                            "assets": this.state["numAssets"+index],
                            "siteRevenue": this.state["SiteRevenue"+index],
                            "ebitda": this.state["SiteEBI"+index],
                            "otif": this.state["SiteOTIF"+index],
                            "siteOEE": this.state["SiteOEE"+index],
                            "performanceOEE": this.state["percentSiteOEE"+index],
                            "availabilityOEE": this.state["percentAvailable"+index],
                            "qualityOEE": this.state["percentQuality"+index]
                        }
                    }
                
            
            sitesJSON.push(siteDetailsJSON);
            siteDetailsJSON={};
        })
        siteDetails.sites=sitesJSON;
        return siteDetails;
    }


    handleChange = async(e)=>{

        let name = e.target.name;
        await this.setState({
            [name]:e.target.value
        })
        this.checkRequiredFields();
        
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
            enableButton:"true"
        })
        }
    }


    siteInfoForm =(siteNumber,index)=>{
        return(
            <>
        <div className="site-form-modal" key={index}>
        
        <div className="site-number">{siteNumber}</div>
        
        <div className="modal-container">
        <div className="required">* Required field</div>
        <div className="site-form">
       
        <LabelledInputField placeholder={true} onChange={this.handleChange} changeButtonState={this.setNextStepState} name={"siteName"+index} required={true} labelName="Site Name*" siteNumber={index}/>
        <LabelledInputField placeholder={true} onChange={this.handleChange} changeButtonState={this.setNextStepState} name={"primePoc"+index} required={true} labelName="Primary POC*" siteNumber={index}/>
        <LabelledInputField placeholder={true} onChange={this.handleChange} changeButtonState={this.setNextStepState} name={"primPocRole"+index} required={true} labelName="Primary POC Role*" siteNumber={index} />
        <div className="bottom-border"></div>
        <div className="bottom-border"></div>
        <div className="bottom-border"></div>
        <DropDownMenu placeholder="Manufacturing Archetype*" required={true}  data={this.state.manuArchetype} name={"manfArch"+index} onChange={this.handleChange}/>
        <DropDownMenu placeholder="Sector*"  data={this.state.sectorData} required={true} name={"sector"+index} onChange={this.handleChange}/>
        <LabelledInputField placeholder={true} labelName="# of Shifts (optional)" type="number" min="1" changeButtonState={this.setNextStepState} onChange={this.handleChange} name={"numShifts"+index}/>
        <LabelledInputField placeholder={true} labelName="# Employees (optional)" type="number" min="1" changeButtonState={this.setNextStepState} onChange={this.handleChange} name={"numEmployees"+index}/>
        <LabelledInputField placeholder={true} labelName="# of Assets (optional)" type="number" min="1" changeButtonState={this.setNextStepState} onChange={this.handleChange} name={"numAssets"+index}/>
        <LabelledInputField placeholder={true} labelName="Site Revenue(optional)" type="number" min="1" changeButtonState={this.setNextStepState} onChange={this.handleChange} name={"SiteRevenue"+index}/>
        <LabelledInputField placeholder={true} labelName="Site EBITDA (optional)" type="number" min="1" changeButtonState={this.setNextStepState} onChange={this.handleChange} name={"SiteEBI"+index}/>
        <LabelledInputField placeholder={true} labelName="OTIF % (optional)" type="number" min="1" changeButtonState={this.setNextStepState} onChange={this.handleChange} name={"SiteOTIF"+index}/>
        <LabelledInputField placeholder={true} labelName="Site OEE (optional)" type="number" min="1" changeButtonState={this.setNextStepState} onChange={this.handleChange} name={"SiteOEE"+index}/>
        <LabelledInputField placeholder={true} labelName="OEE - Performance % (optional)" type="number" min="1" changeButtonState={this.setNextStepState} onChange={this.handleChange} name={"percentSiteOEE"+index}/>
        <LabelledInputField placeholder={true} labelName="OEE - Availability % (optional)" type="number" min="1" changeButtonState={this.setNextStepState} onChange={this.handleChange} name={"percentAvailable"+index}/>
        <LabelledInputField placeholder={true} labelName="OEE - Quality % (optional)" type="number" min="1" changeButtonState={this.setNextStepState} onChange={this.handleChange} name={"percentQuality"+index}/>
        
        </div>
        </div>
        </div>
        <div className="border-bottom"></div>
        </>
        )
    }   


    getSectorandManufactureTypeDetails = ()=>{
        fetch(addclientapi.sectorList+`?industry=${this.props.location.state.industry}`,apiGetHeader)
            .then(resp=>resp.json())
            .then(resp=>this.setState({sectorData:resp.resultantJSON}))
            .catch(err=>console.log(err))
        
        fetch(addclientapi.manufactureTypeList,apiGetHeader)
            .then(resp=>resp.json())
            .then(resp=>this.setState({manuArchetype:resp.resultantJSON}))
            .catch(err=>console.log(err))
    }


    componentDidMount = ()=>{
        requiredFieldNames=[]
        siteNumber = this.evaluateSiteNumber();
        this.getSectorandManufactureTypeDetails();
    }


    evaluateSiteNumber = ()=>{
        let siteNumArray=[];
        let siteNum = this.props.location.state.sites;
        for(let i=1;i<=siteNum;i++){
            siteNumArray.push("Site "+i);
            requiredFieldNames.push("primePoc"+String(i-1));
            requiredFieldNames.push("siteName"+String(i-1));
            requiredFieldNames.push("primPocRole"+String(i-1));
            requiredFieldNames.push("manfArch"+String(i-1));
            requiredFieldNames.push("sector"+String(i-1));
        }
        return siteNumArray
    }



    render(){
         return(
             <div className="setup-site-details">
            <Header title="Enter site details" handleSubmit={this.handleSubmit} props={this.props}/>
            <form id="setup-site-details" onSubmit={this.handleSubmit}>
            {siteHeader(this.props,this.state.enableButton)}
            {siteNumber.map((number,index)=>{
                return (
                    
                    this.siteInfoForm(number,index)
                    
                )
                })}
           
           <FormNavigationButton labelName="Next Step" buttonStatus={this.state.enableButton} type="submit"/>
           </form>
            
            </div>
         )
    }
}

export default withRouter(AddSiteDetails)