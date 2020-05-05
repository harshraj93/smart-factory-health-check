import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from '../../assets/bootstrap-table';
import {Link} from 'react-router-dom';
import DropDownImg from '../../images/icon-small-chevron-down.svg';
import {withRouter} from 'react-router-dom';
import addIcon from "../../images/icon-small-add-first.svg";
let companyName =""; 
function industryCard (props){
    companyName=props["companyName"]===undefined?companyName:props["companyName"];
    return (
    <> 
        <div className="industry-name-number">
            <span className="company-name">
                {props["companyName"]?props["companyName"] :props["sector"]}

            </span>
    
             <span className="number-open">
                {props["openNumber"]}
            </span>
            <span className="number-completed">
                {props["completedNumber"]}
            </span>
        </div>
        <div className="industry-text-info">
            <Link to="/addnewsite"><span className="add-site">{props["companyName"]?<div className="add-site"><img src={addIcon} />Add Site</div>:""}</span></Link>
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
            arrayIndex:"0",
            childCardArrayIndex:"0"
        }
    }


    handleClick = (e)=>{
        let index = e.currentTarget.value?e.currentTarget.value:0
        this.setState({
            arrayIndex:this.state.arrayIndex===String(index)?"":index,
        })
    }


    handleChildClick = (e)=>{
        let index = e.currentTarget.value?e.currentTarget.value:0
        this.setState({
           childCardArrayIndex:this.state.childCardArrayIndex===String(index)?"":index
        })
    }


    render(){
        
        return(
            <Accordion className="accordion-parent" defaultActiveKey={0}>
            {this.props.data.map((data,index)=>{
                
                return(
                        <Card key={index} className={"card "+(this.state.arrayIndex===String(index))}>
                        
                            <Card.Header className={"card-header "+(this.state.arrayIndex===String(index))}>
                                    {industryCard(data)}
                                <Accordion.Toggle as={Button} variant="link" eventKey={index} value={index} onClick={(e)=>this.handleClick(e)}>
                                    <img className="drop-down" src={DropDownImg} alt=""></img>
                                </Accordion.Toggle>
                            </Card.Header>
                                <Accordion.Collapse eventKey={index}>
                                    <Accordion className="accordion-child" defaultActiveKey={0}>
                                        {data.siteList.map((element,siteListIndex)=>{
                                            return(
                                                <Card key={siteListIndex} className="child-card">
                                                <Card.Header className={"card-header-child "+(this.state.childCardArrayIndex===String(siteListIndex))} >
                                                            {industryCard(element)}
                                                    <Accordion.Toggle as={Button} variant="link" eventKey={siteListIndex} value={siteListIndex} onClick={(e)=>this.handleChildClick(e)}>
                                                    <img className="drop-down" src={DropDownImg} alt=""></img>
                                                    </Accordion.Toggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey={siteListIndex}>
                                                    
                                                    <Table 
                                                    data={element.table_data} 
                                                    industryType={element.sector} 
                                                    disableMenu={this.props.disableMenu}
                                                    companyName = {companyName}
                                                    />
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

export default withRouter(CustomAccordion);