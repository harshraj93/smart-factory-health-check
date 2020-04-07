import React from 'react';
import './input-field.scss';
export default function LabelledInputField(props){
    return(
        <div className="labelled-input-field">
            {props.placeholder?"":<label htmlFor="input">{props.labelName.toUpperCase()}</label>}
            <input type="text" 
            defaultValue={props.data} 
            placeholder={props.labelName} 
            onChange={props.onChange} 
            required={props.required}>
            </input>
        </div>
    )
}

