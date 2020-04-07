import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import EditIcon from '../../../images/icon-small-edit.svg';
import ReportsListView from '../sfm-reports-overview/sfm-reports-listview/sfm-reports-listview';
import './sfm-assessments-overview.scss';

class AssessmentsOverview extends React.Component {
    constructor(props){
        super(props);
        this.state={
            
        }
    }

    render() {
        return(
            <div className="assess-overview">
                <div className="edit-bar">
                    <img src={EditIcon} alt=""></img>
                    <p style={{margin: "0", marginLeft: "10px"}}>Edit</p>
                </div>
                <ReportsListView data={this.props.data}/>
            </div>
        );
    }
}

export default AssessmentsOverview;