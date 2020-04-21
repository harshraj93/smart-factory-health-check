import React from 'react';
import {withRouter} from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar'
import {QuestionnaireNavigation,FormNavigationButton} from '../../assets/sfm-button';
import GeneralQuestions from './general-questions';
import flagIcon from '../../images/icon-small-flagged-outline.svg';
import {CustomButton} from '../../assets/sfm-button';
import addIcon from '../../images/icon-small-add-black.svg';
import TextEditor from './text-editor-component';

let scoring = {
            "Low (2)":"Limited and independent data leveraged to identify areas of improvement at high level. No detailed system analysis performed to prioritize and track/monitor improvements.",
            "Medium (4)":"Improvement projects are launched based on data-driven, quantitative analysis of key business drivers. High level system based tracking and analysis of progress in place",
            "High (6)":"Improvement projects are identified and launched based on system based data-driven, quantitative analysis of key business drivers. Detailed system based tracking and analysis of project progress in place, feedback loop in place. Existence of a Digital Agenda to guide ongoing digital projects. Use of a Digital Foundry to drive multi-disciplinary solution and application approach."
            };


function QuestionnaireHeader(props){
    
        return(
            <div className="header-container">
                <div className="questionnaire-column">
                <div className="questionnaire-title">
                    {props.title}
                </div>
                <div className="capabilities-text">Capabilities</div>
                <div className="sub-capabilities-text">Sub Capabilities (2 of 7)</div>
                </div>
                <div className="progress-bar-column">
                <div className="progress-bar">
                    <ProgressBar now={33} variant="success"/>
                    <span className="progress-status">33% complete</span>
                </div>
                <div className="impact-area">
                    <span className="impact-area-text">OEE Impact Area:</span>
                    <span className="number-text">All 3</span>
                </div>
                <div className="degree-impact-area">
                    <span className="oee-impact-area-text">Degree of OEE impact:</span>
                    <span className="number-text">Uncertain</span>
                </div>
             </div>
             </div>
                   
            
        )
    
}




class QuestionnairePage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showTextEditor:false
        }
        this.props.disableMenu(false);
    }

    showTextEditor = ()=>{
        this.setState({
            showTextEditor:true
        })
    }

    render(){
        return(
            <div className = "questionnaire-main-container">
            <QuestionnaireHeader title="Business Functions"/>
            <div className="navigation-button-group">
            <QuestionnaireNavigation labelName="Previous" customClass="prev"/><QuestionnaireNavigation labelName="Skip Question" />
            </div>
            <div className="questions-and-targets">
                <GeneralQuestions/>
                <span className="targets"></span>
            </div>
            <div className="bottom-border"></div>
            <div className="scoring">
                <div className="scoring-text-main">Scoring</div>
                <div className="scoring-text-main-container">
                {Object.keys(scoring).map(element=>{
                    return(
                    <div className="scoring-text-container">
                    <div className="scoring-range">
                        {element}
                        <span className="flag-button"><CustomButton imgSrc={flagIcon} /></span>
                    </div>
                    <div className="scoring-info">
                        {scoring[element]}
                    </div>
                    </div>
                    )
                })}
                </div>
            </div>
            <div className="bottom-border"></div>
            <div className = "notes-container">
                <div className="notes-title">Notes</div>
                <div className="text-area">
                   {!this.state.showTextEditor&&<CustomButton imgSrc={addIcon} clickFunction={this.showTextEditor}/>}
                    {this.state.showTextEditor&&<TextEditor />}
                </div>
                
            </div>
            </div>
        )
    }
}



export default withRouter(QuestionnairePage)