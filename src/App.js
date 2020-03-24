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
import HamburgerNav from './components/sfm-hamburger-nav/sfm-hamburger-nav';

function App() {
  return (
    <div className="App">
      <HamburgerNav/>
    </div>
  );
}

export default App;
