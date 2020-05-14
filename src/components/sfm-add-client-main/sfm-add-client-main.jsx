import React from 'react';
import {CustomButton} from '../../assets/sfm-button';
import leftIcon from '../../images/icon-small-chevron-left.svg';


export default function Header(props){
    return(
        <div className="add-new-client-title">
                <CustomButton imgSrc={leftIcon} clickFunction={(e)=>backNavigation(e,props)}/>
                <span className="title-text">
                    {props.title}
                </span>
        </div>
    )
}


function backNavigation(e,props){
    let locationpath = props.props.location.pathname;
    let history = props.props.history;
    if(locationpath==="/addnewclient"){
        return history.push({
            pathname:"/"
        })
    }
    else if(locationpath==="/addsitedetails"){
        
        
        if(props.props.location.state.page){
            return history.push({
                pathname:"/addnewsite",
            })
        }
        else{
            let addClientData = localStorage.getItem("addnewclient")
        return history.push({
            pathname:"/addnewclient",
            data:JSON.parse(addClientData)
        })
    }
    }
    else if(locationpath==="/addbusinessfunctions"){
        let addSiteData = JSON.parse(localStorage.getItem("addsitedata"))
        let siteDetails = JSON.parse(localStorage.getItem("sitedetailsstate"))
        return history.push({
            pathname:"/addsitedetails",
            state:{
               data: addSiteData,
               sites: siteDetails.state.sites,
               clientName: siteDetails.state.clientName,
               industry: siteDetails.state.industry,
               industryList: siteDetails.state.industryList,
               clientid: siteDetails.state.clientid,
               page: siteDetails.state.page
            }
        })
    }
}