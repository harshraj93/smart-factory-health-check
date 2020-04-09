import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {CustomButton} from '../../assets/sfm-button';
import leftIcon from '../../images/icon-small-chevron-left.svg';
import downloadIcon from '../../images/icon-small-download.svg';
import linkIcon from '../../images/icon-small-link.svg';
import ReportsOverview from './sfm-reports-overview/sfm-reports-overview';
import DemographicsForm from './sfm-reports-demographics/demographics-form';
import AssessmentsOverview from './sfm-assessments-overview/sfm-assessments-overview';
import {withRouter} from 'react-router-dom';

let inProgressList=["Overview","Notes","Site Info","Client Info"];
let resultsList=["Overview","Demographics"];
let data = {
    summary: "Lore ipsum dolor sit amet, consectetur adipiscing elit. Integer velit metus, scelerisque sit amet placerat nec, commodo sit amet velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin mattis commodo magna.",
    overallRecs: "Vestibulum volutpat sit amet lacus eu convallis. Vestibulum volutpat sit amet lacus eu convallis. Vestibulum volutpat sit amet lacus eu convallis. Vestibulum volutpat sit amet lacus eu convallis.",
    score: 4.5,
    target: 6,
    indAvg: 2.8,
    reportsData :[
        {
            name: "Operations",
            keyThemes: "Vestibulum volutpat sit amet lacus eu convallis. Vestibulum volutpat sit amet lacus eu convallis. Vestibulum volutpat sit amet lacus eu convallis. Vestibulum volutpat sit amet lacus eu convallis.",
            recs: "Vestibulum volutpat sit amet lacus eu convallis. Vestibulum volutpat sit amet lacus eu convallis. Vestibulum volutpat sit amet lacus eu convallis. Vestibulum volutpat sit amet lacus eu convallis.",
            score: 4.5,
            target: 6.0,
            indAvg: 4.8,
            parts: [
                {
                    name: "Capability 1",
                    score: 3.2,
                    target: 5.8,
                    indAvg: 3.8,
                },
                {
                    name: "Capability 2",
                    score: 3,
                    target: 4.8,
                    indAvg: 3.8, 
                },
                {
                    name: "Capability 3",
                    score: 3.2,
                    target: 6.8,
                    indAvg: 3.8,
                },
                {
                    name: "Capability 4",
                    score: 3.2,
                    target: 3.4,
                    indAvg: 3.8,
                },
                {
                    name: "Capability 5",
                    score: 3.2,
                    target: 4,
                    indAvg: 3.8,
                }
            ]
        },
        {
            name: "Procurement & Supplier Management",
            keyThemes: "Vestibulum volutpat sit amet lacus eu convallis. Vestibulum volutpat sit amet lacus eu convallis. Vestibulum volutpat sit amet lacus eu convallis. Vestibulum volutpat sit amet lacus eu convallis.",
            recs: "Vestibulum volutpat sit amet lacus eu convallis. Vestibulum volutpat sit amet lacus eu convallis. Vestibulum volutpat sit amet lacus eu convallis. Vestibulum volutpat sit amet lacus eu convallis.",
            score: 4.5,
            target: 6.0,
            indAvg: 3.8,
            parts: [
                {
                    name: "Capability 1",
                    score: 3.2,
                    target: 5.8,
                    indAvg: 3.8,
                },
                {
                    name: "Capability 2",
                    score: 3,
                    target: 4.8,
                    indAvg: 3.8,
                },
                {
                    name: "Capability 3",
                    score: 3.2,
                    target: 6.8,
                    indAvg: 3.8,
                },
                {
                    name: "Capability 4",
                    score: 3.2,
                    target: 3.4,
                    indAvg: 3.8,
                },
                {
                    name: "Capability 5",
                    score: 3.2,
                    target: 4,
                    indAvg: 3.8,
                }
            ]
        }
    ]
};

let assessOverview = {
    functions: [
        {
            name: "Operations",
            percentComplete: "33",
            active: true,
            completed: false,
            parts: [
                {
                    name: "Capability 1",
                    active: true,
                    completed: true
                },
                {
                    name: "Capability 2",
                    active: true,
                    completed: false
                },
                {
                    name: "Capability 3",
                    active: false,
                    completed: false
                },
                {
                    name: "Capability 4",
                    active: true,
                    completed: true
                },
                {
                    name: "Capability 5",
                    active: true,
                    completed: true
                },
                {
                    name: "Capability 6",
                    active: false,
                    completed: false
                },
                {
                    name: "Capability 7",
                    active: true,
                    completed: false
                },
            ]
        },
        {
            name: "Procurement & Supplier Management",
            percentComplete: "73",
            active: true,
            completed: false,
            parts: [
                {
                    name: "Capability 1",
                    active: true,
                    completed: true
                },
                {
                    name: "Capability 2",
                    active: true,
                    completed: false
                },
                {
                    name: "Capability 3",
                    active: false,
                    completed: false
                },
                {
                    name: "Capability 4",
                    active: true,
                    completed: true
                },
                {
                    name: "Capability 5",
                    active: true,
                    completed: true
                },
                {
                    name: "Capability 6",
                    active: false,
                    completed: false
                },
            ]
        },
        {
            name: "Engineering R&D",
            percentComplete: "",
            active: false,
            completed: false,
            parts: [
                {
                    name: "Capability 1",
                    active: true,
                    completed: true
                },
                {
                    name: "Capability 2",
                    active: true,
                    completed: false
                },
                {
                    name: "Capability 3",
                    active: false,
                    completed: false
                },
                {
                    name: "Capability 4",
                    active: true,
                    completed: true
                },
                {
                    name: "Capability 5",
                    active: true,
                    completed: true
                },
                {
                    name: "Capability 6",
                    active: false,
                    completed: false
                },
                {
                    name: "Capability 7",
                    active: true,
                    completed: false
                },
            ]
        },
        {
            name: "Maintenance",
            percentComplete: "100",
            active: true,
            completed: true,
            parts: [
                {
                    name: "Capability 1",
                    active: true,
                    completed: true
                },
                {
                    name: "Capability 2",
                    active: true,
                    completed: true
                },
                {
                    name: "Capability 3",
                    active: false,
                    completed: true
                },
                {
                    name: "Capability 4",
                    active: true,
                    completed: true
                },
            ]
        }
    ]
};

class Reports extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:"Overview",
            companyName:"",
            locationName:"",
            reportsOverview: data,
            assessOverview: assessOverview,
            loadComponentString:""
        }
        this.props.disableMenu(false)
        
    }

    
    selectTab = (event)=>{
        if(event==="0"){
            this.setState({
                title:"Overview"
            })
        }
        else{
            this.setState({
                title:"Demographic"
            })
        }
    }

    
    resultHeader = ()=>{
        return(
            <div className="reports-container">
            <div className="assessment-title">
            <div className="assessment-overview-title">
                <CustomButton imgSrc={leftIcon} clickFunction={this.props.history.goBack}/>
                <span className="title-text">
                    {"Results "+this.state.title}
                </span>
            </div>
            <h2 className="location-name">
            {this.props.location.locationString!==undefined?this.props.location.locationString:"Bristol"}
            <span className="share-link">Share Link
                    <CustomButton className="share-link-button" imgSrc={linkIcon} />
                    Download PDF
                    <CustomButton className="share-link-button" imgSrc={downloadIcon} />
            </span>
            </h2>
                
            <h5 className="company-name">
            {this.props.location.companyName!==undefined?this.props.location.companyName:"Conagra"}
            </h5>
            <Tabs className="tab-group" onSelect={this.selectTab}>
                {resultsList.map((element,index)=>{
                    return(
                        <Tab key={index} eventKey={index} title={element} >
                            {element==="Demographics"?<DemographicsForm />:<ReportsOverview data={this.state.reportsOverview}/>}
                        </Tab>
                    )
                })}
            </Tabs>
            
            </div>
            </div>
        )
    }

    componentDidMount = ()=>{
        this.setState({
            loadComponentString:this.props.location.loadComponentString
        })
    }

    AssessmentsHeader = ()=>{
        return(
            <div className="reports-container">
                <div className="assessment-overview-title">
                    <CustomButton imgSrc={leftIcon} clickFunction={this.props.history.goBack}/>
                    <span className="title-text">
                        Assessment Overview
                    </span>
                </div>
                <h2 className="location-name">{this.props.location.locationString!==undefined?this.props.location.locationString:"Bristol"}
                </h2>
                    
                <h5 className="company-name">{this.props.location.companyName!==undefined?this.props.location.companyName:"Conagra"}</h5>
                <Tabs className="tab-group">
                    {inProgressList.map((element,index)=>{
                        return(
                            <Tab key={index} eventKey={index} title={element}>
                                {element==="Overview"?<AssessmentsOverview data={this.state.assessOverview}/>:""}
                            </Tab>
                        )
                    })}
                </Tabs>
            </div>
        )
    }


    render(){
    return(
    
      this.state.loadComponentString==="results"?this.resultHeader():this.AssessmentsHeader()
        
        
    )
}

}

export default withRouter(Reports)

// function displayComponent(tabName){
//     if(tabName==="Overview"){
//         return 
//     }
//     else if(tabName==="Notes"){
//         return
//     }
//     else if(tabName==="Site Info"){
//         return
//     }
//     else if(tabName==="Client Info"){
//         return 
//     }
// }