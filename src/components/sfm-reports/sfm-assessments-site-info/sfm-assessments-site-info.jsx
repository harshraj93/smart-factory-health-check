import React from 'react';
import LabelledInputField from '../../../assets/input-field';
import siteInfoApi from '../../../api/assessments/assess-siteInfo';
import {apiPostHeader} from '../../../api/main/mainapistorage';
import './sfm-assessments-site-info.scss';

let bfplist=["Operations","Quality","Information Technology","Procurement &amp; Supplier Management","Continuous Improvement","Replenishment &amp; Material Management","Maintenance","Planning &amp; Scheduling","Human Resources","Engineering &amp; R&amp;D"];

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
            <LabelledInputField placeholder={false} labelName="Location" data={this.state.jsonData.sitename}/>
            <LabelledInputField placeholder={false} labelName="Primary POC" data={this.state.jsonData.primarysitepocname}/>
            <LabelledInputField placeholder={false} labelName="Primary POC Role" data={this.state.jsonData.primarysitepocrole}/>
            </div>
            </div>
            <div className="border-bottom"></div>
            <div className="client-info-container">
            <div className="client-info">
                <LabelledInputField placeholder={false} labelName="Sector" data={this.state.jsonData.sector}/>
                <LabelledInputField placeholder={false} labelName="Manufacturing Archetype" data={this.state.jsonData.manufacturearchtype}/>
                <LabelledInputField placeholder={false} labelName="# of Shifts" data={this.state.jsonData.totalshifts}/>
                <LabelledInputField placeholder={false} labelName="# Employees" data={this.state.jsonData.totalemployees}/>
                <LabelledInputField placeholder={false} labelName="# of Assets" data={this.state.jsonData.totalproductionassets}/>
                <LabelledInputField placeholder={false} labelName="Site Revenue" data={this.state.jsonData.siterevenue}/>
                <LabelledInputField placeholder={true} labelName="Site EPITDA (optional)" data={this.state.jsonData.siteebitda}/>
                <LabelledInputField placeholder={true} labelName="OTIF % (optional)" data={this.state.jsonData.otif}/>
                <LabelledInputField placeholder={true} labelName="Site OEE (optional)" data={this.state.jsonData.overalloee}/>
                <LabelledInputField placeholder={true} labelName="OEE - Performance % (optional)" data={this.state.jsonData.performanceoee}/>
                <LabelledInputField placeholder={true} labelName="OEE - Availability % (optional)" data={this.state.jsonData.availabilityoee}/>
                <LabelledInputField placeholder={true} labelName="OEE - Quality % (optional)" data={this.state.jsonData.qualityoee}/>
                </div>
            </div>
            <div className="border-bottom"></div>
            <div className="client-info-container">
                <div className="title">Business Function Point of Contact</div>
                <div className="client-info">
                    {this.state.BusinessFunctionPoC.map((data,index)=>{
                        return(
                            <LabelledInputField placeholder={false} labelName={bfplist[index]} data={data.ResourceName} />
                        )
                    }) }
                {/* <LabelledInputField placeholder={true}  labelName="Operations" data={this.state.BusinessFunctionPoC[0].ResourceName} />
                <LabelledInputField placeholder={true}  labelName="Quality" data={this.state.jsonData.BusinessFunctionPoC[1].ResourceName} />
                <LabelledInputField placeholder={true}  labelName="Information Technology" data={this.state.jsonData.BusinessFunctionPoC[2].ResourceName} />
                <LabelledInputField placeholder={true}  labelName="Procurement &amp; Supplier Management" data={this.state.jsonData.BusinessFunctionPoC[3].ResourceName} />
                <LabelledInputField placeholder={true}  labelName="Continuous Improvement" data={this.state.jsonData.BusinessFunctionPoC[4].ResourceName} />
                <LabelledInputField placeholder={true}  labelName="Replenishment &amp; Material Management" data={this.state.jsonData.BusinessFunctionPoC[5].ResourceName} />
                <LabelledInputField placeholder={true}  labelName="Maintenance" data={this.state.jsonData.BusinessFunctionPoC[6].ResourceName} />
                <LabelledInputField placeholder={true}  labelName="Planning &amp; Scheduling" data={this.state.jsonData.BusinessFunctionPoC[7].ResourceName} />
                <LabelledInputField placeholder={true}  labelName="Human Resources" data={this.state.jsonData.BusinessFunctionPoC[8].ResourceName} />
                <LabelledInputField placeholder={true}  labelName="Engineering &amp; R&amp;D" data={this.state.jsonData.BusinessFunctionPoC[9].ResourceName} /> */}
                </div>
            </div>
            
            </div>
        )
    }
}

export default SiteInfo;