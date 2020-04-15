import React from 'react';
import {CustomButton} from '../../assets/sfm-button';
import CustomAccordion from './Accordion'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {Link} from 'react-router-dom';
import {assessmentsApi} from '../../api/assessments/assessments'
import {apiGetHeader,apiPostHeader} from '../../api/main/mainapistorage'

let tabValues = ["All","Open","Completed"];


class Assessments extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            data:[],
            accordionData:[]
        }
        this.props.disableMenu("true");
    }

    
    onSelect = (e)=>{
        let accordionData;
        let tabText = e.target.childNodes[0].wholeText;
        if(tabText==="Open"){
            accordionData = this.state.data.filter(element=>{
                return element.openNumber!=="0";
            })
            
        }
        else if(tabText==="Completed"){
            accordionData = this.state.data.filter(element=>{
                return element.openNumber==="0";
            })
           
        }
        else{
            accordionData=this.state.data
        }
        this.setState({
            accordionData:accordionData
        })
    }


    fetchAssessmentsData = ()=>{
        console.log(JSON.parse(apiGetHeader))
    fetch(assessmentsApi.getAssessments,JSON.parse(apiGetHeader))
        .then(results=>results.json())
        .then(resp=>this.setState({data:resp.resultantJSON,accordionData:resp.resultantJSON}))
        .catch(err=>console.log(err))
    }


    componentDidMount = ()=>{
        this.fetchAssessmentsData();
    }


    render() {
        return (
            <div className="assessments">
                
                <div className="search-and-add">
                    <span className="search">
                        <label htmlFor="search-box"><span className="glyphicon glyphicon-search" /></label>
                        <input id="icon" onChange={(e)=>this.triggerSearch(e)} type="text" placeholder={"Search Clients"} className="search-clients"></input>
                    </span>
                    <span className="add-button">
                    <Link to="/addnewclient"><CustomButton labelName="Add Client"/></Link>
                    </span>
                </div>
                <div className="tab-group">
                <Tabs defaultActiveKey="All" id="selection-tabs" onClick={(e)=>this.onSelect(e)}>
                        {tabValues.map((element,index)=><Tab key={index} eventKey={element} title={element}>
                        <div className="accordion-factory-view">
                                <CustomAccordion  data={this.state.accordionData} disableMenu={this.props.disableMenu}/>
                        </div>
                        </Tab>)}
                         
                </Tabs>
                
               
                </div>
            </div>
            
        );
    }
}

export default Assessments;