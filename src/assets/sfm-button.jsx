import React from 'react';
import './sfm-button.scss';
function CustomButton(props){

    
        return(
            <button className="custom-button" style={props.style}>{props.labelName}</button>
        )
    }


export default CustomButton;