import React from 'react';
import LabelledInputField from '../../../assets/input-field';
import siteInfoApi from '../../../api/assessments/assess-siteInfo';
import {apiPostHeader} from '../../../api/main/mainapistorage';
import './sfm-assessments-site-info.scss';

// let bfplist=["Operations","Quality","Information Technology","Procurement &amp; Supplier Management","Continuous Improvement","Replenishment &amp; Material Management","Maintenance","Planning &amp; Scheduling","Human Resources","Engineering &amp; R&amp;D"];

class SiteInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            enableButton:"false",
            jsonData: {},
            BusinessFunctionPoC: []
        }
        this.props.disableMenu(false);
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
            BusinessFunctionPoC: siteInfoData.resultantJSON.BusinessFunctionPoC
        })
    }

    render() {
        return(
            <div className="site-info-container">
            <div className="team-info-container">
            <div className="team-info">
            <LabelledInputField placeholder={false} labelName="Location" data={this.state.jsonData.sitename} readOnly={true}/>
            <LabelledInputField placeholder={false} labelName="Primary POC" data={this.state.jsonData.primarysitepocname} readOnly={true}/>
            <LabelledInputField placeholder={false} labelName="Primary POC Role" data={this.state.jsonData.primarysitepocrole} readOnly={true}/>
            </div>
            </div>
            <div className="border-bottom"></div>
            <div className="mid-container">
            <div className="client-info">
                <LabelledInputField placeholder={false} labelName="Sector" data={this.state.jsonData.sector} readOnly={true}/>
                <LabelledInputField placeholder={false} labelName="Manufacturing Archetype" data={this.state.jsonData.manufacturearchtype} readOnly={true}/>
                <LabelledInputField placeholder={false} labelName="# of Shifts" data={this.state.jsonData.totalshifts} readOnly={true}/>
                <LabelledInputField placeholder={false} labelName="# Employees" data={this.state.jsonData.totalemployees} readOnly={true}/>
                <LabelledInputField placeholder={false} labelName="# of Assets" data={this.state.jsonData.totalproductionassets} readOnly={true}/>
                <LabelledInputField placeholder={false} labelName="Site Revenue" data={this.state.jsonData.siterevenue} readOnly={true}/>
                <LabelledInputField placeholder={true} labelName="Site EPITDA (optional)" data={this.state.jsonData.siteebitda} readOnly={true}/>
                <LabelledInputField placeholder={true} labelName="OTIF % (optional)" data={this.state.jsonData.otif} readOnly={true}/>
                <LabelledInputField placeholder={true} labelName="Site OEE (optional)" data={this.state.jsonData.overalloee} readOnly={true}/>
                <LabelledInputField placeholder={true} labelName="OEE - Performance % (optional)" data={this.state.jsonData.performanceoee} readOnly={true}/>
                <LabelledInputField placeholder={true} labelName="OEE - Availability % (optional)" data={this.state.jsonData.availabilityoee} readOnly={true}/>
                <LabelledInputField placeholder={true} labelName="OEE - Quality % (optional)" data={this.state.jsonData.qualityoee} readOnly={true}/>
                </div>
            </div>
            <div className="border-bottom"></div>
            <div className="mid-container">
                <div className="title">Business Function Point of Contact</div>
                <div className="client-info">
                    {/* {this.state.BusinessFunctionPoC.map((data,index)=>{
                        return(
                            <LabelledInputField placeholder={false} labelName={bfplist[index]} data={data.ResourceName} readOnly={true}/>
                        )
                    }) } */}
                <LabelledInputField placeholder={false}  labelName="Operations" readOnly={false} />
                <LabelledInputField placeholder={false}  labelName="Quality" readOnly={false} />
                <LabelledInputField placeholder={false}  labelName="Information Technology" readOnly={false} />
                <LabelledInputField placeholder={false}  labelName="Procurement &amp; Supplier Management" readOnly={false} />
                <LabelledInputField placeholder={false}  labelName="Continuous Improvement" readOnly={false} />
                <LabelledInputField placeholder={false}  labelName="Replenishment &amp; Material Management" readOnly={false} />
                <LabelledInputField placeholder={false}  labelName="Maintenance" readOnly={false} />
                <LabelledInputField placeholder={false}  labelName="Planning &amp; Scheduling" readOnly={false} />
                <LabelledInputField placeholder={false}  labelName="Human Resources" readOnly={false} />
                <LabelledInputField placeholder={false}  labelName="Engineering &amp; R&amp;D" readOnly={false} />
                </div>
            </div>
            
            </div>
        )
    }
}

export default SiteInfo;