import React from 'react';
import './sfm-hamburger-nav.scss';
import assessmentsIcon from '../../img/icon-small-assessments.svg';
import analyticsIcon from '../../img/icon-small-analytics.svg';
import utilSumIcon from '../../img/icon-small-utlization-summary.svg';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import Analytics from '../sfm-analytics/sfm-analytics';
import Assessments from '../sfm-assessments/sfm-assessments';
import UtilSum from '../sfm-util-sum/sfm-util-sum';

class HamburgerNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            x: 0,
            divId: ""
        };

        this.navbar = this.navbar.bind(this);
        localStorage.setItem("pageName", "assessments");
    }

    navbar() {
        if (this.state.x === 0) {
            document.querySelector(".sidenav").style.width = "5.372vw";
            document.querySelector(".main").style.width = "94.629vw";
            this.setState({
                x: 1
            });
        }
        else {
            document.querySelector(".sidenav").style.width = "22.852vw";
            document.querySelector(".main").style.width = "77.148vw";
            this.setState({
                x: 0
            });
        }
    }

    darken(value) {
        if (this.state.divId !== "") {
            document.getElementById(this.state.divId).style.background = "none";
        }
        else {
            document.getElementById("assessments").style.background = "none";
        }
        document.getElementById(value).style.background = "#161617";
        this.setState({
            divId: value
        }); 
    }

    render() {
        return (
            <Router>
                <div className="sidenav">
                    <div className="top-part">
                    <div className="sidebar-option-top">
                        <div className="hamburger" onClick={this.navbar}>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                        <div className="top-text">SMART FACTORY</div>
                    </div>
                    <Link onClick={() => this.darken("assessments")} className="sidebar-option" id="assessments" to="/assessments" style={{background: "#161617"}}>
                        <img src={assessmentsIcon} className="sidebar-icon" alt=""/>
                        <div className="sidebar-text">Assessments</div>
                    </Link>
                    <Link onClick={() => this.darken("analytics")} className="sidebar-option" id="analytics" to="/analytics">
                        <img src={analyticsIcon} className="sidebar-icon" alt=""/>
                        <div className="sidebar-text">Analytics</div>
                    </Link>
                    <Link onClick={() => this.darken("utilization")} className="sidebar-option" id="utilization" to="/utilization">
                        <img src={utilSumIcon} className="sidebar-icon" alt=""/>
                        <div className="sidebar-text">Utilization Summary</div>
                    </Link>
                    <Link onClick={() => this.darken("overview")} className="sidebar-option" id="overview" to="/overview">
                        <span className="circle"></span>
                        <div className="sidebar-text">Frame Overview</div>
                    </Link>
                    </div>
                    <div className="logout"></div>
                </div>
                <div className="main">
                    <Switch>
                        <Route exact path="/"> <Assessments/> </Route>
                        <Route exact path="/assessments"> <Assessments/> </Route>
                        <Route exact path="/analytics"> <Analytics/> </Route>
                        <Route exact path="/utilization"> <UtilSum/> </Route>
                        <Route exact path="/overview"></Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default HamburgerNav;