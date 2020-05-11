import React from 'react';

export default function CustomCheckBox(props){
    return(
    <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id={"customCheck"+props.name} name={props.name} onClick={props.onClick}/>
            <label class="custom-control-label" id={props.name} for={"customCheck"+props.name}>{props.label}</label>
    </div>
    )
}