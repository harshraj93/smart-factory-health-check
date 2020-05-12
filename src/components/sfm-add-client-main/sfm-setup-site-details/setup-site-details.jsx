import React from 'react';
import Header from '../sfm-add-client-main'
import {withRouter} from 'react-router-dom';
import LabelledInputField from '../../../assets/input-field';
import DropDownMenu from '../../../assets/drop-down-input-box'
import {FormNavigationButton} from '../../../assets/sfm-button'
import {apiGetHeader} from '../../../api/main/mainapistorage';
import addclientapi from '../../../api/addclient/addclient';
import FileUpload from '../../sfm-file-upload/file-upload';


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
        localStorage.setItem("addsitedata",JSON.stringify({sitedetailsJSON:sitedetailsJSON}))
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

        let name = e.currentTarget.getAttribute("name");
        e.target.value?await this.setState({
            [name]:e.target.value
        }):
        await this.setState({
            [name]:e.target.getAttribute("value")
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
            console.log(element,this.state[element])
        })
        if(boolFlag){
            this.setState({
            enableButton:"true"
        })
        }
    }


    setData = async(backData,index)=>{
       await this.setState({
            ["siteName"+index]: backData["sitename"],
            "clientID": this.props.location.state.clientid,
            ["primePoc"+index]: backData["primaryPOC"],
            ["primPocRole"+index]: backData["primaryPOCRole"],
            ["sector"+index]: backData["sector"],
            ["manfArch"+index]: backData["archetype"],
            ["numShifts"+index]: backData["shifts"],
            ["numEmployees"+index]: backData["employees"],
            ["numAssets"+index]: backData["assets"],
            ["SiteRevenue"+index]: backData["siteRevenue"],
            ["SiteEBI"+index]: backData["ebitda"],
            ["SiteOTIF"+index]: backData["otif"],
            ["SiteOEE"+index]: backData["siteOEE"],
            ["percentSiteOEE"+index]: backData["performanceOEE"],
            ["percentAvailable"+index]: backData["availabilityOEE"],
            ["percentQuality"+index]: backData["qualityOEE"]
        })
        this.checkRequiredFields();
        
    }

    siteInfoForm =(siteNumber,index,backData)=>{
        console.log(this.props.location)
        return(
            <>
        <div className="site-form-modal" key={index}>
        
        <div className="site-number">{siteNumber}</div>
        
        <div className="modal-container">
        <div className="required">* Required field</div>
        <div className="site-form">
        <LabelledInputField placeholder={true} data={backData?(backData["sitename"]):null} onChange={this.handleChange} changeButtonState={this.setNextStepState} name={"siteName"+index} required={true} labelName="Site Name*"/>
        <LabelledInputField placeholder={true} data={backData?(backData["primaryPOC"]):null} onChange={this.handleChange} changeButtonState={this.setNextStepState} name={"primePoc"+index} required={true} labelName="Primary POC*" />
        <LabelledInputField placeholder={true} data={backData?(backData["primaryPOCRole"]):null} onChange={this.handleChange} changeButtonState={this.setNextStepState} name={"primPocRole"+index} required={true} labelName="Primary POC Role*"  />
        {/* <div className="bottom-border"></div>
        <div className="bottom-border"></div>
        <div className="bottom-border"></div> */}
        <DropDownMenu placeholder= "Sector*" dropdownIndex={index} value={backData?(backData["sector"]):(this.props.location.state.industry?this.props.location.state.industry:this.state["sector"+index])}  data={this.state.sectorData} required={true} name={"sector"+index} onChange={this.handleChange}/>
        <DropDownMenu placeholder= "Manufacturing Archetype*" required={true} value={backData?(backData["archetype"]):this.state["manfArch"+index]} dropdownIndex={index+1} data={this.state.manuArchetype} name={"manfArch"+index} onChange={this.handleChange}/>
        <LabelledInputField placeholder={true} data={backData?(this.state["numShifts"+index]):null} labelName="# of Shifts (optional)" type="number" min="1" changeButtonState={this.setNextStepState} onChange={this.handleChange} name={"numShifts"+index}/>
        <LabelledInputField placeholder={true} data={backData?(backData["employees"]):null} labelName="# Employees (optional)" type="number" min="1" changeButtonState={this.setNextStepState} onChange={this.handleChange} name={"numEmployees"+index}/>
        <LabelledInputField placeholder={true} data={backData?(backData["assets"]):null} labelName="# of Assets (optional)" type="number" min="1" changeButtonState={this.setNextStepState} onChange={this.handleChange} name={"numAssets"+index}/>
        <LabelledInputField placeholder={true} data={backData?(backData["siteRevenue"]):null} labelName="Site Revenue (optional)" type="number" min="1" changeButtonState={this.setNextStepState} onChange={this.handleChange} name={"SiteRevenue"+index}/>
        <LabelledInputField placeholder={true} data={backData?(backData["ebitda"]):null} labelName="Site EBITDA (optional)" type="number" min="1" changeButtonState={this.setNextStepState} onChange={this.handleChange} name={"SiteEBI"+index}/>
        <LabelledInputField placeholder={true} data={backData?(backData["otif"]):null} labelName="OTIF % (optional)" type="number" min="1" changeButtonState={this.setNextStepState} onChange={this.handleChange} name={"SiteOTIF"+index}/>
        <LabelledInputField placeholder={true} data={backData?(backData["siteOEE"]):null} labelName="Site OEE (optional)" type="number" min="1" changeButtonState={this.setNextStepState} onChange={this.handleChange} name={"SiteOEE"+index}/>
        <LabelledInputField placeholder={true} data={backData?(backData["performanceOEE"]):null} labelName="OEE - Performance % (optional)" type="number" min="1" changeButtonState={this.setNextStepState} onChange={this.handleChange} name={"percentSiteOEE"+index}/>
        <LabelledInputField placeholder={true} data={backData?(backData["availabilityOEE"]):null} labelName="OEE - Availability % (optional)" type="number" min="1" changeButtonState={this.setNextStepState} onChange={this.handleChange} name={"percentAvailable"+index}/>
        <LabelledInputField placeholder={true} data={backData?(backData["qualityOEE"]):null} labelName="OEE - Quality % (optional)" type="number" min="1" changeButtonState={this.setNextStepState} onChange={this.handleChange} name={"percentQuality"+index}/>
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


    checkBackData = ()=>{
        let backData
        if(this.props.location.state.data){
            backData = this.props.location.state.data.sitedetailsJSON.sites;
            backData.forEach((site,index)=>{
                this.setData(site.siteDetails,index)
            })
            }
        else if(this.props.location.state.industry){
                siteNumber.forEach((number,index)=>{
                    console.log(index)
                    this.setState({
                        ["sector"+index]:this.props.location.state.industry
                    })
                })
                
            } 
            this.checkRequiredFields();
    }

    componentDidMount = ()=>{
        requiredFieldNames=[];
        siteNumber = this.evaluateSiteNumber();
        this.checkBackData();
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
            {this.props.location.state.page?<FileUpload />:""}
            {siteNumber.map((number,index)=>{
                let backData;
                if(this.props.location.state.data){
                    backData = this.props.location.state.data.sitedetailsJSON.sites[index].siteDetails;
                 }
                 else{
            backData = null;
                    }
                return (
                    
                    this.siteInfoForm(number,index,backData)
                    
                )
                })}
           
           <FormNavigationButton labelName="Next Step" buttonStatus={this.state.enableButton} type="submit"/>
           </form>
            
            </div>
         )
    }
}

export default withRouter(AddSiteDetails)