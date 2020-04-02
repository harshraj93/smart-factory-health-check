import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import DropDownImg from '../../../../images/icon-small-chevron-down.svg';
import EditIcon from '../../../../images/icon-small-edit.svg';
import Slider from '../sfm-scorecard-slider/sfm-scorecard-slider';


function reportScoreCard (data){

    return (
        <> 
            <div className="listview-card">
                <span className="area-name">{data.bizName}</span>
                <Slider data={data}/>
                <p style={{margin: "0", fontSize: "14px"}}>Breakdown</p>
            </div>
        </>
    );
}

class ReportsListView extends React.Component {
    constructor(props){
        super(props);
        this.state={
            arrayIndex:"0",
        }
    }

    handleClick = (e)=>{
        let index = e.currentTarget.value?e.currentTarget.value:0
        this.setState({
            arrayIndex:this.state.arrayIndex===String(index)?"":String(index),
        });
    }

    render(){
        return(
            <Accordion className="listview-accordion" defaultActiveKey={0}>
            {this.props.data.map((data,index)=>{
                return(
                        <Card key={index} className={"card"}>                                   
                            <Accordion.Toggle as={Card.Header} className={"card-header "+(this.state.arrayIndex===String(index))} variant="link" eventKey={index} value={index} onClick={(e)=>this.handleClick(e)}>
                                {reportScoreCard(data)}
                                <img className="drop-down" src={DropDownImg} alt=""></img>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={index}>
                                <div>
                                    <div className="tr-com-box">
                                        <div className="edit">
                                            <img src={EditIcon} alt=""></img>
                                        </div>
                                        <div style={{display: "flex"}}>
                                            <div className="tr-box">
                                                <span className="tr-heading">Key Themes</span>
                                                <p className="tr-text">{data.keyThemes}</p>
                                            </div>
                                            <div className="tr-box">
                                                <span className="tr-heading">Recommendations</span>
                                                <p className="tr-text">{data.recs}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {data.parts.map((x,y) => {
                                        return (
                                            <div className="listview-card" key={y}>
                                                <span className="area-name">{x.c}</span>
                                                <Slider data={x}/>
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

export default ReportsListView;