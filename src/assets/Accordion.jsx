import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from './bootstrap-table';
import UploadImg from '../images/icon-small-upload.svg';
import DropDownImg from '../images/icon-small-chevron-down.svg';


function industryCard (props){
    return (
    <> 
        <div className="industry-name-number">
            <span className="company-name">
                {props["companyName"]}<img className="upload" src={UploadImg} alt=""/>
            </span>
    
             <span className="number-open">
                {props["openNumber"]}
            </span>
            <span className="number-completed">
                {props["completedNumber"]}
            </span>
        </div>
        <div className="industry-text-info">
            <span className="products">
                {props["industryType"]}
            </span>   
            <span className="open-text">
                Open
            </span>
            <span className="completed-text">
                Completed
            </span>
        </div>
    </>
 )}


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
            {this.props.data.map((data,index)=>{
                return(
                        <Card>
                            <Card.Header className={"card-header "+index===this.state.arrayIndex?"active":"inactive"}>
                                    {industryCard(data)}
                                       
                                <Accordion.Toggle as={Button} variant="link" eventKey={index} >
                                       <div className="dropdown-icon" ><img src={DropDownImg} alt="" value={index} onClick={(e)=>this.changeAccordionState(e)}/></div>
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