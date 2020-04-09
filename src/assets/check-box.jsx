import React from 'react';

export default function CustomCheckBox(props){
    return(
     <>
    <span className="check-box">
        <input type="checkbox" id="select-option" name="apply" value="apply-across-all-sites" />
        <span className="checkbox-custom"></span>
    
    <label htmlFor="apply"> {props.labelName}</label>
    </span>
    </>
    )
}