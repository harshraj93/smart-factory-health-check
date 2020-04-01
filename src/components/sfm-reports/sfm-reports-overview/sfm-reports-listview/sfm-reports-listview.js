import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DropDownImg from '../../../../images/icon-small-chevron-down.svg';
import EditIcon from '../../../../images/icon-small-edit.svg';
import Slider from '../sfm-scorecard-slider/sfm-scorecard-slider';
import './sfm-reports-listview.scss';

let reportsData = [
    {
        bizName: "Operations",
        keyThemes: "Vestibulum volutpat sit amet lacus eu convallis. Vestibulum volutpat sit amet lacus eu convallis. Vestibulum volutpat sit amet lacus eu convallis. Vestibulum volutpat sit amet lacus eu convallis.",
        recs: "Vestibulum volutpat sit amet lacus eu convallis. Vestibulum volutpat sit amet lacus eu convallis. Vestibulum volutpat sit amet lacus eu convallis. Vestibulum volutpat sit amet lacus eu convallis.",
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

    return (
        <> 
            <div className="listview-card">
                <span className="area-name">{data.bizName}</span>
                <Slider data={data.parts}/>
                <p style={{margin: "0", fontSize: "14px"}}>Breakdown</p>
            </div>
        </>
    );
}

class ReportsListView extends React.Component {
    constructor(props){
        super(props);
        this.state={
            
        }
    }

    render(){
        return(
            <Accordion className="listview-accordion">
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
                                            <div className="edit">
                                                <img src={EditIcon} alt=""></img>
                                            </div>
                                            <div style={{display: "flex"}}>
                                                <div className="tr-box">
                                                    <span className="tr-heading">Key Themes</span>
                                                    <p className="tr-text">{data.keyThemes}</p>
                                                </div>
                                                <div className="tr-box">
                                                    <span className="tr-heading">Recommendations</span>
                                                    <p className="tr-text">{data.recs}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {data.parts.map((x,y) => {
                                            return (
                                                <div className="listview-card">
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

export default ReportsListView;