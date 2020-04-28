import React from 'react';
import LabelledInputField from '../../../assets/input-field';
import DropDownMenu from '../../../assets/drop-down-input-box';
import {FormNavigationButton} from '../../../assets/sfm-button'
import siteInfoApi from '../../../api/assessments/assess-siteInfo';
import {apiPostHeader} from '../../../api/main/mainapistorage';
import './sfm-assessments-site-info.scss';

let requiredFieldNames=["Location", "Primary POC", "Primary POC Role", "Sector", "Manufacturing Archetype"];

class SiteInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            enableButton:"true",
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
        this.checkRequiredFields();
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
    }

    saveForm = async() => {
        let clientid;
        let siteInfoJSON=  {
            "siteInfo": {
                "clientName" : this.props.data.clientName,
                "siteName":this.props.data.sitename,
                "primarySitePocName":this.state.primaryPoc?this.state.primaryPoc:this.props.data.primarysitepocname,
                "primarySitePocRole": this.state.primaryPocRole?this.state.primaryPocRole:this.props.data.primarysitepocrole,
                "sector":this.props.data.sector,
                "manufactureArchType":this.state.manuArchtype?this.state.manuArchtype:this.props.data.manufacturearchtype,
                "totalShifts":Number(this.state.noShifts)?Number(this.state.noShifts):this.props.data.totalshifts,
                "totalEmployees":Number(this.state.noEmps)?Number(this.state.noEmps):this.props.data.totalemployees,
                "totalProductionAssets":Number(this.state.noAssets)?Number(this.state.noAssets):this.props.data.totalproductionassets,
                "siteRevenue":Number(this.state.siteRevenue)?Number(this.state.siteRevenue):this.props.data.siterevenue,
                "siteebitda":Number(this.state.epitda)?Number(this.state.epitda):this.props.data.siteebitda,
                "otif":Number(this.state.otif)?Number(this.state.otif):this.props.data.otif,
                "overalloee":Number(this.state.oeeSite)?Number(this.state.oeeSite):this.props.data.overalloee,
                "performanceoee":Number(this.state.oeePerf)?Number(this.state.oeePerf):this.props.data.performanceoee,
                "availabilityoee":Number(this.state.oeeAvail)?Number(this.state.oeeAvail):this.props.data.availabilityoee,
                "qualityoee":Number(this.state.oeeQuality)?Number(this.state.oeeQuality):this.props.data.qualityoee,
            },
            "businessFunctionPoC":[
                {
                    "businessFunction":"Operations",
                    "resourceName":this.state.operations?this.state.operations:null,
                },
                {
                    "businessFunction":"Quality",
                    "resourceName":this.state.quality?this.state.quality:null,
                },
                {
                    "businessFunction":"Information Technology",
                    "resourceName":this.state.informationtechnology?this.state.informationtechnology:null,
                },
                {
                    "businessFunction":"Continuous Improvement",
                    "resourceName":this.state.continuousimprovement?this.state.continuousimprovement:null,
                },
                {
                    "businessFunction":"Replenishment & Material Management",
                    "resourceName":this.state.replenishmentmaterialmanagement?this.state.replenishmentmaterialmanagement:null,
                },
                {
                    "businessFunction":"Maintenance",
                    "resourceName":this.state.maintenance?this.state.maintenance:null,
                },
                {
                    "businessFunction":"Procurement & Supplier Management",
                    "resourceName":this.state.procurementsuppliermanagement?this.state.procurementsuppliermanagement:null,
                },
                {
                    "businessFunction":"Planning & Scheduling",
                    "resourceName":this.state.planningscheduling?this.state.planningscheduling:null,
                },
            ]
        }

        console.log(siteInfoJSON);

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

    emptyField = () => {
        return (
            <div className="client-info">
                <LabelledInputField placeholder={false} name="operations" labelName="Operations" readOnly={false} onChange={this.onChange}/>
                <LabelledInputField placeholder={false} name="quality" labelName="Quality" readOnly={false} onChange={this.onChange}/>
                <LabelledInputField placeholder={false} name="it" labelName="Information Technology" readOnly={false} />
                <LabelledInputField placeholder={false} name="procurement" labelName="Procurement &amp; Supplier Management" readOnly={false} onChange={this.onChange} />
                <LabelledInputField placeholder={false} name="ci" labelName="Continuous Improvement" readOnly={false} onChange={this.onChange} />
                <LabelledInputField placeholder={false} name="replenishment" labelName="Replenishment &amp; Material Management" readOnly={false} onChange={this.onChange} />
                <LabelledInputField placeholder={false} name="maintenance" labelName="Maintenance" readOnly={false} onChange={this.onChange} />
                <LabelledInputField placeholder={false} name="planning" labelName="Planning &amp; Scheduling" readOnly={false} onChange={this.onChange} />
                <LabelledInputField placeholder={false} name="hr" labelName="Human Resources" readOnly={false} onChange={this.onChange} />
                <LabelledInputField placeholder={false} name="rnd" labelName="Engineering &amp; R&amp;D" readOnly={false} onChange={this.onChange} />
            </div>
        )
    }

    filledField = () => {
        return (
            <div className="client-info">
                <LabelledInputField placeholder={false} name="operations" labelName="Operations" readOnly={false} onChange={this.onChange}/>
                <LabelledInputField placeholder={false} name="quality" labelName="Quality" readOnly={false} onChange={this.onChange}/>
                <LabelledInputField placeholder={false} name="it" labelName="Information Technology" readOnly={false} />
                <LabelledInputField placeholder={false} name="procurement" labelName="Procurement &amp; Supplier Management" readOnly={false} onChange={this.onChange} />
                <LabelledInputField placeholder={false} name="ci" labelName="Continuous Improvement" readOnly={false} onChange={this.onChange} />
                <LabelledInputField placeholder={false} name="replenishment" labelName="Replenishment &amp; Material Management" readOnly={false} onChange={this.onChange} />
                <LabelledInputField placeholder={false} name="maintenance" labelName="Maintenance" readOnly={false} onChange={this.onChange} />
                <LabelledInputField placeholder={false} name="planning" labelName="Planning &amp; Scheduling" readOnly={false} onChange={this.onChange} />
                <LabelledInputField placeholder={false} name="hr" labelName="Human Resources" readOnly={false} onChange={this.onChange} />
                <LabelledInputField placeholder={false} name="rnd" labelName="Engineering &amp; R&amp;D" readOnly={false} onChange={this.onChange} />
            </div>
        )
    }

    render() {
        return(
            <div className="site-info-container">
                <form id="add-client-form" onSubmit={this.handleSubmit}>
                    <div className="team-info-container">
                        <div className="team-info">
                            <LabelledInputField placeholder={false} name="location" labelName="Location*" data={this.props.data.sitename} readOnly={true}/>  {/**changeButtonState={this.changeButtonState}*/}
                            <LabelledInputField placeholder={false} name="primaryPoc" labelName="Primary POC*" data={this.props.data.primarysitepocname} readOnly={false} onChange={this.onChange}/>
                            <LabelledInputField placeholder={false} name="primaryPocRole" labelName="Primary POC Role*" data={this.props.data.primarysitepocrole} readOnly={false} onChange={this.onChange}/>
                        </div>
                    </div>
                    <div className="border-bottom"></div>
                    <div className="mid-container">
                        <div className="client-info">
                            <LabelledInputField placeholder={false} name="sector" labelName="Sector*" data={this.props.data.sector} readOnly={true}/>
                            {/* <DropDownMenu placeholder={false} data={this.getdata()} name="manufacturingArchtype" onChange={this.handleChange} value={(this.state.dropdown!==undefined?this.state.dropdown:"-")}/> */}
                            <LabelledInputField placeholder={false} name="manuArchtype" labelName="Manufacturing Archetype*" data={this.props.data.manufacturearchtype} readOnly={false} onChange={this.onChange}/>
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
                                    <LabelledInputField placeholder={false} name={this.variableName(data.BusinessFunction)} labelName={data.BusinessFunction} data={data.ResourceName!==null?data.ResourceName:""} readOnly={false} onChange={this.onChange}/>
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