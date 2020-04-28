import React from 'react';
import LabelledInputField from '../../../assets/input-field';


export default function DemographicsForm(props){
    let jsonData = props.formData.resultantJSON;
    return(
        <>
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
        <div className="bottom-border"></div>
        <div className="title-name-demographics">Business Function Point of Contact</div>
        <div className="business-poc-demographics">
        <LabelledInputField placeholder={false} labelName="Operations" />
        <LabelledInputField placeholder={false} labelName="Quality" />
        <LabelledInputField placeholder={false} labelName="Information Technology" />
        <LabelledInputField placeholder={false} labelName="Procurement & Supplier Management" />
        <LabelledInputField placeholder={false} labelName="Continuous Improvement" />
        <LabelledInputField placeholder={false} labelName="Replenishment & Material Management"/>
        <LabelledInputField placeholder={false} labelName="Maintenance"/>
        <LabelledInputField placeholder={false} labelName="Planning & Scheduling"/>
        <LabelledInputField placeholder={false} labelName="Human Resources" />
        <LabelledInputField placeholder={false} labelName="Engineering & R&D"/>
        </div>
        </>
    )
}