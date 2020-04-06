import React from 'react';
import CustomButton from '../../assets/sfm-button';
import CustomAccordion from './Accordion'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {Link} from 'react-router-dom';

let tabValues = ["All","Open","Completed"];
let data = [{
    companyName:"Conagra",
    openNumber:"6",
    completedNumber:"2",
    siteList:[{
        openNumber:"3",
        completedNumber:"1",
        industryType:"Consumer Products",
        table_data:[{
            Location:"Bristol",
            POC:"Jana Strassman",
            Status:"In Progress",
            OpenedOn:"26/11/12"
        },{
            Location:"Edinburgh",
            POC:"Jana Strassman",
            Status:"In Progress",
            OpenedOn:"21/11/18"
        },{
            Location:"Odessa",
            POC:"Jana Strassman",
            Status:"10/25/2019",
            OpenedOn:"26/06/16"
        },{
            Location:"Bristol",
            POC:"Jana Strassman",
            Status:"In Progress",
            OpenedOn:"26/01/19"
        }]
    },
    {
        openNumber:"3",
        completedNumber:"1",
        industryType:"Healthcare Products",
        table_data:[{
            Location:"Bristol",
            POC:"Jana Strassman",
            Status:"In Progress",
            OpenedOn:"26/02/14"
        },{
            Location:"Edinburgh",
            POC:"Jana Strassman",
            Status:"In Progress",
            OpenedOn:"26/12/19"
        },{
            Location:"Odessa",
            POC:"Jana Strassman",
            Status:"10/25/2019",
            OpenedOn:"26/11/12"
        },{
            Location:"Bristol",
            POC:"Jana Strassman",
            Status:"In Progress",
            OpenedOn:"26/11/12"
        }]
    }]
    },{
        companyName:"Evergreen",
        openNumber:"3",
        completedNumber:"1",
        siteList:[{
        openNumber:"3",
        completedNumber:"1",
        industryType:"Consumer Products",
        table_data:[{
            Location:"Chicago",
            POC:"Jana Strassman",
            Status:"In Progress",
            OpenedOn:"26/11/12"
        },{
            Location:"New York",
            POC:"Jana Strassman",
            Status:"In Progress",
            OpenedOn:"26/11/12"
        },{
            Location:"Washington",
            POC:"Jana Strassman",
            Status:"10/25/2019",
            OpenedOn:"26/11/12"
        },{
            Location:"Bristol",
            POC:"Jana Strassman",
            Status:"In Progress",
            OpenedOn:"26/11/12"
        }]
    }]
}
]





class Assessments extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            accordionData:data
        }
        this.props.disableMenu("true");
    }

    
    onSelect = (e)=>{
        let accordionData;
        let tabText = e.target.childNodes[0].wholeText;
        if(tabText==="Open"){
            accordionData = data.filter(element=>{
                return element.openNumber!=="0";
            })
            
        }
        else if(tabText==="Completed"){
            accordionData = data.filter(element=>{
                return element.openNumber==="0";
            })
           
        }
        else{
            accordionData=data
        }
        this.setState({
            accordionData:accordionData
        })
    }


    triggerSearch=(e)=>{
        let value = e.target.value;
        if(value.length>0){
        let searchedData = data.filter(element=>{
            return value.match(element.companyName.toLowerCase())
        })
        this.setState({
            accordionData:searchedData===undefined?this.state.accordionData:searchedData
        })
    }
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