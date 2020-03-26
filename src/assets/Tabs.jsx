import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';


function CustomTab(props){

        console.log(props.accordion);
        return(
            <Tabs defaultActiveKey="All" id="selection-tabs" onClick={(e)=>props.onSelect(e)}>
                        {props.tabValues.map((element,index)=><Tab key={index} eventKey={element} title={element}>
                            {props.accordion}
                        </Tab>)}
                         
            </Tabs>
        )
    }


export default CustomTab;