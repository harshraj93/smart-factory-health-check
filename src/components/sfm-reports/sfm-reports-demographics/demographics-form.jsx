import React from 'react';
import DropDownMenu from '../../../assets/drop-down-input-box';
import LabelledInputField from '../../../assets/input-field';


let data = 
[{
    labelName:"Manufacturing Archetype",
    dropDownData:["Manufacturing","Fabricating"]
},{
    labelName:"Sector",
    dropDownData:["Selected Sector","Sector 1"]
},{
    labelName:"#Employees",
    dropDownData:["100-200","200-300"]
},]

export default function DemographicsForm(props){
    
    return(
        <div className="demographics-form">
       
        <LabelledInputField placeholder={false} labelName="Location" data="Bristol"/>
        <LabelledInputField placeholder={false} labelName="Primary POC" data="Jim Hughes"/>
        <LabelledInputField placeholder={false} labelName="Primary POC Role" data="Sr. Manager"/>
        <DropDownMenu data={data[0]} />
        <DropDownMenu data={data[1]} />
        <LabelledInputField placeholder={false} labelName="# of shifts" data="3"/>
        <LabelledInputField placeholder={false} labelName="# Employees" data="100-200"/>
        <LabelledInputField placeholder={false} labelName="# of production assets" data="7"/>
        <LabelledInputField placeholder={false} labelName="site revenue" data="$430,000"/>
        <LabelledInputField placeholder={true} labelName="Site EPITDA (optional)" />
        <LabelledInputField placeholder={true} labelName="OTIF % (optional)" />
        <LabelledInputField placeholder={true} labelName="Site OEE (optional)" />
        <LabelledInputField placeholder={true} labelName="OEE - Performance % (optonal)" />
        <LabelledInputField placeholder={true} labelName="OEE - Availability % (optional)" />
        <LabelledInputField placeholder={true} labelName="OEE - Quality % (optional)" />
        
        </div>
    )
}