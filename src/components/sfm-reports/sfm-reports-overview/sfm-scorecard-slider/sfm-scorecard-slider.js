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

    // calcAvg() {
    //     var avscore = 0;
    //     var avindAvg = 0; 
    //     var avtarget = 0;
    //     let arr = this.props.data;
    //     arr.forEach((data,index)=>{
    //         avscore += data.score;
    //         avtarget += data.target;
    //         avindAvg += data.indAvg;
    //     });

    //     this.setState({
    //         indAvg: (avindAvg/(arr.length)).toFixed(2),
    //         score: (avscore/(arr.length)).toFixed(2),
    //         target: (avtarget/(arr.length)).toFixed(2),
    //         indAvgPos: this.updatePosition(avindAvg/(arr.length)),
    //         scorePos: this.updatePosition(avscore/(arr.length)),
    //         targetPos: this.updatePosition(avtarget/(arr.length))
    //     });
    // }

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

    componentDidMount() {
        // if (Array.isArray(this.props.data)) {
        //     this.calcAvg();
        // }
        // else {
            this.setState({
                score: Number(this.props.data.score).toFixed(2),
                target: Number(this.props.data.target).toFixed(2),
                indAvg: this.props.data.indAvg.toFixed(2),
                scorePos: this.updatePosition(Number(this.props.data.score), "score"),
                targetPos: this.updatePosition(Number(this.props.data.target), "target"),
                indAvgPos: this.updatePosition(this.props.data.indAvg, "indAvg")
            });
        // }
    }

    render() {
        // if (Array.isArray(this.props.data)) {
        //     this.calcAvg();
        // }
        // else {
        //     this.setState({
        //         score: this.props.data.score,
        //         target: this.props.data.target,
        //         indAvg: (this.props.data.indAvgFrom + this.props.data.indAvgTo)/2,
        //         scorePos: this.updatePosition(this.props.data.score),
        //         targetPos: this.updatePosition(this.props.data.target),
        //         indAvgPos: this.updatePosition((this.props.data.indAvgFrom + this.props.data.indAvgTo)/2)
        //     });
        // }
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
                <span className="ind-avg" style={{marginLeft: this.state.indAvgPos + "%"}}></span>
                <div className="score-box" style={{marginTop: "-18px", marginLeft: this.state.scorePos + "%"}}>
                    <p className="score-text">{this.state.score}</p>
                    <span className="slider-circle" style={{backgroundColor: "#57bb50"}}></span>
                </div>
                <div className="score-box" style={{marginTop: "18px", marginLeft: this.state.targetPos + "%"}}> 
                    <span className="slider-circle" style={{backgroundColor: "#ffffff"}}></span>
                    {/* <span className="small-circle"></span>
                    <div className="plus">
                        <span className="small-line"></span>
                        <span className="small-line"></span>
                    </div> */}
                    <p className="score-text">{this.state.target}</p>
                </div>
                <p className="slider-text">High 7</p>
            </div>
        );
    }
}

export default Slider;