import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import DropDownImg from '../../../../images/icon-small-chevron-down.svg';

class ReportsCardView extends React.Component {
    constructor(props){
        super(props);
        this.state={
            arrayIndex:"0",
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

    render() {
        return(
            <Accordion className="reportview-accordion" defaultActiveKey={0}>
                {/* <Card>
                    <Card.Header className={"card-header"}>
                        <span className="area-name">Operations</span>
                        <Accordion.Toggle as={Button} variant="link">
                                <img src={DropDownImg} alt=""></img>
                        </Accordion.Toggle>
                        <p className="score">3.0</p>
                        <span className="circle" style={{}}></span>
                        <p className="score">3.0</p>
                        <p className="score">4.0</p>
                        <p className="score">5.0</p>
                    </Card.Header>
                    <Accordion.Collapse>
                        <div className="reportview-card">
                            <span className="area-name">Capability</span>
                            <span className="circle" style={{backgroundColor: "#35353b"}}></span>
                            <p className="score">3.0</p>
                            <span className="circle" style={{}}></span>
                            <p className="score">3.0</p>
                            <p className="score">4.0</p>
                            <p className="score">5.0</p>
                        </div>
                    </Accordion.Collapse>
                </Card> */}
            {this.props.data.map((data,index)=>{
                return(
                    <Card key={index} className={"card"}>
                        <Accordion.Toggle as={Card.Header} className={"card-header "+(this.state.arrayIndex===String(index))} variant="link" eventKey={index} value={index} onClick={(e)=>this.handleClick(e)}>
                            <span className="area-name">{data.name}</span>
                            <img className="drop-down" src={DropDownImg} alt=""></img>
                            <p className="score">{data.score}</p>
                            <span className="circle" style={{backgroundColor: this.circleColor((data.target - data.score).toFixed(1))}}></span>
                            <p className="score">{data.target}</p>
                            <p className="score">{data.target - data.score}</p>
                            <p className="score">{data.indAvg}</p>
                        </Accordion.Toggle>
                            <Accordion.Collapse eventKey={index}>
                                <div>
                                    {data.parts.map((x,y) => {
                                        return (
                                            <div className="reportview-card" key={y}>
                                                <span className="area-name">{x.name}</span>
                                                <span className="circle" style={{backgroundColor: "#35353b"}}></span>
                                                <p className="score">{x.score}</p>
                                                <span className="circle" style={{backgroundColor: this.circleColor((x.target - x.score).toFixed(1))}}></span>
                                                <p className="score">{x.target}</p>
                                                <p className="score">{(x.target - x.score).toFixed(1)}</p>
                                                <p className="score">{x.indAvg}</p>
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
}

export default ReportsCardView;