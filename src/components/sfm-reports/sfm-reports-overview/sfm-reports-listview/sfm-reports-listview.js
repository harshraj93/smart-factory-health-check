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
            capTextEdit: false
        }

        this.editToggle = this.editToggle.bind(this);
    }

    editToggle() {
        if (this.state.capTextEdit) {
            this.setState({
                capTextEdit: false
            });
        }
        else {
            this.setState({
                capTextEdit: true
            });
        }
    }

    capTextForm() {
        return (
            <InputGroup controlId="capText">
                <Form.Row>
                    <Form.Group as={Col} controlId="keyThemes">
                        <Form.Label>Key Themes</Form.Label>
                        <Form.Control as={"input"} type="text" maxLength={450} placeholder="Enter key themes" />
                        <Form.Text className="text-muted">
                            300/450 characters
                        </Form.Text>
                    </Form.Group>

                    <Form.Group as={Col} controlId="recs">
                        <Form.Label>Recommendations</Form.Label>
                        <Form.Control as={"input"} type="text" maxLength={450} placeholder="Enter recommendations" />
                        <Form.Text className="text-muted">
                            300/450 characters
                        </Form.Text>
                    </Form.Group>
                </Form.Row>
                
                <InputGroup.Append>
                    <Button variant="primary" type="submit">
                        Done
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }

    reportScoreCard = () => {
        return (
            <Accordion className="listview-accordion" defaultActiveKey={0}>
            {this.props.data.map((data,index)=>{
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
                                        <img src={EditIcon} alt="" onClick={this.editToggle}></img>
                                    </div>
                                    {this.state.capTextEdit?this.capTextForm():<div style={{display: "flex"}}>
                                        <div className="tr-box">
                                            <span className="tr-heading">Key Themes</span>
                                            <p className="tr-text">{data.keyThemes}</p>
                                        </div>
                                        <div className="tr-box">
                                            <span className="tr-heading">Recommendations</span>
                                            <p className="tr-text">{data.recs}</p>
                                        </div>
                                    </div>}
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
                        {data.completed?percentComplete(data, ""):percentComplete(data, "success")}
                        {data.completed?<FormNavigationButton labelName="Done" style={{marginRight: "28px"}}/>:<FormNavigationButton labelName="Open" style={{backgroundColor: "#57bb50", marginRight: "28px"}}/>}
                    </div>
                    <img className="drop-down" src={DropDownImg} alt="" ></img>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={index}>
                    <div>
                        {data.parts.map((x,y) => {
                            return (
                                <div className="assess-overview-card" key={y}>
                                    {x.active?<span className="area-name">{x.name}</span>:<span className="area-name" style={{opacity: "0.3"}}>{x.name}</span>}
                                    {x.active?(x.completed?<FormNavigationButton labelName={<>&#10003;</>}/>:<FormNavigationButton labelName="Open" style={{backgroundColor: "#57bb50"}}/>):""}
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
            <Accordion className="listview-accordion" defaultActiveKey={0}>
            {this.props.data.functions.map((data,index)=>{
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
            this.props.data.functions?this.assessmentsCard():this.reportScoreCard()
        )
    }
}

export default ReportsListView;