import React from 'react';

class Slider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            indAvg: 0,
            indAvgPos: 0,
            score: 0,
            scorePos: 0,
            target: 0,
            targetPos: 0
        };
    }

    updatePosition(value, str) {
        // Function to update the position value for the industry avg bar, score and target circles
        var x = 0;
        if (value >=1 && value < 2) {
            x = ((value - 2) * 60) - 142;
        }
        else if (value >= 2 && value < 3) {
            x = ((value - 3) * 71) - 71;
        }
        else if (value >= 3 && value < 4) {
            x = ((value - 4) * 71);
        }
        else if (value >= 4 && value < 5) {
            x = ((value - 4) * 71);
        }
        else if (value >= 5 && value < 6) {
            x = ((value - 5) * 71) + 71;
        }
        else if (value >= 6 && value <= 7) {
            x = ((value - 6) * 60) + 142;
        }

        if (str === "indAvg"){
            if (value >= 1 && value <= 2) {
                x = -142;
            }
            else if (value >= 6 && value <= 7) {
                x = 142;
            }
        }

        return ((x/532.469)*100).toFixed(2);
    }

    clientLevel() {
        return (
            <div className="slider">
                <p className="slider-text">Low 1</p>
                <span className="slider-line"></span>
                <div className="stops">
                    <span className="stop"></span>
                    <span className="stop"></span>
                    <span className="stop"></span>
                    <span className="stop"></span>
                    <span className="stop"></span>
                </div>
                {Number(this.props.data.indAvg)>0?<span className="ind-avg" style={{marginLeft: this.updatePosition(Number(this.props.data.indAvg).toFixed(1), "indAvg") + "%"}}></span>:""}
                {this.props.data.sites.map((data, index) => {
                    return (
                        Number(data.score)>0?
                        <div className="score-box" style={{marginTop: "-18px", marginLeft: this.updatePosition(Number(data.score).toFixed(1), "score") + "%"}}>
                            <p className="score-text">{Number(data.score).toFixed(1)}</p>
                            <div className="tooltip-circle">
                                <span className="slider-circle" style={{backgroundColor: "#" + this.props.colors[index]}}></span>
                                <div class="tooltiptext">
                                    <p>{Number(data.score).toFixed(1) + "  " + data.name}</p>
                                </div>
                            </div>
                        </div>
                        :""
                    )
                })}
                
                {Number(this.props.data.target) > 0?<div className="score-box" style={{marginTop: "18px", marginLeft: this.updatePosition(Number(this.props.data.target).toFixed(1), "target") + "%"}}> 
                    <div className="tooltip-circle">
                        <span className="slider-circle" style={{backgroundColor: "#ffffff"}}></span>
                        <div class="tooltiptext" style={{bottom: "100%", marginLeft: "-55px"}}>
                            {this.props.data.sites.map((data, index) => {
                                return (
                                    <p>{Number(data.target).toFixed(1) + "  " + data.name}</p>
                                )
                            })}
                        </div>
                    </div>
                    <p className="score-text">{Number(this.props.data.target).toFixed(1)}</p>
                </div>:""}
                <p className="slider-text">High 7</p>
            </div>
        )
    }

    siteLevel(){
        return (
            <div className="slider">
                <p className="slider-text">Low 1</p>
                <span className="slider-line"></span>
                <div className="stops">
                    <span className="stop"></span>
                    <span className="stop"></span>
                    <span className="stop"></span>
                    <span className="stop"></span>
                    <span className="stop"></span>
                </div>
                {this.state.indAvg>0?<span className="ind-avg" style={{marginLeft: this.state.indAvgPos + "%"}}></span>:""}
                {this.state.score>0?<div className="score-box" style={{marginTop: "-18px", marginLeft: this.state.scorePos + "%"}}>
                    <p className="score-text">{this.state.score}</p>
                    <span className="slider-circle" style={{backgroundColor: "#57bb50"}}></span>
                </div>:""}
                {this.state.target>0?<div className="score-box" style={{marginTop: "18px", marginLeft: this.state.targetPos + "%"}}> 
                    <span className="slider-circle" style={{backgroundColor: "#ffffff"}}></span>
                    <p className="score-text">{this.state.target}</p>
                </div>:""}
                <p className="slider-text">High 7</p>
            </div>
        )
    }

    componentDidMount() {
        if (this.props.data.sites !== undefined) {
            // console.log("sites");
            // console.log(this.props.colors);
        }
        else {
            this.setState({
                score: this.props.data.score!=="NaN" && this.props.data.score!==null?Number(this.props.data.score).toFixed(1):0,
                target: this.props.data.target!=="NaN" && this.props.data.target!==null?Number(this.props.data.target).toFixed(1):0,
                indAvg: this.props.data.indAvg!=="NaN" && this.props.data.indAvg!==null?Number(this.props.data.indAvg).toFixed(1):0,
                scorePos: this.props.data.score!=="NaN" && this.props.data.score!==null?this.updatePosition(Number(this.props.data.score), "score"):0,
                targetPos: this.props.data.target!=="NaN" && this.props.data.target!==null?this.updatePosition(Number(this.props.data.target), "target"):0,
                indAvgPos: this.props.data.indAvg!=="NaN" && this.props.data.indAvg!==null?this.updatePosition(Number(this.props.data.indAvg), "indAvg"):0
            });
        }
    }

    render() {
        // let score = this.state.score.toFixed(1);
        return ( 
            this.props.data.sites !== undefined?this.clientLevel():this.siteLevel()
        );
    }
}

export default Slider;