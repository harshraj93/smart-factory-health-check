import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DropDownImg from '../../images/icon-small-chevron-down.svg';
import Slider from '../sfm-scorecard-slider/sfm-scorecard-slider';
import './sfm-reports-accordion.scss';

let reportsData = [
    {
        bizName: "Operations",
        parts: [
            {
                c: "Capability 1",
                score: 3.2,
                target: 5.8,
                indAvgFrom: 2.5,
                indAvgTo: 4.5 
            },
            {
                c: "Capability 2",
                score: 3,
                target: 4.8,
                indAvgFrom: 2.5,
                indAvgTo: 4.5 
            },
            {
                c: "Capability 3",
                score: 3.2,
                target: 6.8,
                indAvgFrom: 2.5,
                indAvgTo: 4.5 
            },
            {
                c: "Capability 4",
                score: 3.2,
                target: 3.4,
                indAvgFrom: 2.5,
                indAvgTo: 4.5 
            },
            {
                c: "Capability 5",
                score: 3.2,
                target: 4,
                indAvgFrom: 2.5,
                indAvgTo: 4.5 
            }
        ]
    },
    {
        bizName: "Procurement & Supplier Management",
        parts: [
            {
                c: "Capability 1",
                score: 3.2,
                target: 5.8,
                indAvgFrom: 2.5,
                indAvgTo: 4.5 
            },
            {
                c: "Capability 2",
                score: 3,
                target: 4.8,
                indAvgFrom: 2.5,
                indAvgTo: 4.5 
            },
            {
                c: "Capability 3",
                score: 3.2,
                target: 6.8,
                indAvgFrom: 2.5,
                indAvgTo: 4.5 
            },
            {
                c: "Capability 4",
                score: 3.2,
                target: 3.4,
                indAvgFrom: 2.5,
                indAvgTo: 4.5 
            },
            {
                c: "Capability 5",
                score: 3.2,
                target: 4,
                indAvgFrom: 2.5,
                indAvgTo: 4.5 
            }
        ]
    }
];

function reportScoreCard (data){
    if (Array.isArray(data.parts)) {
        return (
            <> 
                <div className="reports-card">
                    <span className="area-name">{data.bizName}</span>
                    <Slider data={data.parts}/>
                    <p style={{margin: "0", fontSize: "14px"}}>Breakdown</p>
                    
                    {/* <span className="company-name">
                        {props["companyName"]?props["companyName"]:props["industryType"]}
                        {props["companyName"]?<img className="upload" src={UploadImg} alt=""/>:null}
                    </span>
            
                     <span className="number-open">
                        {props["openNumber"]}
                    </span>
                    <span className="number-completed">
                        {props["completedNumber"]}
                    </span> */}
                </div>
            </>
        );
    }
    else {
        return (
            <> 
                <div className="reports-card">
                    <span className="area-name">{data.c}</span>
                    <Slider data={data}/>
                    
                    {/* <span className="company-name">
                        {props["companyName"]?props["companyName"]:props["industryType"]}
                        {props["companyName"]?<img className="upload" src={UploadImg} alt=""/>:null}
                    </span>
            
                     <span className="number-open">
                        {props["openNumber"]}
                    </span>
                    <span className="number-completed">
                        {props["completedNumber"]}
                    </span> */}
                </div>
            </>
        );
    }
}

class ReportsAccordion extends React.Component {
    constructor(props){
        super(props);
        this.state={
            
        }
    }

    render(){
        return(
            <Accordion className="accordion-parent">
                {/* <Card>
                    <Card.Header className={"card-header"}>
                        <div className="reports-card">
                            <span className="area-name">Operations</span>
                            <Slider/>
                            <p style={{margin: "0"}}>Breakdown</p>
                        </div>
                        <Accordion.Toggle as={Button} variant="link">
                                <img src={DropDownImg} alt=""></img>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse>
                    <div className="reports-card">
                        <span className="area-name">Capability</span>
                        <Slider/>
                    </div>
                    </Accordion.Collapse>
                </Card> */}
            {reportsData.map((data,index)=>{
                return(
                        <Card key={index}>
                            <Card.Header className={"card-header" }>
                                    {reportScoreCard(data)}
                                       
                                <Accordion.Toggle as={Button} variant="link" eventKey={index} value={index}>
                                <img src={DropDownImg} alt=""></img>
                                </Accordion.Toggle>
                            </Card.Header>
                                <Accordion.Collapse eventKey={index}>
                                    <div>
                                        <div className="tr-com-box">
                                            <div className="tr-box">
                                                <span className="tr-heading">Key Themes</span>
                                                <p className="tr-text"></p>
                                            </div>
                                            <div className="tr-box">
                                                <span className="tr-heading">Recommendations</span>
                                                <p className="tr-text"></p>
                                            </div>
                                        </div>
                                        {data.parts.map((x,y) => {
                                            return (
                                                <div className="reports-card">
                                                    <span className="area-name">{x.c}</span>
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
}

export default ReportsAccordion;