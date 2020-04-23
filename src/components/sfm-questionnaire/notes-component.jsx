import React from 'react';
import FlagImg from '../../images/icon-small-flagged-outline.svg';
export default class NotesComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    parseDateTime = (dateData)=>{

        let date=new Date(dateData);
        console.log(date)
        return date.toISOString().substring(0, 10);
        
    }

    render(){
        console.log(this.props.data)
        return(
            <div className="notes-container">
            {/* {this.props.data.flag!==null?<img src={FlagImg} alt="" style={{marginTop: "2.5px", marginRight: "10px"}}></img>:""} */}
                <div className="name">{this.props.data.resourceName}</div>
                <div className="date-time"><span className="time">11:40</span><span className="date">{this.parseDateTime(this.props.data.timestamp)}</span></div>
                <div className="text-area-notes" onClick={this.props.textAreaClick}>{this.props.data.notes}</div>
            </div>
        )
    }
}