import React from 'react';
import {withRouter} from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar'
import {QuestionnaireNavigation,SaveandExitButton,FormNavigationButton} from '../../assets/sfm-button';
import GeneralQuestions from './general-questions';
import flagIcon from '../../images/icon-small-flagged-outline.svg';
import {CustomButton} from '../../assets/sfm-button';
import addIcon from '../../images/icon-small-add-black.svg';
import TextEditor from './text-editor-component';
import TargetSelect from './target-select';
import NotesComponent from './notes-component';
import questionnaire from '../../api/questionnaire/questionnaire';
import {apiGetHeader,apiPostHeader} from '../../api/main/mainapistorage';
let scoring = {
            "Low (2)":"Limited and independent data leveraged to identify areas of improvement at high level. No detailed system analysis performed to prioritize and track/monitor improvements.",
            "Medium (4)":"Improvement projects are launched based on data-driven, quantitative analysis of key business drivers. High level system based tracking and analysis of progress in place",
            "High (6)":"Improvement projects are identified and launched based on system based data-driven, quantitative analysis of key business drivers. Detailed system based tracking and analysis of project progress in place, feedback loop in place. Existence of a Digital Agenda to guide ongoing digital projects. Use of a Digital Foundry to drive multi-disciplinary solution and application approach."
            };

// let questions=["What data is used to identify areas of improvement?", 

// "What systems and analysis are leveraged to priorities and assess improvement projects?",

// "How our CI systems integrated with production systems?",

// "How long is data kept available (e.g., not archived)?"]

let subCapabilitiesArray = [];
// let notesData = [
//     {
//         "type": "LOW",
//         "text": "Notes by user.",
//         "userId": "2019",
//         "userName": "Brian Takayama"
//     },
//     {
//         "type": null,
//         "text": "Notes by user.",
//         "userId": "2019",
//         "userName": "Brian Takayama"
//     },
//     {
//         "type": "GENERAL",
//         "text": "This General Question has been flagged because it doesnt make sense in context to the Business function and capability. This is just placeholder copy, but allows for the flag to have a specific note to provide a reason for the flag. ",
//         "userId": "2019",
//         "userName": "Brian Takayama"
//     }
//   ]


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
        this.textInput = React.createRef();
        this.state={
            showTextEditor:false,
            targetValue:"",
            currentValue:"",
            showNotes:true,
            textEditorData:"",
            characterCount:"",
            headerValues:{},
            checkBoxValues:{},
            questions:{},
            scoringDetails:{},
            notesDetails:{}
        }
        this.props.disableMenu(false);
    }


    showTextEditor = ()=>{
        this.setState({
            showTextEditor:true,
            textEditorData:""
        })
        
    }


    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }


    handleClickOutside = (event) =>{
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
          this.setState({
              showTextEditor:false,
              showNotes:true
          })
        }
      }


    setCurrentValue = currentValue =>{
        this.setState({
            currentValue:currentValue
        })
    }


    setTargetValue = targetValue=>{
        this.setState({
            targetValue:targetValue
        })
    }


    getQuestionnaire = async()=>{
        fetch(
            questionnaire.getQuestionnaire+`?clientAssessmentId=${subCapabilitiesArray[this.state.arrayIndex].assessmentId}`,
            apiGetHeader
            )
            .then(resp=>resp.json())
            .then(resp=>console.log(resp))

        let headerValues={
            title:"",
            Capabilities:"",
            subCapabilities:"",
            progress:"",
            oeeAddressArea:"",
            oeeImpact:""
        };
        let checkBoxValues={
            targetChecked:"",
            currentChecked:""
        };
        let questions={
            questionsArray:[]
        };
        let scoringDetails={
            "Low(2)":"",
            "Medium(4)":"",
            "High(6)":""

        };
        let notesDetails=
            [
                    {
                        "type": "LOW",
                        "text": "Notes by user.",
                        "userId": "2019",
                        "userName": "Brian Takayama"
                    },
                    {
                        "type": null,
                        "text": "Notes by user.",
                        "userId": "2019",
                        "userName": "Brian Takayama"
                    },
                    {
                        "type": "GENERAL",
                        "text": "This General Question has been flagged because it doesnt make sense in context to the Business function and capability. This is just placeholder copy, but allows for the flag to have a specific note to provide a reason for the flag. ",
                        "userId": "2019",
                        "userName": "Brian Takayama"
                    }
                  ];
        
        await this.setState({
            headerValues:headerValues,
            checkBoxValues:checkBoxValues,
            questions:questions,
            scoringDetails:scoringDetails,
            notesDetails:notesDetails,
            arrayIndex:0
        })
        

    }


    parseSubCapabilities = (resp)=>{
        resp.forEach(subCapabilities=>{
            subCapabilitiesArray.push({
                "assessmentId": subCapabilities.assessmentId,
                "subcapabilityName": subCapabilities.subcapabilityName,
            })
        })
    // this.getQuestionnaire()
    }


    getSubCapability = ()=>{
        fetch(questionnaire.getCapabilities+"?siteId=ST_49&businessfunctionId=Continuous Improvement&capabilityId=Manage CI",apiGetHeader)
        .then(resp=>resp.json())
        .then(resp=>this.parseSubCapabilities(resp))
    }


    submitNotes = ()=>{
        this.setState({
            showTextEditor:false,
            showNotes:true,
            textEditorData:""
        })
    }


    focusInput = async()=>{
        await this.setState({
            showTextEditor:true
        })
        document.getElementsByClassName("notes-editor-area")[0].scrollIntoView({behaviour:"smooth"});
        document.getElementsByClassName("notes-editor-area")[0].click();
    }


    textAreaClick = (e)=>{
        let textAreaText = e.target.innerHTML;
        this.setState({
            showTextEditor:true,
            textEditorData:(textAreaText),
            showNotes:false
        })

    }

    textAreaValue = (e)=>{
       
        this.setState({
            textAreaNotesValue : e.target.value,
            textArealength:e.target.value.length
        })
    }

    componentDidMount = ()=>{
        this.getSubCapability();
        document.addEventListener('mousedown', this.handleClickOutside);
    }


    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }


    continueNav = ()=>{
        let saveAssessment = {
            "currentLevel":this.state.currentValue?this.state.currentValue:-1,
            "targetLevel":this.state.targetValue?this.state.targetValue:-1,
            "subCapability":subCapabilitiesArray[this.state.arrayIndex].subcapabilityName,
            //"siteid":this.props.location.
            }
        apiPostHeader.body = JSON.stringify(saveAssessment);
        fetch(questionnaire.saveAssessment,apiPostHeader)
            .then(resp=>resp.json())
            .then(resp=>{
                if(resp.success){
                    this.setState(function(prevState,props){
                        return{arrayIndex:prevState.arrayIndex+1}
                    })
                }
                else{
                    console.log("errored out")
                }
            })
     }


    saveAndExit = ()=>{
        let saveAssessment = {
            "currentLevel":this.state.currentValue?this.state.currentValue:-1,
            "targetLevel":this.state.targetValue?this.state.targetValue:-1,
            "subCapability":subCapabilitiesArray[this.state.arrayIndex].subcapabilityName,
            //"siteid":this.props.location.
            }
        apiPostHeader.body = JSON.stringify(saveAssessment);
        fetch(questionnaire.saveAssessment,apiPostHeader)
            .then(resp=>resp.json())
            .then(resp=>{
                if(resp.success){
                    this.history.push({
                        pathname:"reports",
                        state:{
                            locationString:"assessments"
                        }
                    })
                }
                else{
                    console.log("errored out at save and exit")
                }
            })
    }


    render(){
        return(
            <div className = "questionnaire-main-container">
            <QuestionnaireHeader data={this.state.headerValues}/>
            <div className="navigation-button-group">
            <QuestionnaireNavigation labelName="Previous" customClass="prev"/><QuestionnaireNavigation labelName="Skip Question" />
            </div>
            <div className="questions-and-targets">
                <GeneralQuestions data={this.state.questions} flagQuestions={this.focusInput}/>
                <span className="targets">
                <TargetSelect 
                current={"current"+this.state.checkBoxValues.currentChecked} 
                target={"target"+this.state.checkBoxValues.targetChecked} 
                setCurrentValue={this.setCurrentValue} 
                setTargetValue={this.setTargetValue}/>
                <div className="button-group">
                <SaveandExitButton labelName="Save and Exit" onClick={this.saveAndExit}/>
                <FormNavigationButton labelName="Continue" onClick={this.continueNav}/>
                
                </div>
                </span>
            </div>
            <div className="bottom-border"></div>
            <div className="scoring">
                <div className="scoring-text-main">Scoring</div>
                <div className="scoring-text-main-container">
                {Object.keys(scoring).map((element,index)=>{
                    return(
                    <div className="scoring-text-container" key={index}>
                    <div className="scoring-range">
                        {element}
                        <span className="flag-button"><CustomButton imgSrc={flagIcon} clickFunction={this.focusInput}/></span>
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
                <div className="text-area" ref={this.setWrapperRef}>
                   {!this.state.showTextEditor&&<CustomButton  imgSrc={addIcon} clickFunction={this.showTextEditor}/>}
                    {this.state.showTextEditor&&<TextEditor  textAreaValue={this.textAreaValue} value={this.state.textEditorData}/>}
                </div>
                <div className="character-count-submit">
                {this.state.showTextEditor&&<div className="character-count">{this.state.textArealength}/3000 characters</div>}
                {this.state.showTextEditor&&<FormNavigationButton labelName="Submit" onClick={this.submitNotes}/>}
                </div>
                {/* {notesData.map((data, index) => {
                    return(
                        <TextEditor data={data}/>
                    )
                })} */}
            </div>
                {this.state.showNotes&&<NotesComponent textAreaClick={this.textAreaClick}/>}
            </div>
        )
    }
}



export default withRouter(QuestionnairePage)