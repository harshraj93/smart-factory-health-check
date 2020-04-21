import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from "react-bootstrap/Form";
import DropDownImg from '../../../images/icon-small-chevron-down.svg';
import EditIcon from '../../../images/icon-small-edit.svg';
import {CustomButton, FormNavigationButton} from '../../../assets/sfm-button';
import ReportsListView from '../sfm-reports-overview/sfm-reports-listview/sfm-reports-listview';
import assessOverviewApi from '../../../api/assessments/assess-overview';
import {apiPostHeader} from '../../../api/main/mainapistorage';
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

let body = {};
let overviewData;

class AssessmentsOverview extends React.Component {
    constructor(props){
        super(props);
        this.state={
            x: true,
            checked: false,
            jsonData: {},
            clientName: "",
            siteName: "",
            sector: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    fetchEdit = async() => {
        apiPostHeader.body = JSON.stringify(body);
        try{
            const response = await fetch(assessOverviewApi.editOverview,apiPostHeader)
            overviewData = await response.json();
        }
        catch(err){
            overviewData = err;
        }
        // console.log(overviewData.resultantJSON.rowCount);
    }

    fetchOverview = async()=> {
        let body = {
            "clientName": this.state.clientName,
            "siteName": this.state.siteName,
            "sector": this.state.sector
        }
        apiPostHeader.body = JSON.stringify(body);
        try{
        const response = await fetch(assessOverviewApi.assessOverview,apiPostHeader)
        // console.log(response);
        const overviewData = await response.json();
        // console.log(overviewData);
        return overviewData;
        }
        catch(err){
            return err
        }
    }

    updateData = async() => {
        let overviewData = await this.fetchOverview();
        await this.setState({
            // [id]: target.checked
            jsonData: overviewData
        });
        this.editAssessCard();
        this.sendData();
    }

    onChange = (e) => {
        const target = e.target;
        const id = target.id;
        const names = id.split("_");
        if (names.length > 1) {
            body = {
                "editValueFor": names[1],
                "clientName": this.state.clientName,
                "siteName": this.state.siteName,
                "sector": this.state.sector,
                "businessFunction": names[0],
                "capability": names[1],
                "action": !target.checked
            };
        }
        else {
            body = {
                "editValueFor": names[0],
                "clientName": this.state.clientName,
                "siteName": this.state.siteName,
                "sector": this.state.sector,
                "businessFunction": names[0],
                "capability": "",
                "action": !target.checked
            };
        }
        this.fetchEdit();
        this.updateData();

        target.setAttribute("checked", !target.checked)

        // console.log("onChange was called!");
    };

    handleChange(e) {
        // this.setState({ checked });
        // document.getElementById(id).setAttribute("checked", !checked);
        let id = e.currentTarget.getAttribute("id");

        this.setState({
            [id]: e.currentTarget.getAttribute("checked")
        })
    }

    handleClick = (e)=>{
        let value = e.currentTarget.getAttribute("value")
        let index = value?value:0
        this.setState({
            arrayIndex:this.state.arrayIndex===String(index)?"":String(index)
        });
    }

    saveBtn = () => {
        // this.assessmentsCard();
        this.setState({
            x:false
        });
    }

    editAssessCard = () => {
        return (
            <Accordion className="assess-overview-accordion" defaultActiveKey={0}>
            {this.state.jsonData.businessFunction.map((data,index)=>{
                return (
                    data.active?this.editActiveCard(data, index):this.editInactiveCard(data, index)
                )
            })}
            </Accordion>
        )
    }

    editBar = () => {
        // this.setState({
        //     jsonData:this.props.data
        // });
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

    editActiveCard = (data, index) => {
        return (
            <Card key={index} className={"card"}>                                   
                <Card.Header className={"card-header "+(this.state.arrayIndex===String(index))}>
                
                <Form.Switch id={data.name} title={data.name} label="" onChange={this.onChange}/> 
                {/* checked={true} */}
                    <div className="assess-overview-card">
                        <span className="area-name">{data.name}</span>
                        {data.business_funtion_level_status!=="Open"?percentComplete(data, ""):percentComplete(data, "success")}
                        {data.business_funtion_level_status!=="Open"?<FormNavigationButton labelName="Done" style={{opacity: "0.5"}}/>:<FormNavigationButton labelName="Open" style={{opacity: "0.5", backgroundColor: "#57bb50"}}/>}
                    </div>
                    <Accordion.Toggle as={Button} value={index} variant="link" eventKey={0} onClick={(e,value)=>this.handleClick(e,value)}>
                        <img className="drop-down" src={DropDownImg} alt="" ></img>
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={0}>
                    <div>
                        {data.Capability.map((x,y) => {
                            return (
                                <div className="assess-overview-card" key={y}>
                                    <Form.Switch id={data.name + "_" + x.name} label="" onChange={this.onChange} checked={!x.active}/>
                                    <div className="child-group">
                                    {x.active?<span className="area-name">{x.name}</span>:<span className="area-name" style={{opacity: "0.3"}}>{x.name}</span>}
                                    {x.active?(x.status!=="Open"?<FormNavigationButton labelName="Done"/>:<FormNavigationButton labelName="Open" style={{backgroundColor: "#57bb50"}}/>):""}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Accordion.Collapse>
            </Card>
        )
    }

    editInactiveCard = (data, index) => {
        return (
            <Card key={index} className={"card"}>
                <Card.Header className={"card-header"} style={{backgroundColor: "#232325"}}>
                    <div className="assess-overview-card-inactive">
                        <Form.Switch id={data.name} title={data.name} label="" onChange={this.onChange} checked={true}/>
                        <span className="area-name" style={{opacity: "0.3"}}>{data.name}</span>
                    </div>
                </Card.Header>
            </Card>
        )
    }

    activeCard = (data, index) => {
        return (
            <Card key={index} className={"card"}>                                   
                <Accordion.Toggle as={Card.Header} className={"card-header "+(this.state.arrayIndex===String(index))} value={index} variant="link" eventKey={index} onClick={(e,value)=>this.handleClick(e,value)}>
                    <div className="assess-overview-card">
                        <span className="area-name">{data.name}</span>
                        {data.business_funtion_level_status!=="Open"?percentComplete(data, ""):percentComplete(data, "success")}
                        {data.business_funtion_level_status!=="Open"?<FormNavigationButton labelName="Done" style={{marginRight: "28px"}}/>:<FormNavigationButton labelName="Open" style={{backgroundColor: "#57bb50", marginRight: "28px"}}/>}
                    </div>
                    <img className="drop-down" src={DropDownImg} alt="" ></img>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={index}>
                    <div>
                        {data.Capability.map((x,y) => {
                            return (
                                <div className="assess-overview-card" key={y}>
                                    {x.active?<span className="area-name">{x.name}</span>:<span className="area-name" style={{opacity: "0.3"}}>{x.name}</span>}
                                    {x.active?(x.status!=="Open"?<FormNavigationButton labelName={<>&#10003;</>}/>:<FormNavigationButton labelName="Open" style={{backgroundColor: "#57bb50"}}/>):""}
                                </div>
                            )
                        })}
                    </div>
                </Accordion.Collapse>
            </Card>
        )
    }

    inactiveCard = (data, index) => {
        return (
            <Card key={index} className={"card"}>
                <Card.Header className={"card-header"} style={{opacity: "0.3"}}>
                    <div className="assess-overview-card">
                        <span className="area-name">{data.name}</span>
                    </div>
                </Card.Header>
            </Card>
        )
    }

    assessmentsCard = () => {
        return (
            <Accordion className="assess-overview-accordion" defaultActiveKey={0}>
            {this.state.jsonData.businessFunction.map((data,index)=>{
                return(
                    data.active?this.activeCard(data, index):this.inactiveCard(data, index)
                )
            })}
            </Accordion>
        )
    }

    // fetchOverview = async()=> {
    //     console.log(this.props.data);
    //     apiPostHeader.body = JSON.stringify(this.props.data);
    //     // console.log(apiPostHeader);
    //     try{
    //     const response = await fetch(assessOverviewApi.assessOverview,apiPostHeader)
    //     const overviewData = await response.json();
    //     return overviewData;
    //     }
    //     catch(err){
    //         return err
    //     }
    // }

    sendData = async() => {
        if (this.state.jsonData === {}) {
            return ""
        }
        else {
            return this.state.jsonData
        }
    }

    componentDidMount = async()=> {
        // let overviewData = await this.fetchOverview();
        await this.setState({
            jsonData:this.props.data,
            clientName: this.props.data.clientName, 
            siteName: this.props.data.siteName,
            sector:this.props.data.sector
        })
        // console.log(this.state.jsonData)
    }

    render() {
        return(
            <div className="assess-overview">
                {this.state.x?this.editBar():this.applyChanges()}
                {this.state.x?<ReportsListView data={this.props.data} updatedData={this.sendData()}/>:this.editAssessCard()}
            </div>
        );
    }
}

export default AssessmentsOverview;