import React from 'react';
import {Switch,Route} from 'react-router-dom';

import Reports from '../components/sfm-reports/sfm-reports-container';
import Analytics from '../components/sfm-analytics/sfm-analytics';
import Assessments from '../components/sfm-assessments/sfm-assessments';
import UtilSum from '../components/sfm-util-sum/sfm-util-sum';
export default function Routes(props){
    console.log(props.disableMenu);
    return(
    <Switch>
        <Route exact path="/"> <Assessments disableMenu={props.disableMenu}/> </Route>
        <Route exact path="/analytics"> <Analytics/> </Route>
        <Route exact path="/utilization"> <UtilSum/> </Route>
        <Route exact path="/overview"></Route>
        <Route path='/reports'><Reports /></Route>

    </Switch>
    );


}
