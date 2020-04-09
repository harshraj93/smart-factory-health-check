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

function FormNavigationButton(props){
    return(
        <button type="submit" className="form-navigation-button" value={props.labelName} style={props.style}>{props.labelName}</button>
    )
}

function DownloadButton(props){
    return(
        <button type="submit" className="download-button" value={props.labelName}>{props.labelName}</button>
    )
}

export {
    CustomButton,
    FormNavigationButton,
    DownloadButton
}

