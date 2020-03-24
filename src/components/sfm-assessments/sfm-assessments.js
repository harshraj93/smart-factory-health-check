import React from 'react';
import './sfm-assessments.scss';
import CustomButton from '../../assets/sfm-button';
import CustomAccordion from '../../assets/Accordion'
import CustomTab from '../../assets/Tabs'
class Assessments extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div class="assessments">
                
                <div className="search-and-add">
                    <span className="search">
                        <label for="search-box"><span class="glyphicon glyphicon-search" /></label>
                        <input type="text" placeholder={"Search Clients"} className="search-clients"></input>
                    </span>
                    <span className="add-button">
                        <CustomButton labelName="Add Client"/>
                    </span>
                </div>
                <div className="tab-group">
                    <CustomTab />
                </div>
                <div className="accordion-factory-view">
                    <CustomAccordion />
                </div>
            </div>
            
        );
    }
}

export default Assessments;