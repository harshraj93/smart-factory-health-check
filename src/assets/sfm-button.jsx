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
        <button type="submit" className={"form-navigation-button "+props.buttonStatus} onClick={props.onClick} value={props.labelName} style={props.style}>{props.labelName}</button>
    )
}

function DownloadButton(props){
    return(
        <button type="submit" className="download-button" value={props.labelName} onClick={props.onClick}>{props.labelName}</button>
    )
}


function QuestionnaireNavigation(props){
    return(
        <button className={"navigation-questionnaire "+props.customClass} onClick={props.onClick}>{props.labelName}</button>
    )
}

function SaveandExitButton(props){
    return(
        <button className="save-and-exit" onClick={props.onClick}>{props.labelName}</button>
    )
}

export {
    CustomButton,
    FormNavigationButton,
    DownloadButton,
    QuestionnaireNavigation,
    SaveandExitButton
}

