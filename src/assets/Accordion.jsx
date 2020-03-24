import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Table from './bootstrap-table'

class CustomAccordion extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Accordion defaultActiveKey="0">
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        Click me!
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