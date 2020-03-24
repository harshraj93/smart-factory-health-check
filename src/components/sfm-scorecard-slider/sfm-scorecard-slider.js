import React from 'react';
import './sfm-scorecard-slider.scss';

class Slider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            indAvg: 0,
            score: 0,
            target: 0
        };
    }
    updatePosition(value) {
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
    }
    render() {
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
                <span className="ind-avg" style={{marginLeft: this.state.indAvg}}></span>
                <span className="slider-circle" style={{backgroundColor: "#57bb50", marginLeft: this.state.score}}></span>
                <div className="slider-circle" style={{backgroundColor: "#ffffff", marginLeft: this.state.target}}>
                    {/* <span className="small-circle"></span>
                    <div className="plus">
                        <span className="small-line"></span>
                        <span className="small-line"></span>
                    </div> */}
                </div>
                <p className="slider-text">High 7</p>
            </div>
        );
    }
}

export default Slider;