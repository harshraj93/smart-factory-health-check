import React from 'react';
import {Switch,Route} from 'react-router-dom';

import Reports from '../components/sfm-reports/sfm-reports-container';
import Analytics from '../components/sfm-analytics/sfm-analytics';
import Assessments from '../components/sfm-assessments/sfm-assessments';
import UtilSum from '../components/sfm-util-sum/sfm-util-sum';
import AddNewClient from '../components//sfm-add-client-main/sfm-add-new-client/sfm-add-client'
import AddSiteDetails from '../components/sfm-add-client-main/sfm-setup-site-details/setup-site-details'
import AddBusinessFunctions from '../components/sfm-add-client-main/sfm-add-business-functions/sfm-add-business'
import QuestionnairePage from '../components/sfm-questionnaire/questionnaire-main';

export default function Routes(props){
    let profile = props.userProfile;
    console.log(props)
    if(profile==="Client"){
        return(
            <Switch>
            <Route exact path="/"> <Reports disableMenu={props.disableMenu} profile={props.userProfile} username={props.username}/> </Route>
            </Switch>
        )
    }
    else{
    return(
    <Switch>
        <Route exact path="/"> <Assessments disableMenu={props.disableMenu}/> </Route>
        <Route exact path="/analytics"> <Analytics/> </Route>
        <Route exact path="/utilization"> <UtilSum/> </Route>
        <Route exact path="/overview"></Route>
        <Route exact path='/reports'><Reports disableMenu={props.disableMenu} /></Route>
        <Route exact path="/addnewclient"><AddNewClient disableMenu={props.disableMenu}/></Route>
        <Route exact path="/addsitedetails"><AddSiteDetails disableMenu={props.disableMenu}/></Route>
        <Route exact path="/addbusinessfunctions"><AddBusinessFunctions disableMenu={props.disableMenu}/></Route>
        <Route exact path="/questionnaire"><QuestionnairePage disableMenu={props.disableMenu} /></Route>
    </Switch>
    );
}


}
