import React from 'react';
import './sfm-scorecard-slider.scss';

class Slider extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="slider">
                <span className="bar"></span>
                <span className="ind-avg"></span>
                <span className="score"></span>
                <span className="target"></span>
            </div>
        );
    }
}

export default Slider;