import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from './bootstrap-table';
import UploadImg from '../images/icon-small-upload.svg';
import DropDownImg from '../images/icon-small-chevron-down.svg';
import CustomButton from './sfm-button';
import './Accordion.scss';

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
]



class CustomAccordion extends React.Component{
    constructor(props){
        super(props);
        this.state={
            arrayIndex:0
        }
    }

    changeAccordionState = (e)=>{
        let value = e.currentTarget.getAttribute("value")
        this.setState({
            arrayIndex:value
        })
        
    }

    render(){
        return(
            <Accordion defaultActiveKey={0}>
            {data.map((data,index)=>{
                return(
                        <Card>
                            <Card.Header className={"card-header "+index===this.state.arrayIndex?"active":"inactive"}>
                                <div className="industry-name-number">
                                    <span className="company-name">
                                        {data["companyName"]}<img className="upload" src={UploadImg}/>
                                    </span>
                                    
                                    <span className="number-open">
                                        {data["openNumber"]}
                                    </span>
                                    <span className="number-completed">
                                            {data["completedNumber"]}
                                    </span>
                                </div>
                                <div className="industry-text-info">
                                     <span className="products">
                                        {data["industryType"]}
                                     </span>   
                                     <span className="open-text">
                                            Open
                                     </span>
                                     <span className="completed-text">
                                            Completed
                                     </span>
                                </div>
                                       
                                <Accordion.Toggle as={Button} variant="link" eventKey={index} >
                                       <div className="dropdown-icon" ><img src={DropDownImg} value={index} onClick={(e)=>this.changeAccordionState(e)}/></div>
                                </Accordion.Toggle>
                            </Card.Header>
                                <Accordion.Collapse eventKey={index}>
                                    <Table />
                                </Accordion.Collapse>
                         </Card>
                        
            
                )
            })}
            </Accordion>
            
        )
    }
}

export default CustomAccordion;