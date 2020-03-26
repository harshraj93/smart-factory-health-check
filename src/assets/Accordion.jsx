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
            
        }
    }

    changeAccordionState = (e)=>{
        let value = e.currentTarget.getAttribute("value");
        let backgroundColor = document.getElementsByClassName("card-header "+value+" card-header")[0].style.backgroundColor
        if(backgroundColor==="rgb(190, 190, 190)"){
            document.getElementsByClassName("card-header "+value+" card-header")[0].style.backgroundColor="#35353b";
            document.getElementsByClassName("card-header "+value+" card-header")[0].style.color="#ffffff";
        }
        else{
        document.getElementsByClassName("card-header "+value+" card-header")[0].style.color="#161617";
        document.getElementsByClassName("card-header "+value+" card-header")[0].style.backgroundColor="#bebebe";
        }
        
    }

    render(){
        
        return(
            <Accordion>
            {this.props.data.map((data,index)=>{
                return(
                        <Card key={index}>
                            <Card.Header className={"card-header "+index }>
                                    {industryCard(data)}
                                       
                                <Accordion.Toggle as={Button} variant="link" eventKey={index} value={index} onClick={(e)=>this.changeAccordionState(e)}>
                                <img src={DropDownImg} alt=""></img>
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