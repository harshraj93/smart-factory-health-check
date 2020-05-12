import React from 'react';
import LabelledInputField from '../../../assets/input-field';
import DropDownMenu from '../../../assets/drop-down-input-box';
import {FormNavigationButton} from '../../../assets/sfm-button'
import siteInfoApi from '../../../api/assessments/assess-siteInfo';
import {apiPostHeader} from '../../../api/main/mainapistorage';
import './sfm-assessments-site-info.scss';

let requiredFieldNames=["location", "primaryPoc", "primaryPocRole", "sector", "manuArchtype","informationtechnology", "continuousimprovement", "replenishmentmaterialmanagement", "operations", "quality", "maintenance", "procurementsuppliermanagement", "planningscheduling"];
let bizFuncPoc = [];

class SiteInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            enableButton: "true",
            jsonData: {},
            BusinessFunctionPoC: [],
            dropdown: []
        }
        // this.props.disableMenu(false);
    }

    handleChange = async (e)=>{
        let name = e.target.name;
        await this.setState({
            [name]:e.target.value
        })
    }

    // fetchSiteInfo = async()=> {
        
    //     apiPostHeader.body = JSON.stringify(this.props.data);
    //     try{
    //     const response = await fetch(siteInfoApi.siteInfo,apiPostHeader)
    //     const siteInfoData = await response.json();
    //     return siteInfoData;
    //     }
    //     catch(err){
    //         return err
    //     }
    // }

    // componentDidMount = async()=> {
    //     let siteInfoData = await this.fetchSiteInfo();
    //     await this.setState({
    //         jsonData:siteInfoData.resultantJSON,
    //         // BusinessFunctionPoC: siteInfoData.resultantJSON.BusinessFunctionPoC,
    //         // dropdown: siteInfoData.resultantJSON.manufactureArchList
    //     })
    // }

    variableName(value) {
        var arr = value.split(" ");
        // console.log(arr);
        var name = "";
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] !== "&") {
                name += arr[i].toLowerCase();
            }
        }
        return name;
    }

    onChange=  (e)=>{
        let name = e.target.name;
         this.setState({
            [name]:e.target.value
        })
        // this.checkRequiredFields();
        this.setState({
            enableButton:true
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
        console.log(boolFlag,cnt,requiredFieldNames.length);
        if(boolFlag){
            this.setState({
            enableButton:true
        })
        }
    }  

    getdata() {
        let data = {
            labelName: "Manufacturing Archetype",
            dropDownData: this.state.dropdown
        }
        return data;
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        this.saveForm();
        this.setState({
            enableButton: false
        })
    }

    addBFP() {
        bizFuncPoc.map((data, index)=>{
            let obj = {};
            obj.businessFunction = data.BusinessFunction;
            obj.businessFunctionId = data.BusinessFunctionId;
            // obj.resourceName = this.state[this.variableName(data.BusinessFunction)]?this.state[this.variableName(data.BusinessFunction)]:data.ResourceName;
        });
    }

    componentDidMount = () => {
        // this.props.data.BusinessFunctionPoC.forEach((data, index) => {
        //     bizFuncPoc.push(data.ResourceName);
        // })
        // console.log(bizFuncPoc)
        bizFuncPoc = this.props.data.BusinessFunctionPoC;
         console.log('bizFuncPoc',bizFuncPoc)
    }

    saveForm = async() => {
        let siteInfoJSON=  {
            "siteDetails": {
                "siteId": this.props.data.siteId,
                "clientName" : this.props.data.clientName,
                "siteName":this.state.location?this.state.location:this.props.data.sitename,
                "sector":this.props.data.sector,
                "primarySitePocName":this.state.primaryPoc?this.state.primaryPoc:this.props.data.primarysitepocname,
                "primarySitePocRole": this.state.primaryPocRole?this.state.primaryPocRole:this.props.data.primarysitepocrole,
                "manufactureArchType":this.state.manuArchtype?this.state.manuArchtype:this.props.data.manufacturearchtype,
                "totalEmployees":Number(this.state.noEmps)>=0?Number(this.state.noEmps):this.props.data.totalemployees,
                "totalProductionAssets":Number(this.state.noAssets)>=0?Number(this.state.noAssets):this.props.data.totalproductionassets,
                "totalShifts":Number(this.state.noShifts)>=0?Number(this.state.noShifts):this.props.data.totalshifts,
                "siteebitda":Number(this.state.epitda)>=0?Number(this.state.epitda):this.props.data.siteebitda,
                "overalloee":Number(this.state.oeeSite)>=0?Number(this.state.oeeSite):this.props.data.overalloee,
                "performanceoee":Number(this.state.oeePerf)>=0?Number(this.state.oeePerf):this.props.data.performanceoee,
                "availabilityoee":Number(this.state.oeeAvail)>=0?Number(this.state.oeeAvail):this.props.data.availabilityoee,
                "qualityoee":Number(this.state.oeeQuality)>=0?Number(this.state.oeeQuality):this.props.data.qualityoee,
                "otif":Number(this.state.otif)>=0?Number(this.state.otif):this.props.data.otif,
                "siteRevenue":Number(this.state.siteRevenue)>=0?Number(this.state.siteRevenue):this.props.data.siterevenue,
            },
            "businessFunctionPoC":[
                {
                    "businessFunction":"Continuous Improvement",
                    "resourceName":this.state.continuousimprovement?this.state.continuousimprovement:bizFuncPoc[0],
                },
                {
                    "businessFunction":"Information Technology",
                    "resourceName":this.state.informationtechnology?this.state.informationtechnology:bizFuncPoc[1],
                },
                {
                    "businessFunction":"Replenishment & Material Management",
                    "resourceName":this.state.replenishmentmaterialmanagement?this.state.replenishmentmaterialmanagement:bizFuncPoc[2],
                },
                {
                    "businessFunction":"Operations",
                    "resourceName":this.state.operations?this.state.operations:bizFuncPoc[3],
                },
                {
                    "businessFunction":"Quality",
                    "resourceName":this.state.quality?this.state.quality:bizFuncPoc[4],
                },
                {
                    "businessFunction":"Maintenance",
                    "resourceName":this.state.maintenance?this.state.maintenance:bizFuncPoc[5],
                },
                {
                    "businessFunction":"Procurement & Supplier Management",
                    "resourceName":this.state.procurementsuppliermanagement?this.state.procurementsuppliermanagement:bizFuncPoc[6],
                },
                {
                    "businessFunction":"Planning & Scheduling",
                    "resourceName":this.state.planningscheduling?this.state.planningscheduling:bizFuncPoc[7],
                },
            ]
        }

        // console.log(siteInfoJSON);

        apiPostHeader.body = JSON.stringify(siteInfoJSON);
        try{
            const response = await fetch(siteInfoApi.siteInfoEdit,apiPostHeader)
            const message = await response.json();
            return message;
        }
        catch(err){
            return err
        }
    }

    render() {
        return(
            <div className="site-info-container">
                <form id="add-client-form" onSubmit={this.handleSubmit}>
                    <div className="team-info-container">
                        <div className="team-info">
                            <LabelledInputField placeholder={false} name="location" labelName="Location*" data={this.props.data.sitename} readOnly={false} onChange={this.onChange}/>  {/**changeButtonState={this.changeButtonState}*/}
                            <LabelledInputField placeholder={false} name="primaryPoc" labelName="Primary POC*" data={this.props.data.primarysitepocname} readOnly={false} onChange={this.onChange}/>
                            <LabelledInputField placeholder={false} name="primaryPocRole" labelName="Primary POC Role*" data={this.props.data.primarysitepocrole} readOnly={false} onChange={this.onChange}/>
                        </div>
                    </div>
                    <div className="border-bottom"></div>
                    <div className="mid-container">
                        <div className="client-info">
                            <LabelledInputField placeholder={false} name="sector" labelName="Sector*" data={this.props.data.sector} readOnly={true}/>
                            <DropDownMenu placeholder="Manufacturing Archetype*" data={this.props.data.manufactureArchList} labelName="" name="manuArchtype" onChange={this.handleChange} value={(this.props.data.manufacturearchtype!==undefined?this.props.data.manufacturearchtype:"-")}/>
                            {/* <LabelledInputField placeholder={false} name="manuArchtype" labelName="Manufacturing Archetype*" data={this.props.data.manufacturearchtype} readOnly={false} onChange={this.onChange}/> */}
                            <LabelledInputField placeholder={false} name="noShifts" labelName="# of Shifts" data={this.props.data.totalshifts} readOnly={false} onChange={this.onChange}/>
                            <LabelledInputField placeholder={false} name="noEmps" labelName="# Employees" data={this.props.data.totalemployees} readOnly={false} onChange={this.onChange}/>
                            <LabelledInputField placeholder={false} name="noAssets" labelName="# of Assets" data={this.props.data.totalproductionassets} readOnly={false} onChange={this.onChange}/>
                            <LabelledInputField placeholder={false} name="siteRevenue" labelName="Site Revenue" data={this.props.data.siterevenue} readOnly={false} onChange={this.onChange}/>
                            <LabelledInputField placeholder={false} name="epitda" labelName="Site EPITDA (optional)" data={this.props.data.siteebitda} readOnly={false} onChange={this.onChange}/>
                            <LabelledInputField placeholder={false} name="otif" labelName="OTIF % (optional)" data={this.props.data.otif} readOnly={false} onChange={this.onChange}/>
                            <LabelledInputField placeholder={false} name="oeeSite" labelName="Site OEE (optional)" data={this.props.data.overalloee} readOnly={false} onChange={this.onChange}/>
                            <LabelledInputField placeholder={false} name="oeePerf" labelName="OEE - Performance % (optional)" data={this.props.data.performanceoee} readOnly={false} onChange={this.onChange}/>
                            <LabelledInputField placeholder={false} name="oeeAvail" labelName="OEE - Availability % (optional)" data={this.props.data.availabilityoee} readOnly={false} onChange={this.onChange}/>
                            <LabelledInputField placeholder={false} name="oeeQuality" labelName="OEE - Quality % (optional)" data={this.props.data.qualityoee} readOnly={false} onChange={this.onChange}/>
                        </div>
                    </div>
                    <div className="border-bottom"></div>
                    <div className="mid-container">
                        <div className="title">Business Function Point of Contact</div>
                        <div className="client-info">
                            {this.props.data.BusinessFunctionPoC.map((data,index) => {

                                return (
                                    <LabelledInputField placeholder={false} name={this.variableName(data.BusinessFunction)} labelName={data.BusinessFunction} data={data.ResourceName!==null&&data.ResourceName!=="null"?data.ResourceName:""} required={false} readOnly={false} onChange={this.onChange}/>
                                )
                            })}
                        </div>
                    </div>

                    <div className="submit">
                        <FormNavigationButton buttonStatus={this.state.enableButton} labelName="Save" onClick={this.saveForm}/>
                    </div>
                </form>
            </div>
        )
    }
}

export default SiteInfo;