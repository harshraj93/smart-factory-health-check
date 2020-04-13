import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ToggleSwitch from 'react-switch';
import DropDownImg from '../../../images/icon-small-chevron-down.svg';
import EditIcon from '../../../images/icon-small-edit.svg';
import {CustomButton, FormNavigationButton} from '../../../assets/sfm-button';
import ReportsListView from '../sfm-reports-overview/sfm-reports-listview/sfm-reports-listview';
import './sfm-assessments-overview.scss';

function percentComplete(data, str) {
    return (
        <>
        <div className="percent-complete">
            <ProgressBar now={data.percentComplete} variant={str}/>
            <p style={{margin: "0", fontSize: "14px", float: "right", marginRight: "5px"}}>{data.percentComplete}% Complete</p>
        </div>
        </>
    )
}

class AssessmentsOverview extends React.Component {
    constructor(props){
        super(props);
        this.state={
            x: true,
            checked: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(id, checked) {
        // this.setState({ checked });
        document.getElementById(id).setAttribute("checked", !checked);
        
    }

    handleClick = (e)=>{
        let value = e.currentTarget.getAttribute("value")
        let index = value?value:0
        this.setState({
            arrayIndex:this.state.arrayIndex===String(index)?"":String(index)
        });
    }

    editAssessCard = () => {
        return (
            <Accordion className="assess-overview-accordion" defaultActiveKey={0}>
            {this.props.data.functions.map((data,index)=>{
                return (
                    <Card key={index} className={"card"}>                                   
                        <Card.Header className={"card-header "+(this.state.arrayIndex===String(index))}>
                        
                            <ToggleSwitch onChange={this.handleChange()} checked={!data.active} uncheckedIcon={false} checkedIcon={false} offColor="#57bb50" onColor="#161617" offHandleColor="#ffffff" onHandleColor="#727279" id={"switch"+index}/>
                            <div className="assess-overview-card">
                                <span className="area-name">{data.name}</span>
                                {data.completed?percentComplete(data, ""):percentComplete(data, "success")}
                                {data.completed?<FormNavigationButton labelName="Done"/>:<FormNavigationButton labelName="Open" style={{backgroundColor: "#57bb50"}}/>}
                            </div>
                            <Accordion.Toggle as={Button} value={index} variant="link" eventKey={0} onClick={(e,value)=>this.handleClick(e,value)}>
                                <img className="drop-down" src={DropDownImg} alt="" ></img>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={0}>
                            <div>
                                {data.parts.map((x,y) => {
                                    return (
                                        <div className="assess-overview-card" key={y}>
                                            <ToggleSwitch onChange={this.handleChange} checked={data.active?!x.active:!data.active} uncheckedIcon={false} checkedIcon={false} offColor="#57bb50" onColor="#161617" offHandleColor="#ffffff" onHandleColor="#727279" id={y}/>
                                            <div className="child-group">
                                            {x.active?<span className="area-name">{x.name}</span>:<span className="area-name" style={{opacity: "0.3"}}>{x.name}</span>}
                                            {x.active?(x.completed?<FormNavigationButton labelName="Done"/>:<FormNavigationButton labelName="Open" style={{backgroundColor: "#57bb50"}}/>):""}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </Accordion.Collapse>
                    </Card>
                )
            })}
            </Accordion>
        )
    }

    editBar = () => {
        return(
            <div className="edit-bar" onClick={this.editToggle}>
                <img src={EditIcon} alt=""></img>
                <p style={{margin: "0", marginLeft: "10px"}}>Edit</p>
            </div>
        )
    }

    applyChanges = () => {
        return (
            <div className="edit-bar">
                <CustomButton labelName="Cancel" style={{backgroundColor: "#161617", boxShadow: "0 0 0 2px inset #616161"}} clickFunction={this.editToggle}/>
                <CustomButton labelName="Apply Changes" clickFunction={this.editToggle}/>
            </div>
        )
    }

    editToggle = () => {
        if (this.state.x) {
            this.setState({
                x: false
            });
        }
        else {
            this.setState({
                x: true
            });
        }
    }

    render() {
        return(
            <div className="assess-overview">
                {this.state.x?this.editBar():this.applyChanges()}
                {this.state.x?<ReportsListView data={this.props.data}/>:this.editAssessCard()}
            </div>
        );
    }
}

export default AssessmentsOverview;