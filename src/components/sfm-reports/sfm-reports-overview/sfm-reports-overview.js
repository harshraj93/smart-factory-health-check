import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import DropDownImg from '../../../images/icon-small-chevron-down.svg';
import EditIcon from '../../../images/icon-small-edit.svg';
import ReorderIcon from '../../../images/icon-small-reorder.svg';
import Slider from './sfm-scorecard-slider/sfm-scorecard-slider';
import ReportsListView from './sfm-reports-listview/sfm-reports-listview';
import ReportsReportView from './sfm-reports-reportview/sfm-reports-reportview';
import './sfm-reports-overview.scss';

let tabValues = ["List","Report Card"];
let overall = {
    score: 4.5,
    target: 6,
    indAvgFrom: 2.8,
    indAvgTo: 4.8
}
let data = {
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer velit metus, scelerisque sit amet placerat nec, commodo sit amet velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin mattis commodo magna.",
    overallRecs: "Vestibulum volutpat sit amet lacus eu convallis. Vestibulum volutpat sit amet lacus eu convallis. Vestibulum volutpat sit amet lacus eu convallis. Vestibulum volutpat sit amet lacus eu convallis.",
    reportsData: [
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
]};

class ReportsOverview extends React.Component {
    constructor(props){
        super(props);
        this.state={
            title:"List"
        }
    }

    reportView() {
        return(
            <div className="reportview-body">
                <div style={{display: "flex", width: "100%", justifyContent: "flex-end"}}>
                    <div className="reportview-header">
                        <p className="reportview-header-text">Current</p>
                        <p className="reportview-header-text">Target</p>
                        <p className="reportview-header-text">Gap</p>
                        <p className="reportview-header-text">Industry Avg</p>
                    </div>
                </div>
                <ReportsReportView/>
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

    render() {
        return (
            <div className="reports-overview">
                <div className="overview-top">
                    <div className="summary">
                        <div className="summary-header">
                            <p style={{fontSize: "20px", fontWeight: "bold", margin: "0"}}>Summary</p>
                            <img src={EditIcon} alt=""></img>
                        </div>
                        <p className="summary-text">{data.summary}</p>
                    </div>
                    <div className="overall">
                        <div className="overall-header">
                            <p style={{fontSize: "20px", fontWeight: "bold", margin: "0"}}>Scorecard</p>
                            <div className="legend">
                                <div className="legend-part">
                                    <span className="ind-avg"></span>
                                    <p style={{margin: "0"}}>Industry Average</p>
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
                            <Slider data={overall}/>
                            <div className="overall-recs">
                                <div className="overall-recs-header">
                                    <p style={{fontSize: "12px", fontWeight: "bold", margin: "0"}}>RECOMMENDATIONS</p>
                                    <img src={EditIcon} alt=""></img>
                                </div>
                                <p className="overall-recs-text">{data.overallRecs}</p>
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
                                <Tab key={index} eventKey={index} title={element} >
                                    {element==="List"?<ReportsListView/>:this.reportView()}
                                </Tab>
                            )
                        })}
                            
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default ReportsOverview;