import React from 'react';
import FlagImg from '../../images/icon-small-flagged-outline.svg';
export default class NotesComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }


    render(){
        return(
            <div className="notes-container">
            {/* {this.props.data.flag!==null?<img src={FlagImg} alt="" style={{marginTop: "2.5px", marginRight: "10px"}}></img>:""} */}
                <div className="name">Bryan Takayama</div>
                <div className="date-time"><span className="time">11:40</span><span className="date">02/01/2020</span></div>
                <div className="text-area-notes" onClick={this.props.textAreaClick}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer velit metus, scelerisque sit amet placerat nec, commodo sit amet velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin mattis commodo magna. </div>
            </div>
        )
    }
}