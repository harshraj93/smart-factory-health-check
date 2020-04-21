import React from 'react';
import flagIcon from '../../images/icon-small-flagged-outline.svg';
import {CustomButton} from '../../assets/sfm-button';
let questions=["What data is used to identify areas of improvement?", 

"What systems and analysis are leveraged to priorities and assess improvement projects?",

"How our CI systems integrated with production systems?",

"How long is data kept available (e.g., not archived)?"]


export default function GeneralQuestions(props){
    return(
        <div className="general-questions-box">
            <div className="general-questions">General Questions</div>
            <div className="questions">
                {questions.map((element,index)=>{
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
            <div className="flag-button"><CustomButton imgSrc={flagIcon} /></div>
        </div>
    )
}