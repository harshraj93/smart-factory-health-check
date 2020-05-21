import React from 'react';
import {CustomButton} from '../../assets/sfm-button';
import CustomAccordion from './Accordion'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {Link} from 'react-router-dom';
import {assessmentsApi} from '../../api/assessments/assessments'
import {apiGetHeader} from '../../api/main/mainapistorage'
import parseAssessmentsJSON from '../../util/assessmentspageutil'
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
                return element.openNumber!==0 ;
            })
            
        }
        else if(tabText==="Completed"){
            accordionData = this.state.data.filter(element=>{
                return element.openNumber===0;
            })
           
        }
        else{
            accordionData=this.state.data
        }
        this.setState({
            accordionData:accordionData
        })
    }

    parsingFunctions = (data)=>{
        let jsondata = parseAssessmentsJSON(data);
        this.setState({
            data:jsondata.resultantJSON,
            accordionData:jsondata.resultantJSON
        })
    }

    
    fetchAssessmentsData = ()=>{
    fetch(assessmentsApi.getAssessments,apiGetHeader)
        .then(results=>results.json())
        .then(resp=>this.parsingFunctions(resp))
        .catch(err=>console.log(err))
    }


    componentDidMount = ()=>{
        this.fetchAssessmentsData();
        localStorage.setItem("sitedetailsstate","");
        localStorage.setItem("addsitedata","");
        localStorage.setItem("addnewclient","")
    }


    render() {
        return (
            <div className="assessments">
                
                <div className="search-and-add">
                    <span className="search" style={{opacity: "0"}}>
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