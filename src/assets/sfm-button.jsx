import React from 'react';
function CustomButton(props){

    if(props.imgSrc){
        return(
            <button className="custom-button" onClick={props.clickFunction} style={props.style}><img src={props.imgSrc} alt="" /></button>
        )
    }
    else{
        return(
            <button className="custom-button" style={props.style} onClick={props.clickFunction}>{props.labelName}</button>
        )
    }
    }

function nextStepButton(props){

}


export {
    CustomButton,
    nextStepButton
}

