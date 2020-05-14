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
            <p style={{margin: "0", fontSize: "14px", float: "right", marginRight: "5px"}}>{Math.ceil(Number(data.percentComplete))}% Complete</p>
        </div>
        </>
    )
}

let body = {};
let editBusinessFunction = [];
let editCapability = [];
let msg;

class AssessmentsOverview extends React.Component {
    constructor(props){
        super(props);
        this.state={
            x: true,
            checked: false,
            jsonData: {},
            clientName: "",
            siteName: "",
            sector: "",
            siteid: "",
            clientId: "",
            prevData: {}
        }
        this.handleChange = this.handleChange.bind(this);
    }

    fetchEdit = async() => {
        apiPostHeader.body = JSON.stringify(body);
        try{
            const response = await fetch(assessOverviewApi.editOverview,apiPostHeader)
            msg = await response.json();
        }
        catch(err){
            msg = err;
        }
        // console.log(msg);
    }

    fetchOverview = async()=> {
        let body = {
            // "clientName": this.state.clientName,
            // "siteName": this.state.siteName,
            // "sector": this.state.sector
            "siteId":this.state.siteid
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
        // this.editAssessCard();
        // this.sendData();
    }

    onChange = index => (e) => {
        let editdata = this.state.jsonData;
        const target = e.target;
        const id = target.id;
        const name = target.name;
        const names = name.split("_");
        const ids = id.split("+")
        if (names.length > 1) {
            let obj = {
                "businessFunction": names[0],
                "businessFunctionId": ids[0],
                "capability": names[1],
                "capabilityId": ids[1],
                "action": !target.checked
            };
            editCapability.push(obj);
        }
        else {
            editdata.businessFunction[index].active = !target.checked;
            let obj = {
                "businessFunction": names[0],
                "businessFunctionId": ids[0],
                "action": !target.checked
            };
            editBusinessFunction.push(obj);
        }

        // console.log(editBusinessFunction);
        // console.log(editCapability);
        // this.fetchEdit();
        // this.updateData();

        // target.setAttribute("checked", target.checked)
        // console.log(!target.checked)
        // console.log(index);
        
        // console.log(data)
        this.setState({
            jsonData : editdata
        })
        

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

    saveBtn = async() => {
        body.siteId = this.state.siteid;
        body.siteName = this.state.siteName;
        body.sector = this.state.sector;
        body.clientId = this.state.clientId;

        // for (let i = editBusinessFunction.length-1; i>=0; i--) {
        //     for (let j = 0; j < i; j++) {
        //         delete editBusinessFunction[j];
        //     }
        // }

        // for (let i = editCapability.length-1; i>=0; i--) {
        //     for (let j = 0; j < i; j++) {
        //         delete editCapability[j];
        //     }
        // }

        // let newEditBF = [];
        // let newEditCap = [];

        // for (let i = 0; i < editBusinessFunction.length; i++) {
        //     if (editBusinessFunction[i] !== undefined) {
        //         newEditBF.push(editBusinessFunction[i]);
        //     }
        // }

        // for (let i = 0; i < editCapability.length; i++) {
        //     if (editCapability[i] !== undefined) {
        //         newEditCap.push(editCapability[i]);
        //     }
        // }

        // console.log(newEditBF);
        // console.log(newEditCap);

        body.editBusinessFunction = editBusinessFunction;
        body.editCapability = editCapability;
        // console.log(body);
        this.fetchEdit();
        this.updateData();

        this.assessmentsCard();
        this.props.overviewRefresh();
        await this.setState({
            x:true,
            prevData : this.state.jsonData
        });
        // console.log(this.state.prevData);
        console.log("save")
    }

    cancel = () => {
        // this.assessmentsCard();
        this.props.overviewRefresh();
        this.setState ({
            jsonData: this.state.prevData,
            x: true
        });
        // console.log(this.state.prevData)
        // console.log(this.state.jsonData);
        console.log("cancel")
        // console.log(this.props.data)
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
            <div className="edit-bar">
                <img src={EditIcon} alt="" onClick={this.editToggle} style={{cursor: "pointer"}}></img>
                <p style={{margin: "0", marginLeft: "10px"}}>Edit</p>
            </div>
        )
    }

    applyChanges = () => {
        return (
            <div className="edit-bar">
                <CustomButton labelName="Cancel" style={{backgroundColor: "#161617", boxShadow: "0 0 0 2px inset #616161"}} clickFunction={this.cancel}/>
                <CustomButton labelName="Apply Changes" clickFunction={this.saveBtn}/>
            </div>
        )
    }

    editToggle = () => {
        editBusinessFunction = [];
        editCapability = [];
        if (this.state.x) {
            this.setState({
                x: false,
                jsonData: this.props.data
            });
        }
        else {
            this.setState({
                x: true,
                jsonData: this.props.data
            });
        }
    }

    editActiveCard = (data, index) => {
        return (
            <Card key={index} className={"card"}>                                   
                <Card.Header className={"card-header "+(this.state.arrayIndex===String(index))}>
                
                <Form.Switch name={data.name} id={data.businessFunctionId} label="" onChange={this.onChange(index)}/> 
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
                        {data.Capability!==undefined?data.Capability.map((x,y) => {
                            return (
                                <div className="assess-overview-card" key={y}>
                                    {x.active?
                                        <Form.Switch name={data.name + "_" + x.name} id={data.businessFunctionId + "+" + x.capabilityId} label="" onChange={this.onChange(y)}/>:
                                        <Form.Switch name={data.name + "_" + x.name} id={data.businessFunctionId + "+" + x.capabilityId} label="" onChange={this.onChange(y)} defaultChecked/>
                                    }
                                    <div className="child-group">
                                    {x.active?<span className="area-name">{x.name}</span>:<span className="area-name" style={{opacity: "0.3"}}>{x.name}</span>}
                                    {x.active?(x.status!=="Open"?<FormNavigationButton labelName="Done"/>:<FormNavigationButton labelName="Open" style={{backgroundColor: "#57bb50"}}/>):""}
                                    </div>
                                </div>
                            )
                        }):""}
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
                        <Form.Switch name={data.name} id={data.businessFunctionId} label="" onChange={this.onChange(index)} defaultChecked/>
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
                        {data.Capability!==undefined?data.Capability.map((x,y) => {
                            return (
                                <div className="assess-overview-card" key={y}>
                                    {x.active?<span className="area-name">{x.name}</span>:<span className="area-name" style={{opacity: "0.3"}}>{x.name}</span>}
                                    {x.active?(x.status!=="Open"?<FormNavigationButton labelName={<>&#10003;</>}/>:<FormNavigationButton labelName="Open" style={{backgroundColor: "#57bb50"}}/>):""}
                                </div>
                            )
                        }):""}
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

    componentDidMount = async()=> {
        // let overviewData = await this.fetchOverview();
        await this.setState({
            jsonData:this.props.data,
            clientName: this.props.data.clientName, 
            siteName: this.props.data.siteName,
            sector:this.props.data.sector,
            prevData: this.props.data,
            siteid: this.props.data.siteid,
            clientId: this.props.data.clientId
        })

        editBusinessFunction = [];
        editCapability = [];
        
        console.log(this.props.data)
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