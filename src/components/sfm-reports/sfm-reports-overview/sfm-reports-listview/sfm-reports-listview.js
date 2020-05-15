import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'; 
import DropDownImg from '../../../../images/icon-small-chevron-down.svg';
import EditIcon from '../../../../images/icon-small-edit.svg';
import Slider from '../sfm-scorecard-slider/sfm-scorecard-slider';
import {FormNavigationButton} from '../../../../assets/sfm-button';
import {resultsApi} from '../../../../api/assessments/reports';
import {apiPostHeader} from '../../../../api/main/mainapistorage';
import {Link,withRouter} from 'react-router-dom';

function percentComplete(data, str) {
    return (
        <>
        <div className="percent-complete">
            <ProgressBar now={data.percentComplete} variant={str}/>
            <p style={{margin: "0", fontSize: "14px", float: "right", marginRight: "5px"}}>{Math.ceil(Number(data.percentComplete))}% Complete</p>
        </div>
        </>
    )
}

let keyThemes = [];
let recs = [];

class ReportsListView extends React.Component {
    constructor(props){
        super(props);
        this.state={
            arrayIndex:"0",
            capTextEdit: false,
            keyThemes: "Enter Key Themes",
            recs: "Enter Recommendations",
            businessFunction: "",
            tempKT: "",
            tempRecs: ""
        }

        this.editToggle = this.editToggle.bind(this);
    }

    recsChange = index => (e)=>{
        this.setState ({
            tempRecs: e.target.value
        });
        // recs[index] = this.state.tempRecs;
        recs[index] = e.target.value
    }

    themeChange = index => (e)=>{
        this.setState ({
            tempKT: e.target.value
        });
        keyThemes[index] = e.target.value;
        // this.capTextForm(index);
        // console.log(e.target.value)
        // console.log(keyThemes[index])
    }

    editToggle = (data, index)=> {
        console.log(index)
        console.log(data)
        if (this.state.capTextEdit) {
            this.setState({
                capTextEdit: false,
                businessFunction: data.name,
                tempKT: keyThemes[index],
                tempRecs: recs[index]
            });
        }
        else {
            this.setState({
                capTextEdit: true,
                businessFunction: data.name,
                tempKT: keyThemes[index],
                tempRecs: recs[index]
            });
        }
    }

    refreshText = async() => {
        keyThemes = [];
        recs = [];
        if (this.props.data.reportsData !== undefined) {
            for (let i = 0; i < this.props.data.reportsData.length; i++) {
                if (this.props.data.reportsData[i].keyThemes !== null) {
                    keyThemes.push(this.props.data.reportsData[i].keyThemes);
                }
                else {
                    keyThemes.push(this.state.keyThemes);
                }
                
                if (this.props.data.reportsData[i].recs !== null) {
                    recs.push(this.props.data.reportsData[i].recs);
                }
                else {
                    recs.push(this.state.recs);
                }
            }
        }
    }

    onSave = async() => {
        if (this.props.data.sites === undefined) {
            let body = {
                "businessFunction": this.state.businessFunction,
                "recommendations": this.state.tempRecs,
                "keyThemes": this.state.tempKT,
                "siteid": this.props.data.siteid
            }
            apiPostHeader.body = JSON.stringify(body);
            let editresp;
            try{
                const response = await fetch(resultsApi.themesEdit,apiPostHeader)
                editresp = await response.json();
            }
            catch(err){
                editresp = err;
            }

            // console.log(keyThemes);
            // console.log(recs);
            if (editresp) {
                this.props.resultsRefresh();
                this.refreshText();
            }
            // console.log(keyThemes);
            // console.log(recs);

            this.setState ({
                capTextEdit: false
            });
        }
        else {
            this.setState ({
                capTextEdit: false
            });
        }
    }

    // setText (keyThemes, recs) {}

    capTextBox = (index) => {
        // console.log(keyThemes + " + " + recs);
        // if (keyThemes !== null) {
        //     this.setState({
        //         keyThemes: keyThemes
        //     })
        // }
        // if (recs !== null) {
        //     this.setState({
        //         recs: recs
        //     })
        // }
        // console.log(keyThemes)
        // console.log(recs)
        // console.log(index)
        if (keyThemes[index] !== undefined && recs[index] !== undefined) {
            return (
                <div style={{display: "grid" , "grid-template-columns": "1fr 1fr"}}>
                    <div className="tr-box">
                        <span className="tr-heading">Key Themes</span>
                        {this.textFormat(keyThemes[index])}
                    </div>
                    <div className="tr-box">
                        <span className="tr-heading">Recommendations</span>
                        {this.textFormat(recs[index])}
                    </div>
                </div>
            )
        }
    }

    // setTempText = (index) => {
    //     this.setState ({
    //         tempKT: keyThemes[index],
    //         tempRecs: recs[index]
    //     });
    //     console.log(this.state.tempKT);
    //     console.log(keyThemes[index]);
    // }

    capTextForm = (index) => {
        // this.setTempText(index);
        return (
            <InputGroup controlId="capText">
                <Form.Row>
                    <Form.Group as={Col} controlId="keyThemes">
                        <Form.Label>Key Themes</Form.Label>
                        <Form.Control as={"textarea"} maxLength={450} placeholder="Enter key themes" onChange={this.themeChange(index)} value={this.state.tempKT}/>
                        <Form.Text className="text-muted">
                            {this.state.tempKT.length}/450 characters
                        </Form.Text>
                    </Form.Group>

                    <Form.Group as={Col} controlId="recs">
                        <Form.Label>Recommendations</Form.Label>
                        <Form.Control as={"textarea"} maxLength={450} placeholder="Enter recommendations" onChange={this.recsChange(index)} value={this.state.tempRecs} />
                        <Form.Text className="text-muted">
                            {this.state.tempRecs.length}/450 characters
                        </Form.Text>
                    </Form.Group>
                </Form.Row>
                
                <InputGroup.Append>
                    <Button variant="primary" type="submit" onClick={this.onSave}>
                        Done
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }

    textFormat(data) {
        let points = data.split("\n");  //split("↵").
        return (
            <ul className="list">
                {points.map((data,index)=>{
                    return(
                    <li className="point">{points[index]}</li>
                    )
                })}
            </ul>
        )
    }

    reportScoreCard = () => {
        return (
            <Accordion className="listview-accordion" defaultActiveKey={0}>
            {this.props.data.reportsData.map((data,index)=>{
                return(
                    <Card key={index} className={"card"}>                                   
                        <Card.Header className={"card-header "+(this.state.arrayIndex===String(index))}>
                            <div className="listview-card">
                                <span className="area-name">{data.name}</span>
                                {this.props.colors?<Slider data={data} colors={this.props.colors}/>:<Slider data={data}/>}
                            </div>
                            <p style={{margin: "0px 12px 0px 15px", fontSize: "14px"}}>Breakdown</p>
                            <Accordion.Toggle as={Button} value={index} variant="link" eventKey={index} onClick={(e,value)=>this.handleClick(e,value)}>
                                <img className="drop-down" src={DropDownImg} alt="" ></img>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={index}>
                            <div>
                                <div className="tr-com-box">
                                    <div className="edit">
                                        {this.props.profile !== "Client" ? <img src={EditIcon} alt="" onClick={()=>this.editToggle(data, index)}></img> : ""}
                                    </div>
                                    {this.state.capTextEdit?this.capTextForm(index):this.capTextBox(index)}
                                </div>
                                {data.parts.map((x,y) => {
                                    return (
                                        <div className="listview-card" key={y}>
                                            <span className="area-name">{x.name}</span>
                                            {this.props.colors?<Slider data={x} colors={this.props.colors}/>:<Slider data={x}/>}
                                        </div>
                                    )
                                })}
                            </div>
                        </Accordion.Collapse>
                    </Card>
                )
            })}
            </Accordion>
        )
    }

    activeCard = (data, index) => {
        if(this.props.data.siteid){
            localStorage.setItem("siteidOverview",this.props.data.siteid)
        }
        // console.log(localStorage.getItem("siteidOverview"))
        return (
            <Card key={index} className={"card"}>                                   
                <Card.Header className={"card-header "+(this.state.arrayIndex===String(index))}>
                    <div className="assess-overview-card">
                        <span className="area-name">{data.name}</span>
                        {data.business_funtion_level_status!=="Open"?percentComplete(data, ""):percentComplete(data, "success")}
                            <Link to={{
                                pathname:'/questionnaire', 
                                siteid: localStorage.getItem("siteidOverview"), 
                                clientName: this.props.data.clientName, 
                                siteName: this.props.data.siteName, 
                                sector:this.props.data.sector, 
                                businessFunctionName: data.name,
                                businessFunctionID:data.businessFunctionId, 
                                capabilityName: null}}>
                                    {data.business_funtion_level_status!=="Open"?<FormNavigationButton labelName="Done" style={{marginRight: "28px"}}/>:<FormNavigationButton labelName="Open" style={{backgroundColor: "#57bb50", marginRight: "28px"}}/>}
                            </Link>
                    </div>
                    <Accordion.Toggle as={Button} value={index} variant="link" eventKey={index} onClick={(e,value)=>this.handleClick(e,value)}>
                        <img className="drop-down" src={DropDownImg} alt="" ></img>
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={index}>
                    <div>
                        {data.Capability!==undefined?data.Capability.map((x,y) => {
                            return (
                                <div className="assess-overview-card" key={y}>
                                    {x.active?<span className="area-name">{x.name}</span>:<span className="area-name" style={{opacity: "0.3"}}>{x.name}</span>}
                                    {x.active?(x.status!=="Open"?
                                            <Link to={{
                                                pathname:'/questionnaire', 
                                                siteid: localStorage.getItem("siteidOverview"), 
                                                clientName: this.props.data.clientName, 
                                                siteName: this.props.data.siteName, 
                                                sector:this.props.data.sector, 
                                                businessFunctionName: data.name,
                                                businessFunctionID:data.businessFunctionId,
                                                capabilityName: x.name}}>
                                                    <FormNavigationButton labelName={<>&#10003;</>}/>
                                            </Link>:
                                            <Link to={{
                                                pathname:'/questionnaire', 
                                                siteid: localStorage.getItem("siteidOverview"), 
                                                clientName: this.props.data.clientName, 
                                                siteName: this.props.data.siteName, 
                                                sector:this.props.data.sector, 
                                                businessFunctionName: data.name,
                                                businessFunctionID:data.businessFunctionId,
                                                capabilityName: x.name}}>
                                                    <FormNavigationButton labelName="Open" style={{backgroundColor: "#57bb50"}}/>
                                            </Link>):""}
                                </div>
                            )
                        }):""}
                    </div>
                </Accordion.Collapse>
            </Card>
        )
    }

    inactiveCard = (data, index) => {
        return (
            <Card key={index} className={"card"}>
                <Card.Header className={"card-header"} style={{opacity: "0.3"}}>
                    <div className="assess-overview-card">
                        <span className="area-name">{data.name}</span>
                    </div>
                </Card.Header>
            </Card>
        )
    }

    assessmentsCard = () => {
        // console.log(this.props.updatedData);
        return (
            <Accordion className="assess-overview-accordion" defaultActiveKey={0}>
            {this.props.data.businessFunction.map((data,index)=>{
                return(
                    data.active?this.activeCard(data, index):this.inactiveCard(data, index)
                )
            })}
            </Accordion>
        )
    }

    handleClick = (e)=>{
        let value = e.currentTarget.getAttribute("value")
        let index = value?value:0
        this.setState({
            arrayIndex:this.state.arrayIndex===String(index)?"":String(index)
        });
    }

    componentDidMount = async() => {
        console.log("reports",this.props.data.reportsData);
        keyThemes = [];
        recs = [];
        if (this.props.data.reportsData !== undefined) {
            for (let i = 0; i < this.props.data.reportsData.length; i++) {
                if (this.props.data.reportsData[i].keyThemes !== null) {
                    keyThemes.push(this.props.data.reportsData[i].keyThemes);
                }
                else {
                    keyThemes.push(this.state.keyThemes);
                }
                
                if (this.props.data.reportsData[i].recs !== null) {
                    recs.push(this.props.data.reportsData[i].recs);
                }
                else {
                    recs.push(this.state.recs);
                }
            }
        }

        console.log(keyThemes);
        console.log(recs);
    }

    render(){
        return(
            (this.props.data.reportsData?(this.reportScoreCard()):this.assessmentsCard())
        )
    }
}

export default withRouter(ReportsListView);