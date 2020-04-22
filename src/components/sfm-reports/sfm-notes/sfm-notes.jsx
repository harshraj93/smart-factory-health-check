import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DropDownImg from '../../../images/icon-small-chevron-down.svg';
import {FormNavigationButton} from '../../../assets/sfm-button';
import './sfm-notes.scss';

let data = [
    {
        name: "Operations",
        capabilities: [
            {
                name: "Capability 1",
                noOfNotes: 5,
                subCapabilities:[ 
                    {
                        name: "Sub-capability 1",
                        current: 4,
                        target: 6,
                        notes: [
                            {
                                flag: false,
                                userName: "Bryan Takayama",
                                time: "",
                                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer velit metus, scelerisque sit amet placerat nec, commodo sit amet velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin mattis commodo magna. "
                            },
                            {
                                flag: false,
                                userName: "Pedro Amorim",
                                time: "",
                                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer velit metus, scelerisque sit amet placerat nec, commodo sit amet velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin mattis commodo magna. "
                            },
                            {
                                flag: true,
                                userName: "Pedro Amorim",
                                time: "",
                                text: "This General Question has been flagged because it doesnt make sense in context to the Business function and capability. This is just placeholder copy, but allows for the flag to have a specific note to provide a reason for the flag. "
                            }
                        ]
                    },
                    {
                        name: "Sub-Capability 2",
                        current: 5,
                        target: 6,
                        notes: [
                            {
                                flag: false,
                                userName: "Laura Sofía Ureña",
                                time: "",
                                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer velit metus, scelerisque sit amet placerat nec, commodo sit amet velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin mattis commodo magna. "
                            },
                            {
                                flag: false,
                                userName: "Emelda Scandroot",
                                time: "",
                                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer velit metus, scelerisque sit amet placerat nec, commodo sit amet velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin mattis commodo magna. "
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

class Notes extends React.Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

    accordions() {
        return (
            <Accordion className="notes-accordion" defaultActiveKey={0}>
            {data.map((data,index)=>{
                return(
                    <Card key={index} className={"card"}>                                   
                        <Accordion.Toggle as={Card.Header} className={"card-header "+(this.state.arrayIndex===String(index))} value={index} variant="link" eventKey={index} onClick={(e,value)=>this.handleClick(e,value)}>
                            <div className="notes-top-card">
                                <span className="area-name">{data.name}</span>
                            </div>
                            <img className="drop-down" src={DropDownImg} alt="" ></img>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={index}>
                            {data.capabilities.map((x,y) => {
                                return (
                                    <Card key={y} className="card">
                                        <Accordion.Toggle as={Card.Header} className={"cap-card-header "+(this.state.arrayIndex===String(index))} value={index} variant="link" eventKey={index} onClick={(e,value)=>this.handleClick(e,value)}>
                                            <div className="capability-card" key={y}>
                                                <span className="area-name">{x.name}</span>
                                                <span className="number-tag">{x.noOfNotes} notes</span>
                                            </div>
                                            <img className="drop-down" src={DropDownImg} alt="" ></img>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey={y}>
                                            <div className="sub-cap-content">
                                                <div className="scores">
                                                    <div className="current">
                                                        <p>{x.current}</p>
                                                        <p>Current</p>
                                                    </div>
                                                    <span className="verti-line"></span>
                                                    <div className="target">
                                                        <p>{x.target}</p>
                                                        <p>Target</p>
                                                    </div>
                                                </div>
                                                <div className="notes">
                                                    {x.subCapabilities.map((i, j) => {
                                                        return(
                                                            <div className="notes-block"></div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </Accordion.Collapse>
                                    </Card>
                                )
                            })}
                        </Accordion.Collapse>
                    </Card>
                )
            })}
            </Accordion>
        )
    }

    render() {
        return (
            <div className="notes-container">
                {this.accordions()}
            </div>
        )
    }
}

export default Notes;