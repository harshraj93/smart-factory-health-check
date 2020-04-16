import React from 'react';
import LabelledInputField from '../../../assets/input-field';


export default function DemographicsForm(props){
    let jsonData = props.formData.resultantJSON;
    return(
        <div className="demographics-form">
       
        <LabelledInputField placeholder={false} labelName="Location" data={jsonData.sitename} readOnly={true}/>
        <LabelledInputField placeholder={false} labelName="Primary POC" data={jsonData.primarysitepocname} readOnly={true}/>
        <LabelledInputField placeholder={false} labelName="Primary POC Role" data={jsonData.primarysitepocrole} readOnly={true}/>
        <LabelledInputField placeholder={false} labelName="Manufacturing Archetype" data={jsonData.manufacturearchtype} readOnly={true}/>
        <LabelledInputField placeholder={false} labelName="Sectors" data={jsonData.sector} readOnly={true}/>
        <LabelledInputField placeholder={false} labelName="# of shifts" data={jsonData.totalshifts} readOnly={true}/>
        <LabelledInputField placeholder={false} labelName="# Employees" data={jsonData.totalemployees} readOnly={true}/>
        <LabelledInputField placeholder={false} labelName="# of production assets" data={jsonData.totalproductionassets} readOnly={true}/>
        <LabelledInputField placeholder={false} labelName="site revenue" data={jsonData.siterevenue} readOnly={true}/>
        <LabelledInputField placeholder={true} labelName="Site EPITDA (optional)" data={jsonData.siteebitda} readOnly={true}/>
        <LabelledInputField placeholder={true} labelName="OTIF % (optional)" data={jsonData.otif} readOnly={true}/>
        <LabelledInputField placeholder={true} labelName="Site OEE (optional)" data={jsonData.overalloee} readOnly={true}/>
        <LabelledInputField placeholder={true} labelName="OEE - Performance % (optional)" data={jsonData.performanceoee} readOnly={true}/>
        <LabelledInputField placeholder={true} labelName="OEE - Availability % (optional)" data={jsonData.availabilityoee} readOnly={true}/>
        <LabelledInputField placeholder={true} labelName="OEE - Quality % (optional)" data={jsonData.qualityoee} readOnly={true}/>
        
        </div>
    )
}