import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import './sfm-reports-container.scss';
import CustomButton from '../../assets/sfm-button';
import leftIcon from '../../images/icon-small-chevron-left.svg';
import downloadIcon from '../../images/icon-small-download.svg';
import linkIcon from '../../images/icon-small-link.svg';
import ReportsOverview from './sfm-reports-overview/sfm-reports-overview';
import DemographicsForm from './sfm-reports-demographics/demographics-form';

let inProgressList=["Overview","Notes","Site Info","Client Info"];
let resultsList=["Overview","Demographics"];


 class Reports extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:"Overview"
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
                <CustomButton imgSrc={leftIcon} />
                <span className="title-text">
                    {"Results "+this.state.title}
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
            <Tabs className="tab-group" onSelect={this.selectTab}>
                {resultsList.map((element,index)=>{
                    return(
                        <Tab key={index} eventKey={index} title={element} >
                            {element==="Demographics"?<DemographicsForm />:<ReportsOverview/>}
                        </Tab>
                    )
                })}
            </Tabs>
            
            </div>
            </div>
        )
    }

    AssessmentsHeader = ()=>{
        return(
        <div className="reports-container">
            <div className="assessment-overview-title">
                <CustomButton imgSrc={leftIcon} />
                <span className="title-text">
                    Assessment Overview
                </span>
            </div>
            <h2 className="location-name">Bristol
            </h2>
                
            <h5 className="company-name">Conagra</h5>
            <Tabs className="tab-group">
                {inProgressList.map((element,index)=>{
                    return(
                        <Tab key={index} eventKey={index} title={element}></Tab>
                    )
                })}
            </Tabs>
    
            
            </div>
            )
    }


    render(){
    return(
    
      this.resultHeader()
        
        
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