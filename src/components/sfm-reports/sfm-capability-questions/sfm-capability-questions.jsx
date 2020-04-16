import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './sfm-capability-questions.scss';

class CapabilityQuestions extends React.Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

    render() {
        return (
            <div className="questionnaire">
                <div className="question-header">
                    <div className="biz-func">
                        <p>Business Function</p>
                    </div>
                    <div className="percent-complete">
                        <ProgressBar now={33} variant={"success"}/>
                        <p style={{margin: "0", fontSize: "14px", float: "right", marginRight: "5px"}}>33% Complete</p>
                    </div>
                    <div className="small-capabilities">
                        <p>Capabilities</p>
                    </div>
                    <div className="combined">
                        <div className="sub-cap">
                            <h4>Sub Capabilities</h4>
                            <p>(2 of 7)</p>
                        </div>
                        <div className="oee-details">
                            <div className="impact-area">
                                <p>OEE Impact Area:</p>
                                <p>All 3</p>
                            </div>
                            <div className="impact-area">
                                <p>Degree of OEE Impact:</p>
                                <p>Uncertain</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="question-body"></div>
            </div>
        )
    }
}