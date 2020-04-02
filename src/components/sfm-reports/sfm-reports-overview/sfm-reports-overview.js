import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import EditIcon from '../../../images/icon-small-edit.svg';
import ReorderIcon from '../../../images/icon-small-reorder.svg';
import Slider from './sfm-scorecard-slider/sfm-scorecard-slider';
import ReportsListView from './sfm-reports-listview/sfm-reports-listview';
import ReportsCardView from './sfm-reports-reportview/sfm-reports-reportview';


let tabValues = ["List","Report Card"];

class ReportsOverview extends React.Component {
    constructor(props){
        super(props);
        this.state={
            title:"List",
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
                <ReportsCardView data={this.props.data.reportsData}/>
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
                        <p className="summary-text">{this.props.data.summary}</p>
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
                            <Slider data={this.props.data}/>
                            <div className="overall-recs">
                                <div className="overall-recs-header">
                                    <p style={{fontSize: "12px", fontWeight: "bold", margin: "0"}}>RECOMMENDATIONS</p>
                                    <img src={EditIcon} alt=""></img>
                                </div>
                                <p className="overall-recs-text">{this.props.data.overallRecs}</p>
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
                    <Tabs defaultActiveKey={0} id="overview-selection-tabs" onSelect={this.selectTab}>
                        {tabValues.map((element,index)=>{
                            return(
                                <Tab key={index} eventKey={element} title={element} >
                                    {element==="List"?<ReportsListView data={this.props.data.reportsData}/>:this.reportView()}
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