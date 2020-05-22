import React from 'react';
import FlagImg from '../../images/icon-small-flagged-highlited.svg';
export default class NotesComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
        this.time = ""
    }
    parseDateTime = (dateData)=>{

        let date=new Date(dateData);
        this.time = date.toISOString().substring(11, 19)
        return date.toISOString().substring(0, 10);
        
    }

    render(){
        return(
            <div className="notes-container">
                <div className="notes-card-header">
                    {this.props.data.type!==""?<img src={FlagImg} alt="" style={{marginTop: "2.5px", marginRight: "10px"}}></img>:""}
                    <div className="header-block">
                        <div className="name">{this.props.data.resourceName}</div>
                        <div className="date-time"><span className="time">{this.time}</span><span className="date">{this.parseDateTime(this.props.data.timestamp)}</span></div>
                    </div>
                </div>
                <div className="text-area-notes"><div id="inner-html" dangerouslySetInnerHTML={{__html: this.props.data.notes}} /></div>
            </div>
        )
    }
}