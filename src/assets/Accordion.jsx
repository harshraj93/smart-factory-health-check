import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from './bootstrap-table';
import UploadImg from '../images/icon-small-upload.svg';
import DropDownImg from '../images/icon-small-chevron-down.svg';
import './Accordion.scss';
class CustomAccordion extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Accordion defaultActiveKey="0">
                        <Card>
                            <Card.Header>
                                <div className="industry-name-number">
                                    <span className="company-name">
                                        Conagra<img className="upload" src={UploadImg}/>
                                    </span>
                                    
                                        <span className="number-open">
                                            1
                                        </span>
                                        <span className="number-completed">
                                            3
                                        </span>
                                </div>
                                <div className="industry-text-info">
                                     <span className="products">
                                        Consumer Products
                                     </span>   
                                    <span className="open-text">
                                            Open
                                    </span>
                                    <span className="completed-text">
                                            Completed
                                    </span>
                                </div>
                                       
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                       <div className="dropdown-icon"><img src={DropDownImg}/></div>
                                </Accordion.Toggle>
                            </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Table></Table>
                                </Accordion.Collapse>
                         </Card>
                        
            </Accordion>
        )
    }
}

export default CustomAccordion;