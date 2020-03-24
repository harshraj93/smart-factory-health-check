import React from 'react';
import './Tabs.scss';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

function CustomTab(props){

    
        return(
            <Tabs defaultActiveKey="All" id="selection-tabs">
                         <Tab eventKey="All" title="All">
                                 
                        </Tab>
                         <Tab eventKey="Open" title="Open">
                                
                         </Tab>
                         <Tab eventKey="Completed" title="Completed">
                                
                        </Tab>
            </Tabs>
        )
    }


export default CustomTab;