import React from 'react';
import LabelledInputField from '../../../assets/input-field';


export default function DemographicsForm(props){
    let jsonData = props.formData.resultantJSON;
    return(
        <div className="demographics-form">
       
        <LabelledInputField placeholder={false} labelName="Location" data={jsonData.sitename}/>
        <LabelledInputField placeholder={false} labelName="Primary POC" data={jsonData.primarysitepocname}/>
        <LabelledInputField placeholder={false} labelName="Primary POC Role" data={jsonData.primarysitepocrole}/>
        <LabelledInputField placeholder={false} labelName="Manufacturing Archetype" data={jsonData.manufacturearchtype}/>
        <LabelledInputField placeholder={false} labelName="Sectors" data={jsonData.sector}/>
        <LabelledInputField placeholder={false} labelName="# of shifts" data={jsonData.totalshifts}/>
        <LabelledInputField placeholder={false} labelName="# Employees" data={jsonData.totalemployees}/>
        <LabelledInputField placeholder={false} labelName="# of production assets" data={jsonData.totalproductionassets}/>
        <LabelledInputField placeholder={false} labelName="site revenue" data={jsonData.siterevenue}/>
        <LabelledInputField placeholder={true} labelName="Site EPITDA (optional)" data={jsonData.siteebitda}/>
        <LabelledInputField placeholder={true} labelName="OTIF % (optional)" data={jsonData.otif}/>
        <LabelledInputField placeholder={true} labelName="Site OEE (optional)" data={jsonData.overalloee}/>
        <LabelledInputField placeholder={true} labelName="OEE - Performance % (optional)" data={jsonData.performanceoee}/>
        <LabelledInputField placeholder={true} labelName="OEE - Availability % (optional)" data={jsonData.availabilityoee}/>
        <LabelledInputField placeholder={true} labelName="OEE - Quality % (optional)" data={jsonData.qualityoee}/>
        
        </div>
    )
}