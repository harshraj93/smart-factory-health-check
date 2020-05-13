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

class ReportsListView extends React.Component {
    constructor(props){
        super(props);
        this.state={
            arrayIndex:"0",
            capTextEdit: false,
            keyThemes: "Enter Key Themes",
            recs: "Enter Recommendations",
            businessFunction: ""
        }

        this.editToggle = this.editToggle.bind(this);
    }

    recsChange = (e)=>{
        this.setState({
            recs:e.target.value
        })
    }

    themeChange = (e)=>{
        this.setState({
            keyThemes:e.target.value
        })
    }

    editToggle = (name)=> {
        // console.log(name)
        if (this.state.capTextEdit) {
            this.setState({
                capTextEdit: false,
                businessFunction: name
            });
        }
        else {
            this.setState({
                capTextEdit: true,
                businessFunction: name
            });
        }
    }

    onSave = async() => {
        if (this.props.data.sites === undefined) {
            let body = {
                "businessFunction": this.state.businessFunction,
                "recommendations": this.state.recs,
                "keyThemes": this.state.keyThemes,
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
            this.setState ({
                capTextEdit: false
            });
        }
        else {
            this.setState ({
                capTextEdit: false
            });
        }
        
        // console.log(this.state.recs);
    }

    // setText (keyThemes, recs) {}

    capTextBox(keyThemes, recs) {
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
        return (
            <div style={{display: "flex"}}>
                <div className="tr-box">
                    <span className="tr-heading">Key Themes</span>
                    {this.textFormat(this.state.keyThemes)}
                </div>
                <div className="tr-box">
                    <span className="tr-heading">Recommendations</span>
                    {this.textFormat(this.state.recs)}
                </div>
            </div>
        )
    }

    capTextForm() {
        return (
            <InputGroup controlId="capText">
                <Form.Row>
                    <Form.Group as={Col} controlId="keyThemes">
                        <Form.Label>Key Themes</Form.Label>
                        <Form.Control as={"textarea"} maxLength={450} placeholder="Enter key themes" onChange={this.themeChange} value={this.state.keyThemes}/>
                        <Form.Text className="text-muted">
                            {this.state.keyThemes.length}/450 characters
                        </Form.Text>
                    </Form.Group>

                    <Form.Group as={Col} controlId="recs">
                        <Form.Label>Recommendations</Form.Label>
                        <Form.Control as={"textarea"} maxLength={450} placeholder="Enter recommendations" onChange={this.recsChange} value={this.state.recs} />
                        <Form.Text className="text-muted">
                            {this.state.recs.length}/450 characters
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
                                        <img src={EditIcon} alt="" onClick={()=>this.editToggle(data.name)}></img>
                                    </div>
                                    {this.state.capTextEdit?this.capTextForm(data.keyThemes, data.recs):this.capTextBox()}
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

    render(){
        return(
            (this.props.data.reportsData?this.reportScoreCard():this.assessmentsCard())
        )
    }
}

export default withRouter(ReportsListView);