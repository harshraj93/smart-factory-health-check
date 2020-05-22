import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import DropDownImg from '../../../../images/icon-small-chevron-down.svg';
import './sfm-reports-reportview.scss';

class ReportsCardView extends React.Component {
    constructor(props){
        super(props);
        this.state={
            arrayIndex:"0",
            arrayCapIndex: "0"
        }
    }

    circleColor(value) {
        if (value>=0 && value<=1) {
            return "#57bb50";
        }
        else if (value>1 && value <=2) {
            return "#ef7c03";
        }
        else {
            return "#c02424";
        }
    }

    handleClick = (e)=>{
        let value = e.currentTarget.getAttribute("value");
        let index = value?value:0
        this.setState({
            arrayIndex:this.state.arrayIndex===String(index)?"":String(index),
        });
    }

    handleCapClick = (e)=>{
        let value = e.currentTarget.getAttribute("value");
        let index = value?value:0
        this.setState({
            arrayCapIndex:this.state.arrayCapIndex===String(index)?"":String(index),
        });
    }

    clientLevel = () => {
        return(
            this.props.data.reportsData.map((data,index)=>{
                return(
                    <div style = {{position: "relative"}}>
                    <Accordion className="industry-reportview-accordion" defaultActiveKey={0}>
                        <Card key={index} className={"card"}>
                            <Accordion.Toggle as={Card.Header} className={"card-header "+(this.state.arrayIndex===String(index))} variant="link" eventKey={index} value={index} onClick={(e)=>this.handleClick(e)}>
                                <span className="area-name">{data.name}</span>
                                <img className="drop-down" src={DropDownImg} alt=""></img>
                                {(data.score)!=="NaN" && Number(data.score) !== 0?<p className="score">{Number(data.score).toFixed(1)}</p>:<p className="score">-</p>}
                                <span className="circle" style={{backgroundColor: this.circleColor((data.target - data.score).toFixed(1))}}></span>
                                {(data.target)!=="NaN" && Number(data.target) !== 0?<p className="score">{Number(data.target).toFixed(1)}</p>:<p className="score">-</p>}
                                {JSON.stringify(data.target - data.score)!=="null"?<p className="score">{(data.target - data.score).toFixed(1)}</p>:<p className="score">-</p>}
                                {(data.indAvg)!=="NaN" && Number(data.indAvg) !== 0?<p className="score">{Number(data.indAvg).toFixed(1)}</p>:<p className="score">-</p>}
                            </Accordion.Toggle>
                                <Accordion.Collapse eventKey={index}>
                                    <div>
                                        {data.sites.map((x,y) => {
                                            return (
                                                <div>
                                                    <div className="reportview-card" key={y}>
                                                        <span className="area-name">{x.name}</span>
                                                        <span className="circle" style={{backgroundColor: "#232325"}}></span>
                                                        {(x.score)!=="NaN" && Number(x.score) !== 0?<p className="score">{Number(x.score).toFixed(1)}</p>:<p className="score">-</p>}
                                                        <span className="circle" style={{backgroundColor: this.circleColor((x.target - x.score).toFixed(1))}}></span>
                                                        {(x.target)!=="NaN" && Number(x.target) !== 0?<p className="score">{Number(x.target).toFixed(1)}</p>:<p className="score">-</p>}
                                                        {JSON.stringify(x.target - x.score)!=="null"?<p className="score">{(x.target - x.score).toFixed(1)}</p>:<p className="score">-</p>}
                                                        {(x.indAvg)!=="NaN" && Number(x.indAvg) !== 0?<p className="score">{Number(x.indAvg).toFixed(1)}</p>:<p className="score">-</p>}
                                                    </div>
                                                    {y<data.sites.length-1?<span className="repCard-bottom-line"></span>:""}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    <Accordion className="cap-report-accordion">
                    <div>
                    {data.parts.map((x, y) => {
                        return (
                            <div>
                            <Card key={y} className={"card"}>
                                <Accordion.Toggle as={Card.Header} className={"cap-report-card-header "+(this.state.arrayCapIndex===String(index*10+y))} variant="link" eventKey={y} value={index*10+y} onClick={(e)=>this.handleCapClick(e)}>
                                    <span className="area-name">{x.name}</span>
                                    <img className="drop-down" src={DropDownImg} alt=""></img>
                                    {(x.score)!=="NaN" && Number(x.score) !== 0?<p className="score">{Number(x.score).toFixed(1)}</p>:<p className="score">-</p>}
                                    <span className="circle" style={{backgroundColor: this.circleColor((x.target - x.score).toFixed(1))}}></span>
                                    {(x.target)!=="NaN" && Number(x.target) !== 0?<p className="score">{Number(x.target).toFixed(1)}</p>:<p className="score">-</p>}
                                    {JSON.stringify(x.target - x.score)!=="null"?<p className="score">{(x.target - x.score).toFixed(1)}</p>:<p className="score">-</p>}
                                    {(x.indAvg)!=="NaN" && Number(x.indAvg) !== 0?<p className="score">{Number(x.indAvg).toFixed(1)}</p>:<p className="score">-</p>}
                                </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={y}>
                                        <div>
                                            {x.sites.map((i,j) => {
                                                return (
                                                    <div>
                                                        <div className="reportview-card" key={j}>
                                                            <span className="area-name">{i.name}</span>
                                                            <span className="circle" style={{backgroundColor: "#35353b"}}></span>
                                                            {(i.score)!=="NaN" && Number(i.score) !== 0?<p className="score">{Number(i.score).toFixed(1)}</p>:<p className="score">-</p>}
                                                            <span className="circle" style={{backgroundColor: this.circleColor((i.target - i.score).toFixed(1))}}></span>
                                                            {(i.target)!=="NaN" && Number(i.target) !== 0?<p className="score">{Number(i.target).toFixed(1)}</p>:<p className="score">-</p>}
                                                            {JSON.stringify(i.target - i.score)!=="null"?<p className="score">{(i.target - i.score).toFixed(1)}</p>:<p className="score">-</p>}
                                                            {(x.indAvg)!=="NaN" && Number(i.indAvg) !== 0?<p className="score">{Number(i.indAvg).toFixed(1)}</p>:<p className="score">-</p>}
                                                        </div>
                                                        {j<x.sites.length-1?<span className="repCard-bottom-line"></span>:""}
                                                    </div>
                                                )
                                            })}
                                            <span className="vertical-line"></span>
                                        </div>
                                    </Accordion.Collapse>
                            </Card>
                            {/* y<data.parts.length-1?<span className="repCard-bottom-line"></span>:"" */}
                            </div>
                        )
                    })}
                    <span className="vertical-line"></span>
                    </div>
                    </Accordion>
                    
                    </div>
                )
            })
        )
    }

    siteLevel = () => {
        return(
            <Accordion className="reportview-accordion" defaultActiveKey={0}>
            {this.props.data.reportsData.map((data,index)=>{
                return(
                    <Card key={index} className={"card"}>
                        <Accordion.Toggle as={Card.Header} className={"card-header "+(this.state.arrayIndex===String(index))} variant="link" eventKey={index} value={index} onClick={(e)=>this.handleClick(e)}>
                            <span className="area-name">{data.name}</span>
                            <img className="drop-down" src={DropDownImg} alt=""></img>
                            {(data.score)!=="NaN" && Number(data.score) !== 0?<p className="score">{Number(data.score).toFixed(1)}</p>:<p className="score">-</p>}
                            <span className="circle" style={{backgroundColor: this.circleColor((data.target - data.score).toFixed(1))}}></span>
                            {(data.target)!=="NaN" && Number(data.target) !== 0?<p className="score">{Number(data.target).toFixed(1)}</p>:<p className="score">-</p>}
                            {JSON.stringify(data.target - data.score)!=="null"?<p className="score">{(data.target - data.score).toFixed(1)}</p>:<p className="score">-</p>}
                            {(data.indAvg)!=="NaN" && Number(data.indAvg) !== 0?<p className="score">{Number(data.indAvg).toFixed(1)}</p>:<p className="score">-</p>}
                        </Accordion.Toggle>
                            <Accordion.Collapse eventKey={index}>
                                <div style={{position: "relative"}}>
                                    {data.parts.map((x,y) => {
                                        return (
                                            <div>
                                                <div className="reportview-card" key={y}>
                                                    <span className="area-name">{x.name}</span>
                                                    <span className="circle" style={{backgroundColor: "#35353b"}}></span>
                                                    {(x.score)!=="NaN" && Number(x.score) !== 0?<p className="score">{Number(x.score).toFixed(1)}</p>:<p className="score">-</p>}
                                                    <span className="circle" style={{backgroundColor: this.circleColor((x.target - x.score).toFixed(1))}}></span>
                                                    {(x.target)!=="NaN" && Number(x.target) !== 0?<p className="score">{Number(x.target).toFixed(1)}</p>:<p className="score">-</p>}
                                                    {JSON.stringify(x.target - x.score)!=="null"?<p className="score">{(x.target - x.score).toFixed(1)}</p>:<p className="score">-</p>}
                                                    {(x.indAvg)!=="NaN" && Number(x.indAvg) !== 0?<p className="score">{Number(x.indAvg).toFixed(1)}</p>:<p className="score">-</p>}
                                                </div>
                                                {y<data.parts.length-1?<span className="repCard-bottom-line"></span>:""}
                                            </div>
                                        )
                                    })}
                                    <span className="vertical-line"></span>
                                </div>
                            </Accordion.Collapse>
                    </Card>
                )
            })} 
            </Accordion>
        )
    }

    render() {
        return(
            this.props.data.sites === undefined?this.siteLevel():this.clientLevel()
        )
    }
}

export default ReportsCardView;