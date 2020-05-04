import React from 'react';
import { withRouter } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { QuestionnaireNavigation, SaveandExitButton, FormNavigationButton } from '../../assets/sfm-button';
import GeneralQuestions from './general-questions';
import flagIcon from '../../images/icon-small-flagged-outline.svg';
import { CustomButton } from '../../assets/sfm-button';
import addIcon from '../../images/icon-small-add-black.svg';
import TextEditor from './text-editor-component';
import TargetSelect from './target-select';
import NotesComponent from './notes-component';
import questionnaire from '../../api/questionnaire/questionnaire';
import { apiGetHeader, apiPostHeader } from '../../api/main/mainapistorage';
import Spinner from 'react-bootstrap/Spinner';


let capabilitiesArray = [];
let subCapabilitiesArray = [];

function QuestionnaireHeader(props) {
    return (
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
                    <ProgressBar now={props.data.progress} variant="success" />
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


class QuestionnairePage extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.state = {
            showTextEditor: false,
            targetValue: "",
            currentValue: "",
            showNotes: true,
            textEditorData: "",
            characterCount: "",
            headerValues: {},
            checkBoxValues: {},
            questions: [],
            scoringDetails: {},
            notesDetails: [],
            arrayIndex: 0,
            progress: "",
            capabilitiesArrayIndex: 0,
            showContinue: true,
            textArealength: 0,
            flagType: null,
            currentSelected: "",
            targetSelected: "",
            showLoader:""

        }
        this.props.disableMenu(false);
    }


    showTextEditor = () => {
        this.setState({
            showTextEditor: true,
            textEditorData: ""
        })

    }


    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }


    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                showTextEditor: false,
                showNotes: true
            })
        }
    }


    setCurrentValue = currentValue => {
        this.setState({
            currentValue: currentValue
        })
    }


    setTargetValue = targetValue => {
        this.setState({
            targetValue: targetValue
        })
    }


    skipFlag = ()=>{
        let skipBody = {
            "subCapability":subCapabilitiesArray[this.state.arrayIndex].subcapabilityName,
            "siteid":localStorage.getItem("siteId")
        }
        apiPostHeader.body = JSON.stringify(skipBody)
        fetch(questionnaire.skipFlag,apiPostHeader)
            .then(resp=>resp.json())
            .then(resp=>{
                if (resp.successMsg) {

                
                    this.setState(function (prevState, props) {
                        if (this.state.arrayIndex + 1 === subCapabilitiesArray.length) {
                            if(prevState.capabilitiesArrayIndex+1 === capabilitiesArray.length){
                                this.setState({
                                    showContinue:false
                                })
                            }
                            else{
                                this.replaceSubCapabilitiesArray(prevState.capabilitiesArrayIndex + 1)
                                return {
                                    capabilitiesArrayIndex: prevState.capabilitiesArrayIndex + 1,
                                    arrayIndex: 0
                                }
                                }
                            

                        }
                        else {
                            return { arrayIndex: prevState.arrayIndex + 1 }
                        }
                    })

                    this.getQuestionnaire()
            }
            else {
                console.log("errored out")
            }
        }
            )
        
    }


    parseQuestionnaire = async (questionnaireResponse) => {
        fetch(questionnaire.getProgress + `?siteId=${localStorage.getItem("siteId")}&businessfunctionId=${localStorage.getItem("businessfunctionId")}&capabilityId=${capabilitiesArray[this.state.capabilitiesArrayIndex].capabilityName}`, apiGetHeader)
            .then(resp => resp.json())
            .then(resp => {

                let headerValues = {
                    title: subCapabilitiesArray[this.state.arrayIndex].businessFunctionName,
                    Capabilities: capabilitiesArray[this.state.capabilitiesArrayIndex].capabilityName,
                    subCapabilities: subCapabilitiesArray[this.state.arrayIndex].subcapabilityName,
                    subCapabilityNum: this.state.arrayIndex + 1,
                    progress: Math.round(resp.progress, 4),
                    oeeAddressArea: subCapabilitiesArray[this.state.arrayIndex].oeeAddressArea,
                    oeeImpact: subCapabilitiesArray[this.state.arrayIndex].oeeImpact
                };

                let checkBoxValues = {
                    targetChecked: questionnaireResponse.targetLevel,
                    currentChecked: questionnaireResponse.currentLevel
                };

                if (questionnaireResponse.currentLevel !== undefined && questionnaireResponse.currentLevel !== null) {
                    this.handleChangeCurrent("current" + questionnaireResponse.currentLevel);
                }
                if (questionnaireResponse.targetLevel !== undefined && questionnaireResponse.targetLevel !== null) {
                    this.handleTargetChange("target" + questionnaireResponse.targetLevel);
                }

                let questionsArray = questionnaireResponse.questions


                let scoringDetails = {
                    "Low(2)": questionnaireResponse.low,
                    "Medium(4)": questionnaireResponse.medium,
                    "High(6)": questionnaireResponse.high
                };

                let notesDetails = questionnaireResponse.Notes
                this.setState(function (prevState, props) {

                    return {
                        headerValues: headerValues,
                        checkBoxValues: checkBoxValues,
                        questions: questionsArray,
                        scoringDetails: scoringDetails,
                        notesDetails: notesDetails,
                        //showLoader:false
                    }
                })
            });
    }


    getQuestionnaire = async () => {
        if (subCapabilitiesArray[this.state.arrayIndex].clientAssessmentId) {
            localStorage.setItem("clientId", subCapabilitiesArray[this.state.arrayIndex].clientAssessmentId);

        }
        if (subCapabilitiesArray.length > 0) {
             fetch(
                questionnaire.getQuestionnaire + `?clientAssessmentId=${localStorage.getItem("clientId")}`,
                apiGetHeader
            )
                .then(resp => resp.json())
                .then(resp => this.parseQuestionnaire(resp))
           
        }

        else {
            return (console.log("No data"));
        }
    }


    parseSubCapabilities = async (resp) => {

        capabilitiesArray = resp;
        let subCapabilityNameArray, capabilityArrayIndex, subCapabilityName = [];
        if (this.props.location.capabilityName) {
            localStorage.setItem("capabilityName", this.props.location.capabilityName)
            subCapabilityNameArray = capabilitiesArray.filter(element => {
                return element.capabilityName === this.props.location.capabilityName
            })
        }
        else {
            subCapabilityNameArray = capabilitiesArray.filter(element => {
                return (element.isIncomplete?element:"")
            })
            if(subCapabilityNameArray.length==0){
                subCapabilityNameArray = [capabilitiesArray[0]]
            }
        }
        subCapabilityName = subCapabilityNameArray[0].subcapabilities.filter(subcapability => {
            return (subcapability.isIncomplete?subcapability:subcapability[0]) 
        })
        capabilityArrayIndex = capabilitiesArray.indexOf(subCapabilityNameArray[0])
        await this.setState(function (prevState, props) {
            return { capabilitiesArrayIndex: capabilityArrayIndex }
        })
        if (subCapabilityNameArray.length > 0) {

            subCapabilitiesArray = subCapabilityNameArray[0].subcapabilities
            if (subCapabilityName.length > 0) {
                await this.setState({
                    arrayIndex: subCapabilitiesArray.indexOf(subCapabilityName[0])
                })
            }
        }
        this.getQuestionnaire()

    }


    getSubCapability = () => {
        let businessFunctionName;
         if (this.props.location.siteid) {
             localStorage.setItem("businessfunctionId", this.props.location.businessFunctionName);
             localStorage.setItem("siteId", this.props.location.siteid);
            businessFunctionName = localStorage.getItem("businessfunctionId");
            //localStorage.setItem("siteId", "ST_002");

            if(businessFunctionName.includes("&")){
               businessFunctionName = businessFunctionName.replace("&","%26")
               localStorage.setItem("businessfunctionId", businessFunctionName);
            }
            // localStorage.setItem("businessfunctionId", "Procurement  %26  Supplier Management");
        }
        fetch(questionnaire.getCapabilities + `?siteId=${localStorage.getItem("siteId")}&businessfunctionId=${businessFunctionName}`, apiGetHeader)
            .then(resp => resp.json())
            .then(resp => this.parseSubCapabilities(resp))
        //  fetch(questionnaire.getCapabilities + `?siteId=ST_002&businessfunctionId=Procurement %26 Supplier Management`, apiGetHeader)
        //     .then(resp => resp.json())
        //     .then(resp => {console.log(resp); this.parseSubCapabilities(resp)})
    }


    submitNotes = () => {
        var date = new Date();
        var Str =
            date.getFullYear() + "-" + ("00" + (date.getMonth() + 1)).slice(-2)
            + "-" + ("00" + date.getDate()).slice(-2)
            + " "
            + ("00" + date.getHours()).slice(-2) + ":"
            + ("00" + date.getMinutes()).slice(-2)
            + ":" + ("00" + date.getSeconds()).slice(-2);
        let notesSubmission = {
            "clientAssessmentId": subCapabilitiesArray[this.state.arrayIndex].clientAssessmentId,
            "resourceEmailId": localStorage.userEmail,
            "note": this.state.textAreaNotesValue,
            "timestamp": Str,
            "flagType": this.state.flagType
        }
        apiPostHeader.body = JSON.stringify(notesSubmission);
        fetch(questionnaire.addAssessmentNote, apiPostHeader)
            .then(resp => resp.json())
            .then(resp => {
                if (resp.resultantJSON.successMsg) {
                    this.setState({
                        showTextEditor: false,
                        showNotes: true,
                        textEditorData: ""
                    })
                    this.getSubCapability();
                }
                else {
                    this.setState({
                        showTextEditor: false,
                        showNotes: true,
                        textEditorData: ""
                    })
                    console.log("errored out notes")
                }
            })

    }


    focusInput = async () => {
        await this.setState({
            showTextEditor: true,
            flagType: "Low"
        })
        document.getElementsByClassName("notes-editor-area")[0].scrollIntoView({ behaviour: "smooth" });
        document.getElementsByClassName("notes-editor-area")[0].click();
    }


    textAreaClick = (e) => {
        let textAreaText = e.target.innerHTML;
        this.setState({
            showTextEditor: true,
            textEditorData: (textAreaText),
            showNotes: false
        })
    }

    textAreaValue = (e) => {
        this.setState({
            textAreaNotesValue: e.target.value,
            textArealength: e.target.value.length
        })
    }

    componentDidMount = () => {
        this.getSubCapability();
        document.addEventListener('mousedown', this.handleClickOutside);
    }


    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }


    replaceSubCapabilitiesArray = (arrayIndex) => {
            if(arrayIndex<capabilitiesArray.length){
            subCapabilitiesArray = capabilitiesArray[arrayIndex].subcapabilities;
        }

    }

    continueNav = () => {
        let saveAssessment = {
            "currentLevel": this.state.currentValue ? this.state.currentValue : -1,
            "targetLevel": this.state.targetValue ? this.state.targetValue : -1,
            "subCapability": subCapabilitiesArray[this.state.arrayIndex].subcapabilityName,
            "siteid": localStorage.getItem("siteId")
        }
        apiPostHeader.body = JSON.stringify(saveAssessment);

        fetch(questionnaire.saveAssessment, apiPostHeader)
            .then(resp => resp.json())
            .then(resp => {
                if (resp.successMsg) {

                    this.setState(function (prevState, props) {
                        if (this.state.arrayIndex + 1 === subCapabilitiesArray.length) {
                            if(prevState.capabilitiesArrayIndex+1 === capabilitiesArray.length){
                                this.setState({
                                    showContinue:false
                                })
                            }
                            else{
                                this.replaceSubCapabilitiesArray(prevState.capabilitiesArrayIndex + 1)
                                return {
                                    capabilitiesArrayIndex: prevState.capabilitiesArrayIndex + 1,
                                    arrayIndex: 0
                                }
                                }
                            

                        }
                        else {
                            return { arrayIndex: prevState.arrayIndex + 1 }
                        }
                    })

                    this.getQuestionnaire()
                    
                }
                else {
                    console.log("errored out")
                }
            })
            this.setState({
                currentSelected:"",
                targetSelected:""
            })

    }


    previousSubCapability = async () => {

        if (this.state.arrayIndex > 0) {

            await this.setState(function (prevState, props) {
                return { arrayIndex: prevState.arrayIndex - 1,
                        showContinue:true }
            })

            this.getQuestionnaire();
        }
        else {
            if (this.state.capabilitiesArrayIndex > 0) {

                await this.setState(function (prevState, props) {
                    return {
                        capabilitiesArrayIndex: prevState.capabilitiesArrayIndex - 1,
                        arrayIndex: 0,
                        showContinue:true
                    }
                })
            }
            this.replaceSubCapabilitiesArray(this.state.capabilitiesArrayIndex)

            this.getQuestionnaire();
        }
    }


    saveAndExit = () => {
        let saveAssessment = {
            "currentLevel": this.state.currentValue ? this.state.currentValue : -1,
            "targetLevel": this.state.targetValue ? this.state.targetValue : -1,
            "subCapability": subCapabilitiesArray[this.state.arrayIndex].subcapabilityName,
            "siteid": localStorage.getItem("siteId")
        }
        apiPostHeader.body = JSON.stringify(saveAssessment);
        fetch(questionnaire.saveAssessment, apiPostHeader)
            .then(resp => resp.json())
            .then(resp => {
                if (resp.successMsg) {
                    this.props.history.push({
                        pathname: "/reports",
                        companyName: this.props.history.location.clientName,
                        locationString: this.props.history.location.siteName,
                        industryType: this.props.history.location.sector,
                        loadComponentString: "assessments"
                    })
                }
                else {
                    console.log("errored out at save and exit")
                }
            })
    }

    
    handleChangeCurrent = async (e) => {
        let value;
        if (e.target) {
            value = e.target.value;
            value = value[value.length - 1];
        } else {
            value = e;
            value = value[value.length - 1];
        }
        await this.setState({
            currentSelected: e.target ? e.target.value : e
        })
        this.state.currentSelected ? this.setCurrentValue(value) : this.setCurrentValue("")
    }


    loadingScreen() {
        return (
            <div className="loader">
                <Spinner animation="border" variant="success" />
                <p>Loading page...</p>
            </div>
        )
    }

    handleTargetChange = async (e) => {
        let value;
        if (e.target) {
            value = e.target.value;
            value = value[value.length - 1];
        } else {
            value = e;
            value = value[value.length - 1];
        }
        await this.setState({
            targetSelected: e.target ? e.target.value : e
        })
        this.state.targetSelected ? this.setTargetValue(value) : this.setTargetValue("")
    }


    render() {
        return (
            <div className="questionnaire-main-container">
                {/* {this.state.showLoader&&this.loadingScreen()} */}
                <QuestionnaireHeader data={this.state.headerValues} />
                <div className="navigation-button-group">
                    <QuestionnaireNavigation labelName="Previous" customClass="prev" onClick={this.previousSubCapability} /><QuestionnaireNavigation labelName="Skip Question" onClick={this.skipFlag}/>
                </div>
                <div className="questions-and-targets">
                    <GeneralQuestions data={this.state.questions} flagQuestions={this.focusInput} />
                    <span className="targets">
                        <TargetSelect
                            handleChangeCurrent={this.handleChangeCurrent}
                            handleTargetChange={this.handleTargetChange}
                            currentvalue={this.state.currentSelected}
                            targetvalue={this.state.targetSelected} />
                        <div className="button-group">
                            <SaveandExitButton labelName="Save and Exit" onClick={this.saveAndExit} />
                            {this.state.showContinue&&<FormNavigationButton labelName="Continue" onClick={this.continueNav} />}

                        </div>
                    </span>
                </div>
                <div className="bottom-border"></div>
                <div className="scoring">
                    <div className="scoring-text-main">Scoring</div>
                    <div className="scoring-text-main-container">
                        {Object.keys(this.state.scoringDetails).map((element, index) => {
                            return (
                                <div className="scoring-text-container" key={index}>
                                    <div className="scoring-range">
                                        {element}
                                        <span className="flag-button"><CustomButton imgSrc={flagIcon} clickFunction={(element) => this.focusInput(element)} /></span>
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
                <div className="notes-container">
                    <div className="notes-title">Notes</div>
                    <div className="text-area" >
                        {!this.state.showTextEditor && <CustomButton imgSrc={addIcon} clickFunction={this.showTextEditor} />}
                        {this.state.showTextEditor && <TextEditor textAreaValue={this.textAreaValue} value={this.state.textEditorData} />}
                    </div>
                    <div className="character-count-submit">
                        {this.state.showTextEditor && <div className="character-count">{this.state.textArealength}/3000 characters</div>}
                        {this.state.showTextEditor && <FormNavigationButton labelName="Submit" onClick={this.submitNotes} />}
                    </div>
                </div>
                {this.state.notesDetails ? this.state.showNotes && this.state.notesDetails.map(element => {
                    return (
                        <NotesComponent data={element} textAreaClick={this.textAreaClick} />
                    )
                }) : ""}
            </div>
        )
    }
}



export default withRouter(QuestionnairePage)