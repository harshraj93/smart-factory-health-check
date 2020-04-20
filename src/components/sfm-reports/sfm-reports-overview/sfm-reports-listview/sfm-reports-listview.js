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
import {resultsApi} from '../../../../api/assessments/reports'
import {apiPostHeader} from '../../../../api/main/mainapistorage'

function percentComplete(data, str) {
    return (
        <>
        <div className="percent-complete">
            <ProgressBar now={data.percentComplete} variant={str}/>
            <p style={{margin: "0", fontSize: "14px", float: "right", marginRight: "5px"}}>{data.percentComplete}% Complete</p>
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
        let body = {
            "businessFunction": this.state.businessFunction,
            "recommendations": this.state.recs,
            "keyThemes": this.state.keyThemes,
            "siteid": this.props.data.siteid
        }
        console.log(body);
        apiPostHeader.body = JSON.stringify(body);
        let editresp;
        try{
            const response = await fetch(resultsApi.themesEdit,apiPostHeader)
            editresp = await response.json();
        }
        catch(err){
            editresp = err;
        }
        console.log(editresp)
        this.setState ({
            capTextEdit: false
        });
        // console.log(this.state.recs);
    }

    capTextBox() {
        // if (data.keyThemes !== null) {
        //     this.setState({
        //         keyThemes: data.keyThemes
        //     })
        // }
        // if (data.recs !== null) {
        //     this.setState({
        //         recs: data.recs
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
        let points = data.split("\n");
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
                        <Accordion.Toggle as={Card.Header} className={"card-header "+(this.state.arrayIndex===String(index))} value={index} variant="link" eventKey={index} onClick={(e,value)=>this.handleClick(e,value)}>
                            <div className="listview-card">
                                <span className="area-name">{data.name}</span>
                                <Slider data={data}/>
                            </div>
                            <p style={{margin: "0px 12px 0px 15px", fontSize: "14px"}}>Breakdown</p>
                            <img className="drop-down" src={DropDownImg} alt="" ></img>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={index}>
                            <div>
                                <div className="tr-com-box">
                                    <div className="edit">
                                        <img src={EditIcon} alt="" onClick={()=>this.editToggle(data.name)}></img>
                                    </div>
                                    {this.state.capTextEdit?this.capTextForm():this.capTextBox()}
                                </div>
                                {data.parts.map((x,y) => {
                                    return (
                                        <div className="listview-card" key={y}>
                                            <span className="area-name">{x.name}</span>
                                            <Slider data={x}/>
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
        return (
            <Card key={index} className={"card"}>                                   
                <Accordion.Toggle as={Card.Header} className={"card-header "+(this.state.arrayIndex===String(index))} value={index} variant="link" eventKey={index} onClick={(e,value)=>this.handleClick(e,value)}>
                    <div className="assess-overview-card">
                        <span className="area-name">{data.name}</span>
                        {data.business_funtion_level_status!=="Open"?percentComplete(data, ""):percentComplete(data, "success")}
                        {data.business_funtion_level_status!=="Open"?<FormNavigationButton labelName="Done" style={{marginRight: "28px"}}/>:<FormNavigationButton labelName="Open" style={{backgroundColor: "#57bb50", marginRight: "28px"}}/>}
                    </div>
                    <img className="drop-down" src={DropDownImg} alt="" ></img>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={index}>
                    <div>
                        {data.Capability.map((x,y) => {
                            return (
                                <div className="assess-overview-card" key={y}>
                                    {x.active?<span className="area-name">{x.name}</span>:<span className="area-name" style={{opacity: "0.3"}}>{x.name}</span>}
                                    {x.active?(x.status!=="Open"?<FormNavigationButton labelName={<>&#10003;</>}/>:<FormNavigationButton labelName="Open" style={{backgroundColor: "#57bb50"}}/>):""}
                                </div>
                            )
                        })}
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
            this.props.data.reportsData?this.reportScoreCard():this.assessmentsCard()
        )
    }
}

export default ReportsListView;