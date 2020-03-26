import React from 'react';
function CustomButton(props){

    if(props.imgSrc){
        return(
            <button className="custom-button" style={props.style}><img src={props.imgSrc} alt=""/></button>
        )
    }
    else{
        return(
            <button className="custom-button" style={props.style}>{props.labelName}</button>
        )
    }
    }


export default CustomButton;