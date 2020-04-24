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


let capabilitiesArray=[];
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
                    {props.data.title}
                </div>
                <div className="capabilities-text">{props.data.Capabilities}</div>
                <div className="sub-capabilities-text">{props.data.subCapabilities} ({props.data.subCapabilityNum} of {subCapabilitiesArray.length})</div>
                </div>
                <div className="progress-bar-column">
                <div className="progress-bar">
                    <ProgressBar now={props.data.progress} variant="success"/>
                    <span className="progress-status">{props.data.progress}% complete</span>
                </div>
                <div className="impact-area">
                    <span className="impact-area-text">OEE Impact Area:</span>
                    <span className="number-text">{props.data.oeeAddressArea}</span>
                </div>
                <div className="degree-impact-area">
                    <span className="oee-impact-area-text">Degree of OEE impact:</span>
                    <span className="number-text">{props.data.oeeImpact}</span>
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
            questions:[],
            scoringDetails:{},
            notesDetails:[],
            arrayIndex:0,
            progress:"",
            capabilitiesArrayIndex:0,
            showContinue:"",
            textArealength: 0,
            flagType: null
            
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


    parseQuestionnaire = async(questionnaireResponse)=>{
        console.log(questionnaireResponse,subCapabilitiesArray,capabilitiesArray,this.props.location.capabilityName);
        let progress;
        fetch(questionnaire.getProgress+`?siteId=${localStorage.getItem("siteId")}&businessfunctionId=${localStorage.getItem("businessfunctionId")}&capabilityId=${localStorage.getItem("capabilityName")}`,apiGetHeader)
            .then(resp=>resp.json())
            .then(resp=>{
                
        let headerValues={
            title:subCapabilitiesArray[this.state.arrayIndex].businessFunctionName,
            Capabilities:capabilitiesArray[this.state.capabilitiesArrayIndex].capabilityName,
            subCapabilities:subCapabilitiesArray[this.state.arrayIndex].subcapabilityName,
            subCapabilityNum:this.state.arrayIndex+1,
            progress:Math.round(resp.progress,4),
            oeeAddressArea:subCapabilitiesArray[this.state.arrayIndex].oeeAddressArea,
            oeeImpact:subCapabilitiesArray[this.state.arrayIndex].oeeImpact
        };

        let checkBoxValues={
            targetChecked:questionnaireResponse.targetLevel,
            currentChecked:questionnaireResponse.currentLevel
        };

    
         let questionsArray=questionnaireResponse.questions
        

        let scoringDetails={
            "Low(2)":questionnaireResponse.low,
            "Medium(4)":questionnaireResponse.medium,
            "High(6)":questionnaireResponse.high
        };

        let notesDetails=questionnaireResponse.Notes
        console.log(headerValues)
         this.setState(function(prevState,props){
            
            return{
            headerValues:headerValues,
            checkBoxValues:checkBoxValues,
            questions:questionsArray,
            scoringDetails:scoringDetails,
            notesDetails:notesDetails,
            }
        })
    });
    }
    

    getQuestionnaire = async()=>{
        if(subCapabilitiesArray[this.state.arrayIndex].clientAssessmentId){
            localStorage.setItem("clientId",subCapabilitiesArray[this.state.arrayIndex].clientAssessmentId);

        }
        console.log(localStorage.getItem("clientId"))
        if(subCapabilitiesArray.length>0){
        fetch(
            questionnaire.getQuestionnaire+`?clientAssessmentId=${localStorage.getItem("clientId")}`,
            apiGetHeader
            )
            .then(resp=>resp.json())
            .then(resp=>this.parseQuestionnaire(resp))
        }
        else{
            return(console.log("No data"));
        }
}


    parseSubCapabilities = async(resp)=>{
       
    capabilitiesArray = resp;
    let subCapabilityNameArray,capabilityArrayIndex,subCapabilityName=[];
    if(this.props.location.capabilityName){
        localStorage.setItem("capabilityName",this.props.location.capabilityName)
    subCapabilityNameArray = capabilitiesArray.filter(element=>{
        return element.capabilityName===this.props.location.capabilityName
    })
    // subCapabilityName = subCapabilityNameArray[0].subcapabilities.filter(subcapability=>{
    //     return subcapability.isIncomplete===true
    // })
    }
    else{
    subCapabilityNameArray = capabilitiesArray.filter(element=>{
       return element.isIncomplete===true
    })
    }
    subCapabilityName = subCapabilityNameArray[0].subcapabilities.filter(subcapability=>{
        return subcapability.isIncomplete===true
    })
    capabilityArrayIndex = capabilitiesArray.indexOf(subCapabilityNameArray[0])
        await this.setState(function(prevState,props){
            return {capabilityArrayIndex:capabilityArrayIndex}
    })

    if(subCapabilityNameArray.length>0){
    
    subCapabilitiesArray = subCapabilityNameArray[0].subcapabilities
    console.log(subCapabilitiesArray,capabilitiesArray);
    if(subCapabilityName.length>0){
        console.log(subCapabilityName,subCapabilitiesArray,capabilityArrayIndex);
        
    await this.setState({
        arrayIndex:subCapabilitiesArray.indexOf(subCapabilityName[0])
    })    
    }
    }
    this.getQuestionnaire()

    }


    getSubCapability = ()=>{
        if(this.props.location.siteid){
        localStorage.setItem("siteId",this.props.location.siteid);
        localStorage.setItem("businessfunctionId",this.props.location.businessFunctionName);
    }
    fetch(questionnaire.getCapabilities+`?siteId=${localStorage.getItem("siteId")}&businessfunctionId=${localStorage.getItem("businessfunctionId")}`,apiGetHeader)
        .then(resp=>resp.json())
        .then(resp=>this.parseSubCapabilities(resp))
    }


    submitNotes = ()=>{
        var date = new Date();
        var Str = 
            date.getFullYear()+"-"+("00" + (date.getMonth() + 1)).slice(-2) 
                + "-" + ("00" + date.getDate()).slice(-2) 
                 + " " 
                + ("00" + date.getHours()).slice(-2) + ":" 
                + ("00" + date.getMinutes()).slice(-2) 
                + ":" + ("00" + date.getSeconds()).slice(-2) + "-"+("00" + date.getMilliseconds()).slice(-2); 
        let notesSubmission =  {
            "clientAssessmentId": subCapabilitiesArray[this.state.arrayIndex].clientAssessmentId,
            "resourceEmailId": localStorage.getItem("userName"),
            "note": this.state.textAreaNotesValue,
            "timestamp": Str,
            "flagType": this.state.flagType
        }
        console.log(notesSubmission);
        apiPostHeader.body = JSON.stringify(notesSubmission);
        fetch(questionnaire.addAssessmentNote,apiPostHeader)
            .then(resp=>resp.json())
            .then(resp=>{
                console.log(resp);
                if(resp.resultantJSON.successMsg){
                    this.setState({
                        showTextEditor:false,
                        showNotes:true,
                        textEditorData:""
                    })
                    console.log(resp);
                    this.getSubCapability();
                }
                else{
                    this.setState({
                        showTextEditor:false,
                        showNotes:true,
                        textEditorData:""
                    })
                    console.log("errored out notes")
                }
            })   
        
    }


    focusInput = async()=>{
        await this.setState({
            showTextEditor:true,
            flagType: "Low"
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


    replaceSubCapabilitiesArray = (arrayIndex)=>{
        subCapabilitiesArray = capabilitiesArray[arrayIndex].subcapabilities;
    }

    continueNav = ()=>{
        let saveAssessment = {
            "currentLevel":this.state.currentValue?this.state.currentValue:-1,
            "targetLevel":this.state.targetValue?this.state.targetValue:-1,
            "subCapability":subCapabilitiesArray[this.state.arrayIndex].subcapabilityName,
            "siteid":localStorage.getItem("siteId")
            }
        apiPostHeader.body = JSON.stringify(saveAssessment);
        
        fetch(questionnaire.saveAssessment,apiPostHeader)
            .then(resp=>resp.json())
            .then(resp=>{
                console.log(resp)
                if(resp.successMsg){
                    
                    this.setState(function(prevState,props){
                        if(this.state.arrayIndex+1===subCapabilitiesArray.length){
                            this.replaceSubCapabilitiesArray(prevState.capabilitiesArrayIndex+1)
                            return{
                                capabilitiesArrayIndex:prevState.capabilitiesArrayIndex+1,
                                arrayIndex:0
                            }
                        }
                        else{
                        return{arrayIndex:prevState.arrayIndex+1}
                    }
                    })
                    
                    this.getQuestionnaire()
                    this.showContinue();
                }
                else{
                    console.log("errored out")
                }
            })
            
     }


    previousSubCapability = async()=>{
        
        if(this.state.arrayIndex>0){

            await this.setState(function(prevState,props){
                return{arrayIndex:prevState.arrayIndex-1}
            })

            this.getQuestionnaire();
        }
        else {
            if(this.state.capabilitiesArrayIndex>0){
                
                await this.setState(function(prevState,props){
                    console.log(this.state.capabilitiesArrayIndex,subCapabilitiesArray);
                    return{
                        capabilitiesArrayIndex:prevState.capabilitiesArrayIndex-1,
                        arrayIndex:0
                    }
                })
            }
            this.replaceSubCapabilitiesArray(this.state.capabilitiesArrayIndex)
            
            this.getQuestionnaire();
        }
    }

    saveAndExit = ()=>{
        let saveAssessment = {
            "currentLevel":this.state.currentValue?this.state.currentValue:-1,
            "targetLevel":this.state.targetValue?this.state.targetValue:-1,
            "subCapability":subCapabilitiesArray[this.state.arrayIndex].subcapabilityName,
            "siteid":localStorage.getItem("siteId")
            }
            console.log(this.props.history.location)
        apiPostHeader.body = JSON.stringify(saveAssessment);
        fetch(questionnaire.saveAssessment,apiPostHeader)
            .then(resp=>resp.json())
            .then(resp=>{
                if(resp.successMsg){
                    this.props.history.push({
                        pathname:"/reports",
                        // clientName:this.props.history.location.clientName,
                        // siteName:this.props.history.location.siteName,
                        // sector:this.props.history.location.sector,
                        // loadComponentString:"assessments"
                        
                    })
                }
                else{
                    console.log("errored out at save and exit")
                }
            })
    }

    showContinue = async()=>{
        console.log(this.state.arrayIndex,subCapabilitiesArray.length-1,this.state.capabilitiesArrayIndex,capabilitiesArray.length-1)
        if(this.state.capabilitiesArrayIndex!==capabilitiesArray.length-1){
            if(this.state.arrayIndex!==subCapabilitiesArray.length-1){
                await this.setState({
                    showContinue:true
                })
            }
        }
        else{
            await this.setState({
                showContinue:false
            })
        }
    }

    render(){
        return(
            <div className = "questionnaire-main-container">
            <QuestionnaireHeader data={this.state.headerValues}/>
            <div className="navigation-button-group">
            <QuestionnaireNavigation labelName="Previous" customClass="prev" onClick={this.previousSubCapability}/><QuestionnaireNavigation labelName="Skip Question" />
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
                {<FormNavigationButton labelName="Continue" onClick={this.continueNav}/>}
                
                </div>
                </span>
            </div>
            <div className="bottom-border"></div>
            <div className="scoring">
                <div className="scoring-text-main">Scoring</div>
                <div className="scoring-text-main-container">
                {Object.keys(this.state.scoringDetails).map((element,index)=>{
                    return(
                    <div className="scoring-text-container" key={index}>
                    <div className="scoring-range">
                        {element}
                        <span className="flag-button"><CustomButton imgSrc={flagIcon} clickFunction={(element)=>this.focusInput(element)}/></span>
                    </div>
                    <div className="scoring-info">
                        {this.state.scoringDetails[element]}
                    </div>
                    </div>
                    )
                })}
                </div>
            </div>
            <div className="bottom-border"></div>
            <div className = "notes-container">
                <div className="notes-title">Notes</div>
                <div className="text-area" >
                   {!this.state.showTextEditor&&<CustomButton imgSrc={addIcon} clickFunction={this.showTextEditor}/>}
                    {this.state.showTextEditor&&<TextEditor textAreaValue={this.textAreaValue} value={this.state.textEditorData}/>}
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
                {this.state.notesDetails?this.state.showNotes&&this.state.notesDetails.map(element=>{
                    return(
                    <NotesComponent data={element} textAreaClick={this.textAreaClick}/>
                    )
                }):""}
            </div>
        )
    }
}



export default withRouter(QuestionnairePage)