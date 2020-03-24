import React from 'react';
import './App.scss';
import assessmentsIcon from './img/icon-small-assessments.svg';
import analyticsIcon from './img/icon-small-analytics.svg';
import utilSumIcon from './img/icon-small-utlization-summary.svg';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
import Analytics from './components/sfm-analytics/sfm-analytics';
import Assessments from './components/sfm-assessments/sfm-assessments';
import UtilSum from './components/sfm-util-sum/sfm-util-sum';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  var x = 0;
  function navbar() {
    if (x%2 === 0) {
      document.querySelector(".sidenav").style.width = "5.372vw";
      document.querySelector(".main").style.width = "94.629vw";
      x++;
    }
    else {
      document.querySelector(".sidenav").style.width = "22.852vw";
      x--;
      document.querySelector(".main").style.width = "77.148vw";
    }
    
  }

  // function darken(value) {
  //   document.getElementById(value).style.background = "#161617";
  // }
  return (
    <Router>
    <div className="App">
      <div className="sidenav">
        <div className="top-part">
          <div className="sidebar-option-top">
            <div className="hamburger" onClick={navbar}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            <div className="top-text">SMART FACTORY</div>
          </div>
          <Link className="sidebar-option" id="assessments" to="/assessments">
            <img src={assessmentsIcon} className="sidebar-icon" alt=""/>
            <div className="sidebar-text">Assessments</div>
          </Link>
          <Link className="sidebar-option" id="analytics" to="/analytics">
            <img src={analyticsIcon} className="sidebar-icon" alt=""/>
            <div className="sidebar-text">Analytics</div>
          </Link>
          <Link className="sidebar-option" id="utilization" to="/utilization">
            <img src={utilSumIcon} className="sidebar-icon" alt=""/>
            <div className="sidebar-text">Utilization Summary</div>
          </Link>
          <Link className="sidebar-option" id="overview" to="/overview">
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
    </div>
    </Router>
  );
}

export default App;
