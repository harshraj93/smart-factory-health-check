import React from 'react';
import CustomButton from '../../assets/sfm-button';
import CustomAccordion from './Accordion'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

let tabValues = ["All","Open","Completed"];
let data = [{
    companyName:"Conagra",
    openNumber:"0",
    completedNumber:"6",
    siteList:[{
        openNumber:"0",
        completedNumber:"3",
        industryType:"Consumer Products",
        table_data:[{
            Location:"Bristol",
            DeloitteLead:"Jana Strassman",
            Completed:"In Progress",
        
        },{
            Location:"Edinburgh",
            DeloitteLead:"Jana Strassman",
            Completed:"In Progress",
        
        },{
            Location:"Odessa",
            DeloitteLead:"Jana Strassman",
            Completed:"10/25/2019",
        
        },{
            Location:"Bristol",
            DeloitteLead:"Jana Strassman",
            Completed:"In Progress",
        
        }]
    },
    {
        openNumber:"0",
        completedNumber:"3",
        industryType:"Healthcare Products",
        table_data:[{
            Location:"Bristol",
            DeloitteLead:"Jana Strassman",
            Completed:"In Progress",
        
        },{
            Location:"Edinburgh",
            DeloitteLead:"Jana Strassman",
            Completed:"In Progress",
        
        },{
            Location:"Odessa",
            DeloitteLead:"Jana Strassman",
            Completed:"10/25/2019",
        
        },{
            Location:"Bristol",
            DeloitteLead:"Jana Strassman",
            Completed:"In Progress",
        
        }]
    }]
    },{
        companyName:"Evergreen",
        openNumber:"0",
        completedNumber:"3",
        siteList:[{
        openNumber:"0",
        completedNumber:"3",
        industryType:"Consumer Products",
        table_data:[{
            Location:"Chicago",
            DeloitteLead:"Jana Strassman",
            Completed:"In Progress",
        
        },{
            Location:"New York",
            DeloitteLead:"Jana Strassman",
            Completed:"In Progress",
        
        },{
            Location:"Washington",
            DeloitteLead:"Jana Strassman",
            Completed:"10/25/2019",
        
        },{
            Location:"Bristol",
            DeloitteLead:"Jana Strassman",
            Completed:"In Progress",
        
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

    render() {
        return (
            <div className="assessments">
                
                <div className="search-and-add">
                    <span className="search">
                        <label htmlFor="search-box"><span className="glyphicon glyphicon-search" /></label>
                        <input type="text" placeholder={"Search Clients"} className="search-clients"></input>
                    </span>
                    <span className="add-button">
                        <CustomButton labelName="Add Client"/>
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