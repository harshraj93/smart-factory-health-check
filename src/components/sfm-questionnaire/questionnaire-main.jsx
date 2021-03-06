import React from 'react';
import { withRouter } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { QuestionnaireNavigation, SaveandExitButton, FormNavigationButton, CustomButton } from '../../assets/sfm-button';
import GeneralQuestions from './general-questions';
import flagIcon from '../../images/icon-small-flagged-outline.svg';
import flagHighlitedIcon from '../../images/icon-small-flagged-highlited.svg';
import addIcon from '../../images/icon-small-add-black.svg';
import TextEditor from './text-editor-component';
import TargetSelect from './target-select';
import NotesComponent from './notes-component';
import questionnaire from '../../api/questionnaire/questionnaire';
import { apiGetHeader, apiPostHeader } from '../../api/main/mainapistorage';
import Spinner from 'react-bootstrap/Spinner';
import Modal from "react-bootstrap/Modal";


let capabilitiesArray = [];
let subCapabilitiesArray = [];
let globcurrentValue, globtargetValue;

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
                    <ProgressBar now={props.progressValue} variant="success" />
                    <span className="progress-status">{props.progressValue}% complete</span>
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
            flagType: "",
            flagTypeCopy: "",
            currentSelected: "",
            targetSelected: "",
            showLoader: "",
            skipFlag: "",
            showSkipped: "",
            progressValue: "",
            submitBtnDisabled: false,
            generalQuestionsFlagHighlited: false,
            lowQuestion: "",
            lowFlagHighlited: false,
            mediumQuestion: "",
            mediumFlagHighlited: false,
            highQuestion: "",
            highFlagHighlited: false,
            placeholder: ""
        }
        this.props.disableMenu(false);
    }


    showTextEditor = async () => {
        let noteText = "";
        await this.setState({
            showTextEditor: true,
            textAreaNotesValue: noteText,
            textEditorData : noteText,
            flagType: "",
            flagTypeCopy: "",
            textArealength: noteText.length,
            submitBtnDisabled: true,
            placeholder: "Type something here ..."
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


    setCurrentValue = async (currentValue) => {
        globcurrentValue = currentValue
    }

    componentWillUnmount = ()=>{
        globcurrentValue="";
        globtargetValue = ""
    }

    setTargetValue = async (targetValue) => {
        globtargetValue = targetValue
    }


    skipFlag = async () => {
        let skipBody = {
            "subCapability": subCapabilitiesArray[this.state.arrayIndex].subcapabilityId,
            "siteid": localStorage.getItem("siteId")
        }
        apiPostHeader.body = JSON.stringify(skipBody)
        fetch(questionnaire.skipFlag, apiPostHeader)
            .then(resp => resp.json())
            .then(resp => { }
            )
        await this.setState(function (prevState, props) {
            if (this.state.arrayIndex + 1 === subCapabilitiesArray.length) {
                if (prevState.capabilitiesArrayIndex + 1 === capabilitiesArray.length) {
                    this.props.history.push({
                        pathname: "/reports",
                        companyName: this.props.history.location.clientName,
                        locationString: this.props.history.location.siteName,
                        industryType: this.props.history.location.sector,
                        loadComponentString: "assessments",
                        siteid: localStorage.getItem("siteId")
                    })
                }
                else {
                    this.replaceSubCapabilitiesArray(prevState.capabilitiesArrayIndex + 1)
                    return {
                        capabilitiesArrayIndex: prevState.capabilitiesArrayIndex + 1,
                        arrayIndex: 0,
                        skipFlag: false
                    }
                }


            }
            else {
                return { arrayIndex: prevState.arrayIndex + 1, skipFlag: false }
            }
        })
        globcurrentValue="";
        globtargetValue = ""
        await this.setState({
            targetSelected:"",
            currentSelected:""
        })
        this.getQuestionnaire()

    }


    parseQuestionnaire = async (questionnaireResponse) => {
        fetch(questionnaire.getProgress + `?siteId=${localStorage.getItem("siteId")}&businessfunctionId=${localStorage.getItem("businessfunctionId")}&capabilityId=${capabilitiesArray[this.state.capabilitiesArrayIndex].capabilityId}`, apiGetHeader)
            .then(resp => resp.json())
            .then(async(resp) => {
               await this.setState({
                    progressValue: Math.round(resp.progress, 4),
                    targetValue: questionnaireResponse.targetLevel ? questionnaireResponse.targetLevel : "",
                    currentValue: questionnaireResponse.currentLevel ? questionnaireResponse.currentLevel : "",
                    // currentSelected:questionnaireResponse.currentLevel?questionnaireResponse.currentLevel:"",
                    // targetSelected:questionnaireResponse.targetLevel?questionnaireResponse.targetLevel:""
                })
            });

        let headerValues = {
            title: subCapabilitiesArray[this.state.arrayIndex].businessFunctionName,
            Capabilities: capabilitiesArray[this.state.capabilitiesArrayIndex].capabilityName,
            subCapabilities: subCapabilitiesArray[this.state.arrayIndex].subcapabilityName,
            subCapabilityNum: this.state.arrayIndex + 1,
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
                lowQuestion : questionnaireResponse.low,
                mediumQuestion : questionnaireResponse.medium,
                highQuestion : questionnaireResponse.high,
                lowFlagHighlited : questionnaireResponse.lowFlag,
                mediumFlagHighlited : questionnaireResponse.mediumFlag,
                highFlagHighlited : questionnaireResponse.highFlag,
                notesDetails: notesDetails,
                // showSkipped: subCapabilitiesArray[prevState.arrayIndex].skipQuestionFlag
                showSkipped: questionnaireResponse.skipQuestionFlag,
                generalQuestionsFlagHighlited : questionnaireResponse.questionFlag
            }
        })
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
                return (element.isIncomplete ? element : "")
            })
            if (subCapabilityNameArray.length == 0) {
                subCapabilityNameArray = [capabilitiesArray[0]]
            }
        }
        subCapabilityName = subCapabilityNameArray[0].subcapabilities.filter(subcapability => {
            return (subcapability.isIncomplete ? subcapability : subcapability[0])
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
            localStorage.setItem("businessfunctionId", this.props.location.businessFunctionID);
            localStorage.setItem("siteId", this.props.location.siteid);
            businessFunctionName = localStorage.getItem("businessfunctionId");
            //localStorage.setItem("siteId", "ST_002");

            if (businessFunctionName.includes("&")) {
                businessFunctionName = businessFunctionName.replace("&", "%26")
                localStorage.setItem("businessfunctionId", businessFunctionName);
            }
            //localStorage.setItem("businessfunctionId", "Procurement  %26  Supplier Management");
        }
        fetch(questionnaire.getCapabilities + `?siteId=${localStorage.getItem("siteId")}&businessfunctionId=${businessFunctionName}`, apiGetHeader)
            .then(resp => resp.json())
            .then(resp => this.parseSubCapabilities(resp))
        //  fetch(questionnaire.getCapabilities + `?siteId=ST_002&businessfunctionId=Procurement %26 Supplier Management`, apiGetHeader)
        //     .then(resp => resp.json())
        //     .then(resp => {console.log(resp); this.parseSubCapabilities(resp)})
    }


    submitNotes = async () => {
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
            "resourceEmailId": this.props.userEmail === "" ? "akpm@deloitte.com" : this.props.userEmail,
            "note": this.state.textAreaNotesValue,
            "timestamp": Str,
            "flagType": this.state.flagType
        }
        apiPostHeader.body = JSON.stringify(notesSubmission);
        fetch(questionnaire.addAssessmentNote, apiPostHeader)
            .then(resp => resp.json())
            .then(resp => {
                if (resp.resultantJSON.successMsg) {
                    switch (this.state.flagType) {
                        case "General Questions":
                            // generalFlag = true
                            this.setState({
                                generalQuestionsFlagHighlited : true
                            })
                            break;
                        case "Low":
                            // lowFlag = true
                            this.setState({
                                lowFlagHighlited : true
                            })
                            break;
                        case "Medium":
                            // mediumFlag = true
                            this.setState({
                                mediumFlagHighlited : true
                            })
                            break;
                        case "High":
                            // highFlag = true
                            this.setState({
                                highFlagHighlited : true
                            })
                            break;
                        default:
                        // code block
                    }
                    this.setState({
                        showTextEditor: false,
                        showNotes: true,
                        textEditorData: "",
                        textAreaNotesValue: "",
                        flagType: "",
                        flagTypeCopy: "",
                        // generalQuestionsFlagHighlited: true
                    })
                    this.getQuestionnaire();
                }
                else {
                    this.setState({
                        showTextEditor: false,
                        showNotes: true,
                        textEditorData: "",
                        textAreaNotesValue: "",
                        flagType: "",
                        flagTypeCopy: ""
                    })
                    console.log("errored out notes")
                }
            })

    }


    focusInput = async (ele) => {
        // console.log("flagType", this.state.flagType)
        // console.log("flagTypeCopy", this.state.flagTypeCopy)
        // if (ele !== "General Questions") {
        //     ele = ele.replace(/ *\([^)]*\) */g, "");
        // } else {
        //     ele = "General Questions";
        //     this.setState({
        //         generalQuestionsFlagHighlited : true
        //     })
        // }

        switch (ele) {
            case "General Questions":
                // generalFlag = true
                this.setState({
                    generalQuestionsFlagHighlited : true
                })
                break;
            case "Low":
                // lowFlag = true
                this.setState({
                    lowFlagHighlited : true
                })
                break;
            case "Medium":
                // mediumFlag = true
                this.setState({
                    mediumFlagHighlited : true
                })
                break;
            case "High":
                // highFlag = true
                this.setState({
                    highFlagHighlited : true
                })
                break;
            default:
            // code block
        }

        if (ele !== this.state.flagTypeCopy && this.state.flagTypeCopy !== "" ) {
            this.setState({
                flagType : ele
            })
            this.submitNotes();
        }

        let placeholder = "";

        switch (ele) {
            case "General Questions":
                placeholder = "This general question is being flagged because ..."
                break;
            case "Low":
                placeholder = "This low rubric rating is being flagged because ..."
                break;
            case "Medium":
                placeholder = "This medium rubric rating is being flagged because ..."
                break;
            case "High":
                placeholder = "This high rubric rating is being flagged because ..."
                break;
            default:
            // code block
        }

        await this.setState({
            showTextEditor: true,
            flagType: ele,
            flagTypeCopy: ele,
            textAreaNotesValue : placeholder,
            textEditorData : placeholder,
            textArealength: placeholder.length,
            submitBtnDisabled : placeholder.length !== 0 ? false : true
        })
        document.getElementsByClassName("notes-editor-area")[0].scrollIntoView({ behaviour: "smooth" });
        document.getElementsByClassName("notes-editor-area")[0].click();
    }


    textAreaClick = async (e) => {
        let textAreaText = e.target.innerHTML;
        await this.setState({
            showTextEditor: true,
            textEditorData: (textAreaText),
            showNotes: false
        })
    }


    textAreaValue = async (value) => {
        await this.setState({
            textAreaNotesValue: value,
            textArealength: value.toString('html').replace(/<[^>]+>/g, '').length
        })

        if (this.state.textArealength === 0) {
            this.setState({
                submitBtnDisabled : true
            })
        } else {
            this.setState({
                submitBtnDisabled : false
            })
        }
    }


    componentDidMount = () => {
        this.getSubCapability();
        document.addEventListener('mousedown', this.handleClickOutside);
    }


    // componentWillUnmount() {
    //     document.removeEventListener('mousedown', this.handleClickOutside);
    // }


    replaceSubCapabilitiesArray = async (arrayCapabilitiesIndex, flag) => {
        if (arrayCapabilitiesIndex < capabilitiesArray.length) {
            subCapabilitiesArray = capabilitiesArray[arrayCapabilitiesIndex].subcapabilities;
        }
        if (flag === "prev") {

            await this.setState({
                arrayIndex: subCapabilitiesArray.length - 1
            })

        }
    }

    continueNav = async () => {
        console.log(globcurrentValue)
        let saveAssessment = {
            "currentLevel": globcurrentValue ? globcurrentValue : -1,
            "targetLevel": globtargetValue ? globtargetValue : -1,
            "subCapability": subCapabilitiesArray[this.state.arrayIndex].subcapabilityId,
            "siteid": localStorage.getItem("siteId")
        }
        apiPostHeader.body = JSON.stringify(saveAssessment);
        fetch(questionnaire.saveAssessment, apiPostHeader)
            .then(resp => resp.json())
            .then(resp => {
            })
        await this.setState(function (prevState, props) {
            //console.log(this.state.arrayIndex+1,Number(this.state.capabilitiesArrayIndex)+1,subCapabilitiesArray.length,capabilitiesArray.length)
            if (this.state.arrayIndex + 1 === subCapabilitiesArray.length) {
                if (this.state.capabilitiesArrayIndex + 1 === capabilitiesArray.length) {
                    this.setState({
                        showContinue: false
                    })
                }
                else {
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
        this.getQuestionnaire();
        globcurrentValue="";
        globtargetValue = ""
        await this.setState({
            targetSelected: "",
            currentSelected: ""
        })
    }


    previousSubCapability = async () => {

        if (this.state.arrayIndex > 0) {

            await this.setState(function (prevState, props) {
                return {
                    arrayIndex: prevState.arrayIndex - 1,
                    showContinue: true
                }
            })
        }
        else {
            if (this.state.capabilitiesArrayIndex > 0) {
                await this.setState(function (prevState, props) {
                    return {
                        capabilitiesArrayIndex: prevState.capabilitiesArrayIndex - 1,

                        showContinue: true
                    }
                })
                this.replaceSubCapabilitiesArray(this.state.capabilitiesArrayIndex, "prev")
            }

        }

        this.getQuestionnaire();
        globcurrentValue="";
        globtargetValue = ""
        await this.setState({
            targetSelected: "",
            currentSelected: ""
        })
    }

    saveAndExit = () => {
        let saveAssessment = {
            "currentLevel": globcurrentValue ? globcurrentValue : -1,
            "targetLevel": globtargetValue ? globtargetValue : -1,
            "subCapability": subCapabilitiesArray[this.state.arrayIndex].subcapabilityId,
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
                        loadComponentString: "assessments",
                        siteid: localStorage.getItem("siteId")
                    })
                }
                else {
                    console.log("errored out at save and exit")
                }
            })
    }


 


    loadingScreen() {
        return (
            <div className="loader">
                <Spinner animation="border" variant="success" />
                <p>Loading page...</p>
            </div>
        )
    }

    closeSkipPopup = () => {
        this.setState({
            skipFlag: false
        })
    }

    skipModal = () => {
        return (
            <div className="publish-modal">
                <Modal show={this.state.skipFlag} onHide={this.closeSkipPopup} centered>
                    <Modal.Header>
                        <Modal.Title>Skip Question</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>If you skip this question it will not be included in the report card.</Modal.Body>
                    <Modal.Footer>
                        <SaveandExitButton labelName="Cancel" onClick={this.closeSkipPopup} />
                        <FormNavigationButton labelName="Skip" onClick={this.skipFlag} />
                    </Modal.Footer>
                </Modal>
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
        this.state.targetSelected ? await this.setTargetValue(value) : await this.setTargetValue("")
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
        this.state.currentSelected ? await this.setCurrentValue(value) : await this.setCurrentValue("")
    }

    showskipPopup = () => {
        this.setState({
            skipFlag: true
        })
    }

    cancelNote = () => {
        switch (this.state.flagType) {
            case "General Questions":
                // generalFlag = true
                this.setState({
                    generalQuestionsFlagHighlited : false
                })
                break;
            case "Low":
                // lowFlag = true
                this.setState({
                    lowFlagHighlited : false
                })
                break;
            case "Medium":
                // mediumFlag = true
                this.setState({
                    mediumFlagHighlited : false
                })
                break;
            case "High":
                // highFlag = true
                this.setState({
                    highFlagHighlited : false
                })
                break;
            default:
            // code block
        }
        this.setState({
            showTextEditor: false,
            flagType: "",
            flagTypeCopy: "",
            textAreaNotesValue : "",
            textEditorData : "",
            textArealength: 0,
            submitBtnDisabled: false,
            // generalQuestionsFlagHighlited: false
        })
    }


    render() {
        // const { placeholder } = this.state;
        // console.log("email", this.props.userEmail)
        return (
            <div className="questionnaire-main-container">
                {/* {this.state.showLoader&&this.loadingScreen()} */}

                <QuestionnaireHeader data={this.state.headerValues} progressValue={this.state.progressValue} />
                {this.state.showSkipped && <div className="skipped-question">This question has previously been skipped</div>}
                <div className="navigation-button-group">
                    <QuestionnaireNavigation labelName="Previous" customClass="prev" onClick={this.previousSubCapability} /><QuestionnaireNavigation labelName="Skip Question" onClick={this.showskipPopup} />
                </div>
                <div className="questions-and-targets">
                    <GeneralQuestions data={this.state.questions} flagQuestions={() => this.focusInput("General Questions")} flagHighlited={this.state.generalQuestionsFlagHighlited}/>
                    <span className="targets">
                        <TargetSelect
                            handleChangeCurrent={this.handleChangeCurrent}
                            handleTargetChange={this.handleTargetChange}
                            currentvalue={this.state.currentSelected}
                            targetvalue={this.state.targetSelected} />
                        <div className="button-group">
                            <SaveandExitButton labelName="Save and Exit" onClick={this.saveAndExit} />
                            {this.state.showContinue && <FormNavigationButton labelName="Continue" onClick={this.continueNav} />}

                        </div>
                    </span>
                </div>
                <div className="bottom-border"></div>
                <div className="scoring">
                    <div className="scoring-text-main">Scoring</div>
                    <div className="scoring-text-main-container">
                        {/* {Object.keys(this.state.scoringDetails).map((element, index) => {
                            return ( */}
                                <div className="scoring-text-container">
                                    <div className="scoring-range">
                                        {"Low(2)"}
                                        <span className="flag-button">
                                            {this.state.lowFlagHighlited === false  ? (<CustomButton imgSrc={flagIcon} clickFunction={() => this.focusInput("Low")} />) : (<CustomButton imgSrc={flagHighlitedIcon} />)}
                                        </span>
                                    </div>
                                    <div className="scoring-info">
                                        {this.state.lowQuestion}
                                    </div>
                                </div>

                                <div className="scoring-text-container">
                                    <div className="scoring-range">
                                        {"Medium(4)"}
                                        <span className="flag-button">
                                            {this.state.mediumFlagHighlited === false  ? (<CustomButton imgSrc={flagIcon} clickFunction={() => this.focusInput("Medium")} />) : (<CustomButton imgSrc={flagHighlitedIcon} />)}
                                        </span>
                                    </div>
                                    <div className="scoring-info">
                                        {this.state.mediumQuestion}
                                    </div>
                                </div>

                                <div className="scoring-text-container">
                                    <div className="scoring-range">
                                        {"High(6)"}
                                        <span className="flag-button">
                                            {this.state.highFlagHighlited === false  ? (<CustomButton imgSrc={flagIcon} clickFunction={() => this.focusInput("High")} />) : (<CustomButton imgSrc={flagHighlitedIcon} />)}
                                        </span>
                                    </div>
                                    <div className="scoring-info">
                                        {this.state.highQuestion}
                                    </div>
                                </div>
                            {/* )
                        })} */}
                    </div>
                </div>
                <div className="bottom-border"></div>
                <div className="notes-container">
                    <div className="notes-title">Notes</div>
                    <div className="text-area" >
                        {!this.state.showTextEditor && <CustomButton imgSrc={addIcon} clickFunction={this.showTextEditor} />}
                        {this.state.showTextEditor && <TextEditor textAreaValue={this.textAreaValue} value={this.state.textEditorData} placeholder={this.state.placeholder}/>}
                    </div>
                    <div className="character-count-submit">
                        {this.state.showTextEditor && <div className="character-count">{this.state.textArealength}/1000 characters</div>}
                        {this.state.showTextEditor && <SaveandExitButton labelName="Cancel" onClick={this.cancelNote} />}
                        {this.state.showTextEditor && <FormNavigationButton disabled={this.state.submitBtnDisabled} labelName="Submit" onClick={this.submitNotes} />}
                    </div>
                </div>
                {this.state.notesDetails ? this.state.showNotes && this.state.notesDetails.map(element => {
                    return (
                        <NotesComponent data={element} textAreaClick={this.textAreaClick} />
                    )
                }) : ""}
                {this.state.skipFlag && this.skipModal()}
            </div>
        )
    }
}



export default withRouter(QuestionnairePage)