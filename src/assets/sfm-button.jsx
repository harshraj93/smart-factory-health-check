import React from 'react';
import './sfm-button.scss';
function CustomButton(props){

    if(props.imgSrc){
        return(
            <button className="custom-button" style={props.style}><img src={props.imgSrc}/></button>
        )
    }
    else{
        return(
            <button className="custom-button" style={props.style}>{props.labelName}</button>
        )
    }
    }


export default CustomButton;