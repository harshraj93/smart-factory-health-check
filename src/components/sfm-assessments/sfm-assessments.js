import React from 'react';
import CustomButton from '../../assets/sfm-button';
import CustomAccordion from '../../assets/Accordion'
import CustomTab from '../../assets/Tabs'
let tabValues = ["All","Open","Completed"];
let data=[{
    companyName:"Conagra",
    openNumber:"1",
    completedNumber:"3",
    industryType:"Consumer Products"
},  {
    companyName:"Evergreen",
    openNumber:"0",
    completedNumber:"1",
    industryType:"Industrial Consumer Products"
},{
    companyName:"Graham Packaging",
    openNumber:"0",
    completedNumber:"3",
    industryType:"Consumer Products"
}
];
class Assessments extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            accordionData:data
        }
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
                    <CustomTab  tabValues={tabValues} onSelect={(e)=>this.onSelect(e)}/>
                
                <div className="accordion-factory-view">
                    <CustomAccordion  data={this.state.accordionData}/>
                </div>
                </div>
            </div>
            
        );
    }
}

export default Assessments;