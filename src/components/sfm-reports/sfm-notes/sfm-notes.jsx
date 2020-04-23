import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DropDownImg from '../../../images/icon-small-chevron-down.svg';
import FlagImg from '../../../images/icon-small-flagged-outline.svg';
import assessNotesApi from '../../../api/assessments/assess-notes.js';
import {apiPostHeader} from '../../../api/main/mainapistorage';
import './sfm-notes.scss';

class Notes extends React.Component {
    constructor(props){
        super(props);
        this.state={
            arrayIndex: false,
            arrayIndexCap: false,
            jsonData: {}
        }
    }

    getTime(value) {
        var time;
        var arr = value.split("-");
        time = arr[2].substring(3,8);
        return time;
    }

    getDate(value) {
        var date;
        var arr = value.split("-");
        date = arr[1] +"/"+ arr[2].substring(0,2) +"/"+ arr[0];
        return date;
    }

    handleClick = (e)=>{
        let value = e.currentTarget.getAttribute("value")
        let index = value?value:0
        this.setState({
            arrayIndex:this.state.arrayIndex===String(index)?"":String(index)
        });
    }

    handleCapClick = (e)=>{
        let value = e.currentTarget.getAttribute("value")
        let index = value?value:0
        this.setState({
            arrayIndexCap:this.state.arrayIndexCap===String(index)?"":String(index)
        });
    }

    accordions() {
        return (
            <Accordion className="notes-accordion" defaultActiveKey={0}>
            {this.props.data.businessFunctions.map((data,index)=>{
                return(
                    <Card key={index} className={"card"}>                                   
                        <Accordion.Toggle as={Card.Header} className={"card-header "+(this.state.arrayIndex===String(index))} value={index} variant="link" eventKey={index} onClick={(e,value)=>this.handleClick(e,value)}>
                            <div className="notes-top-card">
                                <span className="area-name">{data.name}</span>
                                <img className="drop-down" src={DropDownImg} alt="" ></img>
                            </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={index}>
                            <Accordion className="cap-notes-accordion" defaultActiveKey={0}>
                            {data.capabilities.map((x,y) => {
                                return (
                                    <Card key={y} className="cap-card">
                                        <Accordion.Toggle as={Card.Header} className={"cap-card-header "+(this.state.arrayIndexCap===String(y))} value={y} variant="link" eventKey={y} onClick={(e,value)=>this.handleCapClick(e,value)}>
                                            <div className="capability-card">
                                                <span className="area-name">{x.name}</span>
                                                {x.subcapabilities.length?<span className="number-tag">{x.subcapabilities.length} Notes</span>:""}
                                            </div>
                                            <img className="drop-down" src={DropDownImg} alt="" ></img>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey={y}>
                                            <div>
                                            {x.subcapabilities.map((i,j) => {
                                                return(
                                                <div className="sub-cap">
                                                    <span className="sub-cap-header">{i.name}</span>
                                                    <div className="sub-cap-content">
                                                        <div className="scores">
                                                            <div className="score-block">
                                                                <p className="score-number">{i.currentLevel}</p>
                                                                <p className="score-text">Current</p>
                                                            </div>
                                                            <span className="verti-line"></span>
                                                            <div className="score-block">
                                                                <p className="score-number">{i.targetLevel}</p>
                                                                <p className="score-text">Target</p>
                                                            </div>
                                                        </div>
                                                        <div className="notes">
                                                            {i.notes.map((m, n) => {
                                                                return(
                                                                    <div>
                                                                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                                                            <div className="notes-block">
                                                                                <div className="notes-header">
                                                                                    <div className="context">
                                                                                        {m.flagType!==null?<img src={FlagImg} alt="" style={{marginRight: "10px"}}/>:""}
                                                                                        <span className="user-name">{m.username}</span>
                                                                                    </div>
                                                                                    <div className="date-time">
                                                                                        <p>{this.getTime(m.timestamp)}</p>
                                                                                        <p>{this.getDate(m.timestamp)}</p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="notes-content">
                                                                                    <p>{m.note}</p>
                                                                                </div>
                                                                            </div>
                                                                            <img className="right-arrow" src={DropDownImg} alt="" ></img>
                                                                        </div>
                                                                        {n<i.notes.length-1?<span className="notes-bottom-line"></span>:""}
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                    {/* {j<x.subcapabilities.length-1?<span className="subCap-bottom-line"></span>:""} */}
                                                </div>)
                                            })}
                                            </div>
                                        </Accordion.Collapse>
                                    </Card>
                                )
                            })}
                            </Accordion>
                        </Accordion.Collapse>
                    </Card>
                )
            })}
            </Accordion>
        )
    }

    // fetchSiteInfo = async()=> {
    //     // console.log(this.props.data);
    //     apiPostHeader.body = JSON.stringify(this.props.data);
    //     try{
    //     const response = await fetch(assessNotesApi.assessNotes,apiPostHeader)
    //     const notesData = await response.json();
    //     return notesData;
    //     }
    //     catch(err){
    //         return err
    //     }
    // }

    // componentDidMount = async()=> {
    //     let notesData = await this.fetchSiteInfo();
    //     console.log(notesData);
    //     await this.setState({
    //         jsonData:notesData.resultantJSON
    //     })
    // }

    render() {
        // console.log(this.state.jsonData)
        return (
            <div className="notes-container">
                {this.accordions()}
            </div>
        )
    }
}

export default Notes;