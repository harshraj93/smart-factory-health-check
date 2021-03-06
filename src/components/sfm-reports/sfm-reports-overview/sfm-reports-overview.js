import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'; 
import EditIcon from '../../../images/icon-small-edit.svg';
import ReorderIcon from '../../../images/icon-small-reorder.svg';
import Slider from './sfm-scorecard-slider/sfm-scorecard-slider';
import ReportsListView from './sfm-reports-listview/sfm-reports-listview';
import ReportsCardView from './sfm-reports-reportview/sfm-reports-reportview';
import {resultsApi} from '../../../api/assessments/reports'
import {apiPostHeader} from '../../../api/main/mainapistorage'

let tabValues = ["List","Report Card"];
let colors = [];

class ReportsOverview extends React.Component {
    constructor(props){
        super(props);
        this.state={
            title:"List",
            summaryEdit: false,
            recsEdit: false,
            summary: "Enter summary",
            overallRecs: "Enter Recommendations"
        }
    }

    editToggle = (str) => {
        if (str === "summary") {
            if (this.state.summaryEdit) {
                this.setState({
                    summaryEdit: false
                });
            }
            else {
                this.setState({
                    summaryEdit: true
                });
            }
        }
        else if (str === "recs") {
            if (this.state.recsEdit) {
                this.setState({
                    recsEdit: false
                });
            }
            else {
                this.setState({
                    recsEdit: true
                });
            }
        }
    }

    handleChangeRecs = (e)=>{
        this.setState({
            overallRecs:e.target.value
        });
    }

    saveClientRecs = async() => {
        let body = {
            "type": "recommendation",
            "data": this.state.overallRecs,
            "clientId": this.props.data.clientid,
            "sector": this.props.data.sector
        }
        apiPostHeader.body = JSON.stringify(body);
        let editresp;
        try{
            const response = await fetch(resultsApi.clientEditText,apiPostHeader)
            editresp = await response.json();
        }
        catch(err){
            editresp = err;
        }
        this.setState({
            recsEdit: false
        });
    }

    saveRecs = async() => {
        let body = {
            "type": "recommendation",
            "data": this.state.overallRecs,
            "siteid": this.props.data.siteid
        }
        apiPostHeader.body = JSON.stringify(body);
        let editresp;
        try{
            const response = await fetch(resultsApi.textEdit,apiPostHeader)
            editresp = await response.json();
        }
        catch(err){
            editresp = err;
        }
        this.setState({
            recsEdit: false
        });
    }

    recsTextFormat() {
        let points = this.state.overallRecs.split("\n");
        return (
            <ul className="recs-list">
                {points.map((data,index)=>{
                    return (
                    <li className="overall-recs-text">{points[index]}</li>
                    )
                })}
            </ul>
        )
    }

    overallRecsClientForm() {
        return (
            <InputGroup>
                <Form.Control as={"textarea"} maxLength={400} value={this.state.overallRecs} onChange={this.handleChangeRecs}/>
                <InputGroup.Append>
                    <Form.Text className="text-muted">
                        {this.state.overallRecs.length}/400 characters
                    </Form.Text>
                    <Button variant="primary" type="submit" onClick={this.saveClientRecs}>
                        Done
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }

    overallRecsForm() {
        return (
            <InputGroup>
                <Form.Control as={"textarea"} maxLength={400} value={this.state.overallRecs} onChange={this.handleChangeRecs}/>
                <InputGroup.Append>
                    <Form.Text className="text-muted">
                        {this.state.overallRecs.length}/400 characters
                    </Form.Text>
                    <Button variant="primary" type="submit" onClick={this.saveRecs}>
                        Done
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }

    handleChange = (e)=>{
        this.setState({
            summary:e.target.value
        })
    }

    saveClientSummary = async() => {
        let body = {
            "type": "summary",
            "data": this.state.summary,
            "clientId": this.props.data.clientid,
            "sector": this.props.data.sector
        }
        apiPostHeader.body = JSON.stringify(body);
        let editresp;
        try{
            const response = await fetch(resultsApi.clientEditText,apiPostHeader)
            editresp = await response.json();
        }
        catch(err){
            editresp = err;
        }
        // console.log(editresp)
        this.setState({
            summaryEdit: false
        });
    }

    saveSummary = async() => {
        let body = {
            "type": "summary",
            "data": this.state.summary,
            "siteid": this.props.data.siteid
        }
        apiPostHeader.body = JSON.stringify(body);
        let editresp;
        try{
            const response = await fetch(resultsApi.textEdit,apiPostHeader)
            editresp = await response.json();
        }
        catch(err){
            editresp = err;
        }
        // console.log(editresp)
        this.setState({
            summaryEdit: false
        });
    }

    summaryClientForm() {
        return (
            <InputGroup>
                <Form.Control as={"textarea"} maxLength={600} value={this.state.summary} onChange={this.handleChange}/>
                <InputGroup.Append>
                    <Form.Text className="text-muted">
                        {this.state.summary.length}/600 characters
                    </Form.Text>
                    <Button variant="primary" type="submit" onClick={this.saveClientSummary}>
                        Done
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }

    summaryForm() {
        return (
            <InputGroup>
                <Form.Control as={"textarea"} maxLength={600} value={this.state.summary} onChange={this.handleChange}/>
                <InputGroup.Append>
                    <Form.Text className="text-muted">
                        {this.state.summary.length}/600 characters
                    </Form.Text>
                    <Button variant="primary" type="submit" onClick={this.saveSummary}>
                        Done
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }

    reportView() {
        return(
            <div className="reportview-body">
                <div style={{display: "flex", width: "100%", justifyContent: "flex-end"}}>
                    <div className="reportview-header">
                        <p className="reportview-header-text">Current</p>
                        <span className="circle" style={{backgroundColor: "#35353b"}}></span>
                        <p className="reportview-header-text">Target</p>
                        <p className="reportview-header-text">Gap</p>
                        <p className="reportview-header-text">Industry Avg</p>
                    </div>
                </div>
                <ReportsCardView data={this.props.data}/>
            </div>
        );
    }

    selectTab = (event)=>{
        if(event==="0"){
            this.setState({
                title:"List"
            })
        }
        else{
            this.setState({
                title:"Report View"
            })
        }
    }

    clientLevel() {
        return (
            <div className="reports-overview">
                <div className="legend">
                    <div style={{display: "flex", width: "50%", justifyContent: "space-evenly", marginBottom: "12px"}}>
                        <div className="legend-part">
                            <span className="ind-avg"></span>
                            <p style={{margin: "0"}}>Industry Range</p>
                        </div>
                        <div className="legend-part">
                            <span className="target"></span>
                            <p style={{margin: "0"}}>Target Average</p>
                        </div>
                    </div>
                    <div className="sites-info">
                        {this.props.data.sites.map((data, index) => {
                            return (
                                <div className="legend-part">
                                    <span className="score" style={{backgroundColor: "#"+this.props.colors[index].color}}></span>
                                    <p style={{margin: "0"}}>{data.name}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="overview-top">
                    <div className="summary">
                        <div className="summary-header">
                            <p style={{fontSize: "20px", fontWeight: "bold", margin: "0"}}>Summary</p>
                            {this.props.profile.toLowerCase() !== "client" && this.props.profile.toLowerCase() !== "sector" ? <img src={EditIcon} alt="" onClick={()=>this.editToggle("summary")}></img> : ""}
                        </div>
                        {this.state.summaryEdit?this.summaryClientForm():<p className="summary-text">{this.state.summary}</p>}
                    </div>
                    <div className="overall">
                        <div className="overall-header">
                            <p style={{fontSize: "20px", fontWeight: "bold", margin: "0"}}>Scorecard</p>
                        </div>
                        <div className="overall-score">
                            <p style={{fontSize: "18px", fontWeight: "bold", marginBottom: "30px"}}>Overall</p>
                            <Slider data={this.props.data} colors={this.props.colors}/>
                            <div className="overall-recs">
                                <div className="overall-recs-header">
                                    <p style={{fontSize: "12px", fontWeight: "bold", margin: "0"}}>RECOMMENDATIONS</p>
                                    {this.props.profile.toLowerCase() !== "client" && this.props.profile.toLowerCase() !== "sector" ? <img src={EditIcon} alt="" onClick={()=>this.editToggle("recs")}></img> : ""}
                                </div>
                                {this.state.recsEdit?this.overallRecsClientForm():this.recsTextFormat()}
                            </div>
                        </div>
                    </div>
                </div>
                <span className="reports-line"></span>
                <div className="overview-tab-group">
                    <div className="overview-tab-header">
                        <p style={{fontSize: "20px", fontWeight: "bold", margin: "0"}}>Business Function Overview</p>
                        <div className="reorder">
                            <img src={ReorderIcon} alt=""></img>
                            <p style={{margin: "0", paddingLeft:"10px"}}>Reorder</p>
                        </div>
                    </div>
                    <Tabs defaultActiveKey="List" id="overview-selection-tabs" onSelect={this.selectTab}>
                        {tabValues.map((element,index)=>{
                            return(
                                <Tab key={index} eventKey={element} title={element} >
                                    {element==="List"?<ReportsListView data={this.props.data} colors={this.props.colors} profile={this.props.profile}/>:this.reportView()}
                                </Tab>
                            )
                        })}
                            
                    </Tabs>
                </div>
            </div>
        )
    }

    siteLevel() {
        return (
            <div className="reports-overview">
                <div className="overview-top">
                    <div className="summary">
                        <div className="summary-header">
                            <p style={{fontSize: "20px", fontWeight: "bold", margin: "0"}}>Summary</p>
                            {this.props.profile !== "client" && this.props.profile.toLowerCase() !== "sector" ? <img src={EditIcon} alt="" onClick={()=>this.editToggle("summary")}></img> : ""}
                        </div>
                        {this.state.summaryEdit?this.summaryForm():<p className="summary-text">{this.state.summary}</p>}
                    </div>
                    <div className="overall">
                        <div className="overall-header">
                            <p style={{fontSize: "20px", fontWeight: "bold", margin: "0"}}>Scorecard</p>
                            <div className="legend">
                                <div className="legend-part">
                                    <span className="ind-avg"></span>
                                    <p style={{margin: "0"}}>Industry Range</p>
                                </div>
                                <div className="legend-part">
                                    <span className="score"></span>
                                    <p style={{margin: "0"}}>Score</p>
                                </div>
                                <div className="legend-part">
                                    <span className="target"></span>
                                    <p style={{margin: "0"}}>Target</p>
                                </div>
                            </div>
                        </div>
                        <div className="overall-score">
                            <p style={{fontSize: "18px", fontWeight: "bold", marginBottom: "30px"}}>Overall</p>
                            <Slider data={this.props.data}/>
                            <div className="overall-recs">
                                <div className="overall-recs-header">
                                    <p style={{fontSize: "12px", fontWeight: "bold", margin: "0"}}>RECOMMENDATIONS</p>
                                    {this.props.profile.toLowerCase() !== "client" && this.props.profile.toLowerCase() !== "sector" ? <img src={EditIcon} alt="" onClick={()=>this.editToggle("recs")}></img> : ""}
                                </div>
                                {this.state.recsEdit?this.overallRecsForm():this.recsTextFormat()}
                            </div>
                        </div>
                    </div>
                </div>
                <span className="reports-line"></span>
                <div className="overview-tab-group">
                    <div className="overview-tab-header">
                        <p style={{fontSize: "20px", fontWeight: "bold", margin: "0"}}>Business Function Overview</p>
                        <div className="reorder">
                            <img src={ReorderIcon} alt=""></img>
                            <p style={{margin: "0", paddingLeft:"10px"}}>Reorder</p>
                        </div>
                    </div>
                    <Tabs defaultActiveKey="List" id="overview-selection-tabs" onSelect={this.selectTab}>
                        {tabValues.map((element,index)=>{
                            return(
                                <Tab key={index} eventKey={element} title={element} >
                                    {element==="List"?<ReportsListView data={this.props.data} resultsRefresh={this.props.resultsRefresh} profile={this.props.profile}/>:this.reportView()}
                                </Tab>
                            )
                        })}
                            
                    </Tabs>
                </div>
            </div>
        )
    }

    componentWillReceiveProps = async() => {
        console.log("props ",this.props.colors)
        colors= this.props.colors;
    }

    componentDidMount = async() => {
        console.log(this.props.data)
        console.log(this.props.colors)
        if (this.props.data) {
            if (this.props.data.sites !== undefined) {
                if (this.props.data.summary !== null) {
                    // console.log(this.props.data.summary)
                    this.setState ({
                        summary: this.props.data.summary
                    })
                }
    
                if (this.props.data.overallRecs !== null) {
                    // console.log(this.props.data.overallRecs)
                    this.setState({
                        overallRecs: this.props.data.overallRecs
                    })
                }

                // for (let i = 0; i < this.props.data.sites.length; i++) {
                //     let obj = {};
                //     obj.name = this.props.data.sites[i].name;
                //     obj.color = this.props.colors[i];
                //     // console.log(i)
                //     // console.log(this.props.data.sites[i].name)
                //     // console.log(this.props.colors[i])
                //     colors.push(obj);
                // }
            } else {
                if (this.props.data.summary !== null) {
                    // console.log(this.props.data.summary)
                    this.setState ({
                        summary: this.props.data.summary
                    })
                }
    
                if (this.props.data.overallRecs !== null) {
                    // console.log(this.props.data.overallRecs)
                    this.setState({
                        overallRecs: this.props.data.overallRecs
                    })
                }
            }

            // console.log(this.props.data.sites);
            // this.props.data.sites.map((data, index)=> {
            //     colors.push(Math.floor(Math.random()*16777215).toString(16))
            // });
            // console.log(colors);
        }

        // console.log(this.props.data);
        // console.log(this.props.sample);
    }

    render() {
        return (
            this.props.data ? this.props.data.sites !== undefined?this.clientLevel():this.siteLevel() : ""
        );
    }
}

export default ReportsOverview;