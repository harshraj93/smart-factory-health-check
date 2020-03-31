import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import './sfm-reports-container.scss';
import CustomButton from '../../assets/sfm-button';
import leftIcon from '../../images/icon-small-chevron-left.svg';
import downloadIcon from '../../images/icon-small-download.svg';
import linkIcon from '../../images/icon-small-link.svg';
import ReportsAccordion from '../sfm-reports-accordion/sfm-reports-accordion';
let inProgressList=["Overview","Notes","Site Info","Client Info"];
let resultsList=["Overview","Demographics"];


function ResultsHeader(props){
    return(
        <div className="reports-container">
        <div className="assessment-overview-title">
            <CustomButton imgSrc={leftIcon} />
            <span className="title-text">
                Results Overview
            </span>
        </div>
        <h2 className="location-name">Bristol
        <span className="share-link">Share Link
                <CustomButton className="share-link-button" imgSrc={linkIcon} />
        </span>
        <span className="download-link">Download PDF
                <CustomButton className="share-link-button" imgSrc={downloadIcon} />
        </span>
        </h2>
            
        <h5 className="company-name">Conagra</h5>
        <Tabs className="tab-group">
            {resultsList.map((element,index)=>{
                return(
                    <Tab key={index} eventKey={index} title={element}></Tab>
                )
            })}
        </Tabs>

        </div>
    )
}


function AssessmentsHeader(props){
    return(
    <div className="reports-container">
        <div className="assessment-overview-title">
            <CustomButton imgSrc={leftIcon} />
            <span className="title-text">
                Assessment Overview
            </span>
        </div>
        <h2 className="location-name">Bristol
        {/* <span className="share-link">Share Link
                <CustomButton className="share-link-button" imgSrc={linkIcon} />
        </span>
        <span className="download-link">Download PDF
                <CustomButton className="share-link-button" imgSrc={downloadIcon} />
        </span> */}
        </h2>
            
        <h5 className="company-name">Conagra</h5>
        <Tabs className="tab-group">
            {inProgressList.map((element,index)=>{
                return(
                    <Tab key={index} eventKey={index} title={element}>
                        
                    </Tab>
                )
            })}
        </Tabs>

        </div>
        )
}

 class Reports extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
    return(
        <ResultsHeader>
            
        </ResultsHeader>
        
    )
}

}

export default Reports

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