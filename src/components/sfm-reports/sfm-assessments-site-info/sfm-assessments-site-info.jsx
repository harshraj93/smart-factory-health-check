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
        this.props.disableMenu(false);
    }

    handleChange = async (e)=>{
        let name = e.target.name;
        await this.setState({
            [name]:e.target.value
        })
    }

    fetchSiteInfo = async()=> {
        // console.log(this.props.data);
        apiPostHeader.body = JSON.stringify(this.props.data);
        try{
        const response = await fetch(siteInfoApi.siteInfo,apiPostHeader)
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
            jsonData:siteInfoData.resultantJSON,
            BusinessFunctionPoC: siteInfoData.resultantJSON.BusinessFunctionPoC,
            dropdown: siteInfoData.resultantJSON.manufactureArchList
        })
    }

    onChange=  (e)=>{
        let name = e.target.name;
         this.setState({
            [name]:e.target.data
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

    saveForm() {
        // console.log(this.state.primaryPoc);
    }

    render() {
        return(
            <div className="site-info-container">
            <div className="team-info-container">
            <div className="team-info">
            <LabelledInputField placeholder={false} name="location" labelName="Location" data={this.state.jsonData.sitename} readOnly={true}/>
            <LabelledInputField placeholder={false} name="primaryPoc" labelName="Primary POC" data={this.state.jsonData.primarysitepocname} readOnly={false}/>
            <LabelledInputField placeholder={false} name="primaryPocRole" labelName="Primary POC Role" data={this.state.jsonData.primarysitepocrole} readOnly={false}/>
            </div>
            </div>
            <div className="border-bottom"></div>
            <div className="mid-container">
            <div className="client-info">
                <LabelledInputField placeholder={false} name="sector" labelName="Sector" data={this.state.jsonData.sector} readOnly={true}/>
                {/* <DropDownMenu placeholder={false} data={this.getdata()} name="manufacturingArchtype" onChange={this.handleChange} value={(this.state.dropdown!==undefined?this.state.dropdown:"-")}/> */}
                <LabelledInputField placeholder={false} name="manuArchtype" labelName="Manufacturing Archetype" data={this.state.jsonData.manufacturearchtype} readOnly={false}/>
                <LabelledInputField placeholder={false} name="noShifts" labelName="# of Shifts" data={this.state.jsonData.totalshifts} readOnly={false}/>
                <LabelledInputField placeholder={false} name="noEmps" labelName="# Employees" data={this.state.jsonData.totalemployees} readOnly={false}/>
                <LabelledInputField placeholder={false} name="noAssets" labelName="# of Assets" data={this.state.jsonData.totalproductionassets} readOnly={false}/>
                <LabelledInputField placeholder={false} name="siteRevenue" labelName="Site Revenue" data={this.state.jsonData.siterevenue} readOnly={false}/>
                <LabelledInputField placeholder={false} name="epitda" labelName="Site EPITDA (optional)" data={this.state.jsonData.siteebitda} readOnly={false}/>
                <LabelledInputField placeholder={false} name="otif" labelName="OTIF % (optional)" data={this.state.jsonData.otif} readOnly={false}/>
                <LabelledInputField placeholder={false} name="oeeSite" labelName="Site OEE (optional)" data={this.state.jsonData.overalloee} readOnly={false}/>
                <LabelledInputField placeholder={false} name="oeePerf" labelName="OEE - Performance % (optional)" data={this.state.jsonData.performanceoee} readOnly={false}/>
                <LabelledInputField placeholder={false} name="oeeAvail" labelName="OEE - Availability % (optional)" data={this.state.jsonData.availabilityoee} readOnly={false}/>
                <LabelledInputField placeholder={false} name="oeeQuality" labelName="OEE - Quality % (optional)" data={this.state.jsonData.qualityoee} readOnly={false}/>
                </div>
            </div>
            <div className="border-bottom"></div>
            <div className="mid-container">
                <div className="title">Business Function Point of Contact</div>
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
            </div>

            <div className="submit">
                    <FormNavigationButton buttonStatus={this.state.enableButton} labelName="Save" onClick={this.saveForm}/>
            </div>
            
            </div>
        )
    }
}

export default SiteInfo;