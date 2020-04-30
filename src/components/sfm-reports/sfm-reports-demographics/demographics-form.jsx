import React from 'react';
import LabelledInputField from '../../../assets/input-field';


export default function DemographicsForm(props){
    let jsonData = props.formData.resultantJSON.demographicDetails;
    let pocDetails = props.formData.resultantJSON.pocDetails;
    return(
        <>
        <div className="demographics-form">
       
        <LabelledInputField placeholder={true} labelName="Location" data={jsonData.sitename} readOnly={true}/>
        <LabelledInputField placeholder={true} labelName="Primary POC" data={jsonData.primarysitepocname} readOnly={true}/>
        <LabelledInputField placeholder={true} labelName="Primary POC Role" data={jsonData.primarysitepocrole} readOnly={true}/>
        <LabelledInputField placeholder={true} labelName="Manufacturing Archetype" data={jsonData.manufacturearchtype} readOnly={true}/>
        <LabelledInputField placeholder={true} labelName="Sectors" data={jsonData.sector} readOnly={true}/>
        <LabelledInputField placeholder={true} labelName="# of shifts" data={jsonData.totalshifts} readOnly={true}/>
        <LabelledInputField placeholder={true} labelName="# Employees" data={jsonData.totalemployees} readOnly={true}/>
        <LabelledInputField placeholder={true} labelName="# of production assets" data={jsonData.totalproductionassets} readOnly={true}/>
        <LabelledInputField placeholder={true} labelName="site revenue" data={jsonData.siterevenue} readOnly={true}/>
        <LabelledInputField placeholder={true} labelName="Site EPITDA (optional)" data={jsonData.siteebitda} readOnly={true}/>
        <LabelledInputField placeholder={true} labelName="OTIF % (optional)" data={jsonData.otif} readOnly={true}/>
        <LabelledInputField placeholder={true} labelName="Site OEE (optional)" data={jsonData.overalloee} readOnly={true}/>
        <LabelledInputField placeholder={true} labelName="OEE - Performance % (optional)" data={jsonData.performanceoee} readOnly={true}/>
        <LabelledInputField placeholder={true} labelName="OEE - Availability % (optional)" data={jsonData.availabilityoee} readOnly={true}/>
        <LabelledInputField placeholder={true} labelName="OEE - Quality % (optional)" data={jsonData.qualityoee} readOnly={true}/>
        
        </div>
        <div className="bottom-border"></div>
        <div className="title-name-demographics">Business Function Point of Contact</div>
        <div className="business-poc-demographics">
        <LabelledInputField placeholder={true} labelName="Operations" />
        <LabelledInputField placeholder={true} labelName="Quality" />
        <LabelledInputField placeholder={true} labelName="Information Technology" />
        <LabelledInputField placeholder={true} labelName="Procurement & Supplier Management" />
        <LabelledInputField placeholder={true} labelName="Continuous Improvement" />
        <LabelledInputField placeholder={true} labelName="Replenishment & Material Management"/>
        <LabelledInputField placeholder={true} labelName="Maintenance"/>
        <LabelledInputField placeholder={true} labelName="Planning & Scheduling"/>
        <LabelledInputField placeholder={true} labelName="Human Resources" />
        <LabelledInputField placeholder={true} labelName="Engineering & R&D"/>
        </div>
        </>
    )
}