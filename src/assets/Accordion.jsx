import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from './bootstrap-table';
import UploadImg from '../images/icon-small-upload.svg';
import DropDownImg from '../images/icon-small-chevron-down.svg';

let lastIndex;
function industryCard (props){
    return (
    <> 
        <div className="industry-name-number">
            <span className="company-name">
                {props["companyName"]?props["companyName"]:props["industryType"]}
                {props["companyName"]?<img className="upload" src={UploadImg} alt=""/>:null}
            </span>
    
             <span className="number-open">
                {props["openNumber"]}
            </span>
            <span className="number-completed">
                {props["completedNumber"]}
            </span>
        </div>
        <div className="industry-text-info">
            <span></span>
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

    // changeAccordionState = (e)=>{
        
    //     let value = e.currentTarget.getAttribute("value");
    //     let backgroundColor = document.getElementsByClassName("card-header "+value+" card-header")[0].style.backgroundColor;
    //     if((lastIndex)&&lastIndex!==value&&document.getElementsByClassName("card-header "+lastIndex+" card-header")[0].style.backgroundColor==="rgb(190, 190, 190)"){
    //         document.getElementsByClassName("card-header "+lastIndex+" card-header")[0].style.backgroundColor="#35353b";
    //         document.getElementsByClassName("card-header "+lastIndex+" card-header")[0].style.color="#ffffff";
    //         }
    //     if(backgroundColor==="rgb(190, 190, 190)"){
            
    //         document.getElementsByClassName("card-header "+value+" card-header")[0].style.backgroundColor="#35353b";
    //         document.getElementsByClassName("card-header "+value+" card-header")[0].style.color="#ffffff";
    //     }
    //     else{
    //     document.getElementsByClassName("card-header "+value+" card-header")[0].style.color="#161617";
    //     document.getElementsByClassName("card-header "+value+" card-header")[0].style.backgroundColor="#bebebe";
    //     }
    //     lastIndex=value;
        
    // }

    render(){
        return(
            <Accordion className="accordion-parent">
            {this.props.data.map((data,index)=>{
                return(
                        <Card key={index}>
                            <Card.Header className={"card-header" }>
                                    {industryCard(data)}
                                       
                                <Accordion.Toggle as={Button} variant="link" eventKey={index} value={index}>
                                <img src={DropDownImg} alt=""></img>
                                </Accordion.Toggle>
                            </Card.Header>
                                <Accordion.Collapse eventKey={index}>
                                    <Accordion className="accordion-child">
                                        {data.siteList.map((element,index)=>{
                                            return(
                                                <Card key={index} className="child-card">
                                                <Card.Header className={"card-header-child"}>
                                                            {industryCard(element)}
                                                    <Accordion.Toggle as={Button} variant="link" eventKey={index} value={index} >
                                                    <img src={DropDownImg} alt=""></img>
                                                    </Accordion.Toggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey={index}>
                                                    <Table data={element.table_data} />
                                                </Accordion.Collapse>

                                                </Card>
                                            )
                                        })}
                                    </Accordion>
                                </Accordion.Collapse>
                         </Card>
                        
            
                )
            })}
            </Accordion>
            
        )
    }
}

export default CustomAccordion;