import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Spinner from 'react-bootstrap/Spinner'
import {CustomButton,FormNavigationButton, SaveandExitButton} from '../../assets/sfm-button';
import leftIcon from '../../images/icon-small-chevron-left.svg';
import DeleteIcon from '../../images/combined-shape.svg';
import DropDownImg from '../../images/icon-small-chevron-down.svg';
import ReportsOverview from './sfm-reports-overview/sfm-reports-overview';
import DemographicsForm from './sfm-reports-demographics/demographics-form';
import AssessmentsOverview from './sfm-assessments-overview/sfm-assessments-overview';
import Notes from './sfm-notes/sfm-notes';
import SiteInfo from './sfm-assessments-site-info/sfm-assessments-site-info';
import ClientInfo from './sfm-assessments-client-info/sfm-assessments-client-info';
import {withRouter} from 'react-router-dom';
import {resultsApi} from '../../api/assessments/reports'
import assessOverviewApi from '../../api/assessments/assess-overview';
import assessNotesApi from '../../api/assessments/assess-notes';
import siteInfoApi from '../../api/assessments/assess-siteInfo';
import {apiPostHeader, apiGetHeader} from '../../api/main/mainapistorage'
import Modal from "react-bootstrap/Modal";

let inProgressList=["Overview","Notes","Site Info","Client Info"];
// let resultsList=["Overview","Demographics"];
let resultsList=[];
let allPoc = false;

let colors = [];

class Reports extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:"Overview",
            companyName:"",
            locationName:"",
            reportsOverview: {},
            assessOverview: {},
            loadComponentString:"",
            clientReportsData:null,
            x: false,
            demographicsData:[],
            assessBody: {},
            notesData: {},
            siteInfoData: {},
            publishResults:false,
            businessContactModal:false,
            shareResults:false,
            userProfile:true,
            userName:  "",
            password: "",
            clipboardCopySuccess: false,
        }
        this.props.disableMenu(false);        
    }

    
    selectTab = (event)=>{
        if(event==="0"){
            this.setState({
                title:"Overview"
            })
        }
        else{
            this.setState({
                title:"Demographic"
            })
        }
    }


    navigateBack = ()=>{
        this.props.history.push({
            pathname:"/"
        })
    }


    navigateBackFromResults = async() => {
        await this.setState({
            loadComponentString: "assessments"
        })
    }
    

    navigateToBusinessPOC = async() => {
        await this.setState({
            loadComponentString: "assessments",
            businessContactModal:false
        })
        document.getElementsByClassName("nav-item nav-link")[2].click();
        document.getElementById("Continuous Improvement").scrollIntoView();
        document.getElementById("Continuous Improvement").click();
    }


    closePublishPopup = ()=>{
        this.setState({
            publishResults:false
        })
    }

    shareResults = async() => {
        let userInfo = resultsApi.userInfoDetails+`?siteid=${this.props.location.siteid}`
        const response = await fetch(userInfo,apiGetHeader)
        const demo = await response.json();
        this.setState({
            publishResults:false,
            shareResults:true,
            userName: demo.resultantJSON.emailOrUsername,
            password: demo.resultantJSON.defaultPassword,
        })
    }

    copyLink = () => {
        var copyText = document.getElementById("linkURL").baseURI
        navigator.clipboard.writeText(copyText);
        this.setState({
            clipboardCopySuccess: true
        })
        // console.log("copyText", copyText)
    }

    publishModal = ()=>{
        return(
            <div className = "publish-modal">
    <Modal show={this.state.publishResults} onHide={this.closePublishPopup} centered>
        <Modal.Header>
          <Modal.Title>Publish Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>Would you like to publish the results?</Modal.Body>
        <Modal.Footer>
          <SaveandExitButton labelName = "No" onClick={this.closePublishPopup}/>
          <FormNavigationButton labelName = "Yes" onClick={this.shareResults}/>
        </Modal.Footer>
      </Modal>
      </div>
      )
    }


    shareResultsModal = ()=>{
        return(
            <div className = "publish-modal">
    <Modal show={this.state.shareResults} onHide={this.closeShareResults} centered>
        <Modal.Header closeButton>
          <Modal.Title>Share Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>The results have been published.</Modal.Body>
        <Modal.Footer>
            <>
            <div className="share-results">
                <div className="Username"><span>Username:</span>{this.state.userName}</div>
                <div className="Username"><span>Password:</span>{this.state.password}</div>
                {/* <div id="linkURL" className="link">{window.location.href}</div> */}
                <input type="text" readonly id="linkURL" value={window.location.href} className="link"/>

          
            </div>
            {this.state.clipboardCopySuccess === false ? 
            (<div className="button-group">
                <FormNavigationButton labelName = "Send Email"/>
                <FormNavigationButton labelName = "Copy Link" onClick={this.copyLink}/>
            </div>) : 
            (<div className="linkCopySuccess">Link Copied to Clipboard</div>)
            }
            </>
        </Modal.Footer>
      </Modal>
      </div>
      )
    }


    closeShareResults = ()=>{
        this.setState({
            shareResults:false
        })
    }


    showPopup = (e,popupToLoad)=>{
        if(popupToLoad==="publishResults"){
        this.setState({
            publishResults:true,
            clipboardCopySuccess: false,
        })
        }
        else{
            this.setState({
                businessContactModal:true
            })
        }
    }


    closeBusinessContactModal = ()=>{
        this.setState({
            businessContactModal:false
        })
    }


    publishBusinessContactModal = ()=>{
        return(
            <div className = "publish-modal">
    <Modal show={this.state.businessContactModal} onHide={this.closeBusinessContactModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Publish Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>Would you like to publish the results?</Modal.Body>
        <Modal.Footer>
          <div className="publish-business-poc">
              <span className="text">In order to publish you must first fill out the Point of Contacts section.</span>
              <FormNavigationButton labelName="Complete" onClick={this.navigateToBusinessPOC}></FormNavigationButton>
          </div>
        </Modal.Footer>
    </Modal>
      </div>
      )
    }


    resultHeader = ()=>{
        this.props.profile === "Client" ? resultsList = ["Overview"] : resultsList = ["Overview","Demographics"]
        return(
            <div className="reports-container">
            <div className="assessment-title">
            <div className="assessment-overview-title">
                {this.props.profile !== "Client" ? <CustomButton imgSrc={leftIcon} clickFunction={JSON.stringify(this.state.assessOverview) !== "{}"?this.navigateBackFromResults:this.navigateBack}/> : ""}
                <span className="title-text">
                    {"Results "+this.state.title}
                </span>
                <div className="remove-site" style={{opacity: "0"}}>
                    <img src={DeleteIcon} alt=""/>
                    <p style={{margin: "0", marginLeft: "10px"}}> Remove Site</p>
                </div>
            </div>
            <h2 className="location-name">
            {this.props.location.locationString!==undefined?this.props.location.locationString:"Bristol"}
            
            </h2>
                
            <h5 className="company-name">
            {this.props.location.companyName!==undefined?this.props.location.companyName:"Conagra"}
            </h5>
            <span className="share-link">
             {this.props.profile  !== "Client" && <FormNavigationButton labelName="Publish" onClick={(e)=>this.showPopup(e,allPoc?"publishResults":"business")}/>}
            </span>
            {this.state.publishResults&&this.publishModal()}
            {this.state.businessContactModal&&this.publishBusinessContactModal()}
            {this.state.shareResults&&this.shareResultsModal()}
            <Tabs className="tab-group" onSelect={this.selectTab}>
            
                {resultsList.map((element,index)=>{
                    return(
                        
                        <Tab key={index} eventKey={index} title={element} >
                            {(element==="Demographics" &&  this.state.demographicsData) ?<DemographicsForm formData={this.state.demographicsData}/>:<ReportsOverview data={this.state.reportsOverview} profile={this.props.profile}/>}

                        </Tab>
                    )
                })}
            </Tabs>
           
            </div>
            </div>
        )
    }

    networkHeader = () => {
        this.props.profile === "Client" ? resultsList = ["Overview"] : resultsList = ["Overview","Demographics"]
        return(
            <div className="reports-container">
                <div className="assessment-title">
                    <div className="assessment-overview-title">
                        {this.props.profile !== "Client" ? <CustomButton imgSrc={leftIcon} clickFunction={this.navigateBack}/> : ""}
                        <span className="title-text">
                            {this.props.location.sector+" Network"}
                        </span>
                    </div>
                    <h2 className="location-name">
                        {this.props.location.clientName!==undefined?this.props.location.clientName:""}
                    </h2>
                    <span className="share-link">
                        <FormNavigationButton labelName="Publish" />
                    </span>
                    
                    <Tabs className="tab-group" onSelect={this.selectTab}>
                        {resultsList.map((element,index)=>{
                            return(
                                <Tab key={index} eventKey={index} title={element} >
                                    {element==="Demographics"?"":<ReportsOverview data={this.state.clientReportsData} colors ={colors} profile={this.props.profile}/>}

                                </Tab>
                            )
                        })}
                    </Tabs>
                </div>
            </div>
        )
    }

    editToggle = () => {
        if (this.state.x) {
            this.setState({
                x: false
            });
        }
        else {
            this.setState({
                x: true
            });
        }
    }

    deleteModal = () => {
        return (
            <div className="delete-modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <p>Remove Site</p>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to remove this site?</p>
                    </div>
                    <div className="modal-footer">
                        <CustomButton labelName="Cancel" style={{backgroundColor: "#232325", boxShadow: "0 0 0 2px inset #616161"}} clickFunction={this.editToggle}/>
                        <CustomButton labelName="Delete Site" clickFunction={this.editToggle}/>
                    </div>
                </div>
            </div>
        )
    }

    goToResults = async()=> {
        let resultJSON = await this.fetchResultsData();
        let demographicsData = await this.fetchDemographicsData();
        resultJSON.resultantJSON.siteid = this.props.location.siteid;
        await this.setState({
            data:resultJSON.resultantJSON,
            reportsOverview:resultJSON.resultantJSON,
            demographicsData:demographicsData,
            loadComponentString: "results"
        })
    }

    AssessmentsHeader(){
        return(
            <div className="reports-container">
                {this.state.x?this.deleteModal():""}
                <div className="assessment-overview-title">
                    {this.props.profile !== "Client" ? <CustomButton imgSrc={leftIcon} clickFunction={this.navigateBack}/> : ""}
                    <span className="title-text">
                        Assessment Overview
                    </span>
                    <div className="remove-site" onClick={this.editToggle}>
                        <img src={DeleteIcon} alt=""/>
                        <p style={{margin: "0", marginLeft: "10px"}}> Remove Site</p>
                    </div>
                </div>
                <h2 className="location-name">{this.props.location.locationString!==undefined?this.props.location.locationString:"Bristol"}
                </h2>
                    
                <h5 className="company-name">{this.props.location.companyName!==undefined?this.props.location.companyName:"Conagra"}</h5>
                
                <div className="goToResults" onClick={this.goToResults}>
                    <span className="text">Go to Results</span>
                    <img src={DropDownImg} alt="" className="right-arrow"></img>
                </div>
                <Tabs className="tab-group">
                    {inProgressList.map((element,index)=>{
                        return(
                            <Tab key={index} eventKey={index} title={element}>
                                {element==="Overview"?<AssessmentsOverview data={this.state.assessOverview} overviewRefresh={this.overviewRefresh}/>:(element==="Notes"?<Notes data={this.state.notesData}/>:(element==="Site Info"?<SiteInfo data={this.state.siteInfoData}/>:<ClientInfo client={this.props.location.companyName}/>))}
                            </Tab>
                        )
                    })}
                </Tabs>
            </div>
        )
    }

    loadingScreen() {
        return (
            <div className="loader">
                {this.props.location.loadComponentString===undefined?"":<Spinner animation="border" variant="success" />}
                {this.props.location.loadComponentString===undefined?<p>No data. Please click on back button.</p>:<p>Loading {this.props.location.loadComponentString.toUpperCase()} page...</p>}
            </div>
        )
    }


    overviewRefresh = async() => {
        let overviewData = await this.fetchOverview();
        overviewData.clientName = this.props.location.companyName;
        overviewData.siteName = this.props.location.locationString;
        overviewData.sector = this.props.location.industryType;

        await this.setState({
            assessOverview: overviewData
        })
    }


    fetchOverview = async()=> {
        let body = {
            // "clientName": this.props.location.companyName, 
            // "siteName": this.props.location.locationString,
            // "sector":this.props.location.industryType
            "siteId":this.props.location.siteid
        }
        apiPostHeader.body = JSON.stringify(body);
        try{
        const response = await fetch(assessOverviewApi.assessOverview,apiPostHeader)
        const overviewData = await response.json();
        return overviewData;
        }
        catch(err){
            return err
        }
    }


    fetchNotes = async()=> {
        let body = {
            // "clientName": this.props.location.companyName, 
            // "siteName": this.props.location.locationString,
            // "sector":this.props.location.industryType
            "siteId":this.props.location.siteid
        }
        apiPostHeader.body = JSON.stringify(body);
        try{
        const response = await fetch(assessNotesApi.assessNotes,apiPostHeader)
        const notesData = await response.json();
        return notesData;
        }
        catch(err){
            return err
        }
    }

    fetchSiteInfo = async()=> {
        let body = {
            // "clientName": this.props.location.companyName, 
            // "siteName": this.props.location.locationString,
            // "sector":this.props.location.industryType
            "siteId":this.props.location.siteid
        }
        apiPostHeader.body = JSON.stringify(body);
        try{
        const response = await fetch(siteInfoApi.siteInfo,apiPostHeader)
        const siteInfoData = await response.json();
        return siteInfoData;
        }
        catch(err){
            return err
        }
    }

    fetchClientLevelData = async()=>{
        console.log("fetch")
        let body = { 
            "clientName": this.props.location.clientid, 
            "sector": this.props.location.sector
        };
        apiPostHeader.body = JSON.stringify(body);
        try{
        const response = await fetch(resultsApi.clientReport,apiPostHeader);
        const json =  await response.json();
        console.log(json);
        const data = this.formatClientLevelData(json.resultantJSON);
        data.clientid = this.props.location.clientid;
        data.sector = this.props.location.sector;
        console.log(data);
        return data; 
        }
        catch(err){
            return err
        }
    }

    numbersAvg(data, str) {
        let x = 0;
        data.map((element, index)=>{
            if (str === "score") {
                x += Number(element.score)
            }
            else if (str === "target") {
                x += Number(element.target)
            }
            else if (str === "low") {
                x += Number(element.low)
            }
            else if (str === "high") {
                x += Number(element.high)
            }
            else if (str === "indAvg") {
                x += Number(element.indAvg)
            }
        })
        return x/data.length;
    }

    sendSiteArray = (arr) => {
        let newarr = [];
        
        arr.map((data, index) => {
            let obj = {};
            obj.name = data.name;
            obj.score = data.score;
            obj.target = data.target;
            obj.indAvg = data.indAvg;
            obj.high = data.high;
            obj.low = data.low;

            newarr.push(obj);
        })
        return newarr;
    }

    sendBusinessFunction = (siteData) => {
        let reportData = [];

        siteData.map((data, index) => {
            data.businessFunctions.map((x, y) => {
                let obj = {};
                obj.id = x.id;
                obj.name = x.name;
                let sites = [];
                for (let a = 0; a < siteData.length; a++) {
                    let bizfunc = siteData[a].businessFunctions;
                    let siteObj = {};
                    for (let b = 0; b < bizfunc.length; b++) {
                        if (bizfunc[b].id === obj.id) {
                            siteObj.name = siteData[a].name;
                            siteObj.score = bizfunc[b].score;
                            siteObj.target = bizfunc[b].target;
                            siteObj.low = bizfunc[b].low;
                            siteObj.high = bizfunc[b].high;
                            siteObj.indAvg = bizfunc[b].mean;

                            sites.push(siteObj);
                            break;
                        }
                    }
                }
                obj.sites = sites;
                obj.score = this.numbersAvg(obj.sites, "score");
                obj.target = this.numbersAvg(obj.sites, "target");
                obj.low = this.numbersAvg(obj.sites, "low");
                obj.high = this.numbersAvg(obj.sites, "high");
                obj.indAvg = this.numbersAvg(obj.sites, "indAvg");

                let caps = new Set();
                x.capabilityData.map((i, j) => {
                    let capObj = {};
                    capObj.id = i.capability_id;
                    capObj.name = i.name;
                    let sites = [];
                    for (let a = 0; a < siteData.length; a++) {
                        let bizfunc = siteData[a].businessFunctions;
                        let siteObj = {};
                        for (let b = 0; b < bizfunc.length; b++) {
                            if (bizfunc[b].id === obj.id) {
                                let capData = bizfunc[b].capabilityData;
                                for (let c = 0; c < capData.length; c++) {
                                    if (capData[c].capability_id === capObj.id) {
                                        siteObj.name = siteData[a].name;
                                        siteObj.score = capData[c].score;
                                        siteObj.target = capData[c].target;
                                        siteObj.low = capData[c].low;
                                        siteObj.high = capData[c].high;
                                        siteObj.indAvg = capData[c].indAvg;
            
                                        sites.push(siteObj);
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                    }
                    // sites.push(this.numbersAvg(sites, "indAvg"))
                    capObj.sites = sites;
                    capObj.score = this.numbersAvg(capObj.sites, "score");
                    capObj.target = this.numbersAvg(capObj.sites, "target");
                    capObj.low = this.numbersAvg(capObj.sites, "low");
                    capObj.high = this.numbersAvg(capObj.sites, "high");
                    capObj.indAvg = this.numbersAvg(capObj.sites, "indAvg");

                    caps.add(JSON.stringify(capObj));
                })
                // console.log(caps)

                var arr = [...caps];
                let parts = [];
                for (var i = 0; i < arr.length; i++) {
                    parts.push(JSON.parse(arr[i]));
                }
                // console.log(parts)
                obj.parts = parts;

                reportData.push(JSON.stringify(obj));
            })
        });

        var arr = [...new Set(reportData)];
        var newarr = [];
        for (var i = 0; i < arr.length; i++) {
            newarr.push(JSON.parse(arr[i]));
        }

        return newarr;
    }

    formatClientLevelData = (data) => {
        let jsonData = {};
        jsonData.summary = data.summary;
        jsonData.overallRecs = data.overAllRecs;
        jsonData.sites = this.sendSiteArray(data.siteData);
        jsonData.reportsData = this.sendBusinessFunction(data.siteData);
        jsonData.target = this.numbersAvg(jsonData.sites, "target");
        // console.log(jsonData.target);
        // console.log("format data",jsonData);
        return jsonData;
    }

    fetchResultsData = async()=>{
        let body = { 
            // "clientName": this.props.location.companyName, 
            // "siteName": this.props.location.locationString,
            "siteId":this.props.location.siteid
        };
        let postHeader = (apiPostHeader);
        postHeader["body"] = JSON.stringify(body);
        try{
        const response = await fetch(resultsApi.getResults,postHeader)
        const json =  await response.json();
        return json; 
        }
        catch(err){
            return err
        }
    }


    checkPOCs = (data)=>{
        let pocDetails = data.resultantJSON.pocDetails;
        let cnt=0;
        pocDetails.forEach(element=>{
                if(element.ResourceName){
                    cnt++;
                }
                
        })
        
        if(cnt===pocDetails.length){
            allPoc = true;
        }
        
    }


    fetchDemographicsData = async()=>{
        let body = {
            // "clientName": this.props.location.companyName, 
            // "siteName": this.props.location.locationString,
            // "sector":this.props.location.industryType,
            "siteId":this.props.location.siteid
        }
        apiPostHeader.body = JSON.stringify(body);
        try{
        const response = await fetch(resultsApi.demographics,apiPostHeader)
        const demographicsData = await response.json();
        this.checkPOCs(demographicsData);
        return demographicsData;
        }
        catch(err){
            return err
        }   
    }


    clientUserProfile = async(userEmail)=>{
        // console.log(resultsApi)
        let pocName = resultsApi.reportOnly+`?pocName=${userEmail}`
        const response = await fetch(pocName,apiGetHeader)
        const demo = await response.json()
        return demo;
    }


    componentDidMount = async()=>{
        let resultJSON = {};
        let userProfile=this.props.profile;
        let userEmail=this.props.userEmail === "" ? "harshraj@deloitte.com" : this.props.userEmail;
        if(userProfile==="Client"){
            let resultsJSON = await this.clientUserProfile(userEmail)
            let demographicsData = {};
            // resultsJSON.resultantJSON.siteid = this.props.location.siteid;
            // demographicsData = await this.fetchDemographicsData();
            this.setState({
                loadComponentString:"results",
                // data:resultsJSON.resultantJSON,
                // demographicsData:demographicsData,
                reportsOverview:resultsJSON.resultantJSON,
            })
        }
        else{
        let demographicsData = {}; 
        let overviewData = {};
        let notesData = {};
        let siteInfoData={};
        let clientReportsData = {};
        let formattedClientReportsData = {};
        if (this.props.location.loadComponentString === "results" || this.state.loadComponentString === "results") {
            resultJSON = await this.fetchResultsData();
            demographicsData = await this.fetchDemographicsData();
            resultJSON.resultantJSON.siteid = this.props.location.siteid;
        }
        else if (this.props.location.loadComponentString === "assessments" || this.state.loadComponentString === "assessments") {
            overviewData = await this.fetchOverview();
            notesData = await this.fetchNotes();
            siteInfoData = await this.fetchSiteInfo();
            overviewData.clientName = this.props.location.companyName;
            overviewData.siteName = this.props.location.locationString;
            overviewData.sector = this.props.location.industryType;
            overviewData.siteid = this.props.location.siteid;
            notesData.resultantJSON.siteId = this.props.location.siteid;
            siteInfoData.resultantJSON.siteId = this.props.location.siteid;
            siteInfoData.resultantJSON.clientName = this.props.location.companyName;
        }
        else if (this.props.location.clientid) {
            clientReportsData = await this.fetchClientLevelData();
            // formattedClientReportsData = await this.formatClientLevelData(clientReportsData.resultantJSON);
            clientReportsData.sites.map((data, index)=> {
                colors.push(Math.floor(Math.random()*16777215).toString(16))
            });
            // console.log(colors);
        }
        this.setState({
            assessBody: {"clientName": this.props.location.companyName, 
            "siteName": this.props.location.locationString,
            "sector":this.props.location.industryType}
        })
        
        await this.setState({
            loadComponentString:this.props.location.loadComponentString,
            clientReportsData:clientReportsData,
            reportsOverview:resultJSON.resultantJSON,
            demographicsData:demographicsData,
            assessOverview: overviewData,
            notesData: notesData.resultantJSON,
            siteInfoData: siteInfoData.resultantJSON
        })
    }
    }

    render(){
        
    return(
    
      this.props.location.clientid?
            (this.networkHeader()):
            (this.state.loadComponentString==="results"?this.resultHeader():
                    (this.state.loadComponentString==="assessments"?this.AssessmentsHeader():this.loadingScreen()))
        
        
    )
}

}

export default withRouter(Reports)

// function displayComponent(tabName){
//     if(tabName==="Overview"){
//         return 
//     }
//     else if(tabName==="Notes"){
//         return
//     }
//     else if(tabName==="Site Info"){
//         return
//     }
//     else if(tabName==="Client Info"){
//         return 
//     }
// }