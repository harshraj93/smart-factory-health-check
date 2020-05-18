import React from 'react';
import flagIcon from '../../images/icon-small-flagged-outline.svg';
import flagHighlitedIcon from '../../images/icon-small-flagged-highlited.svg';
import {CustomButton} from '../../assets/sfm-button';


export default function GeneralQuestions(props){
    return(
        <div className="general-questions-box">
            <div className="general-questions">General Questions</div>
            <div className="questions">
                {props.data.map((element,index)=>{
                return(
                <>
                <span className="question-number" key={index}>{index+1}</span>
                <span className="question">{element}</span>
                </>
                )
            }
                )
                }
            </div>
            <div className="flag-button">
                {props.flagHighlited === false ? (<CustomButton imgSrc={flagIcon} clickFunction={props.flagQuestions}/>) : <CustomButton imgSrc={flagHighlitedIcon} />}
            </div>
        </div>
    )
}