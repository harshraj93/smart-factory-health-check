import React from 'react';

export default function CustomCheckBox(props){
    return(
     <>
    <span className="check-box">
        <input type="checkbox"  />
        <span></span>
        <label>{props.labelName}</label>
      </span>
    </>
    )
}