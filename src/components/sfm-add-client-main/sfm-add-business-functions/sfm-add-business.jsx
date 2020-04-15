import React from "react"; 
import {FormNavigationButton} from '../../../assets/sfm-button';
import Header from '../sfm-add-client-main';
import {Link,withRouter} from 'react-router-dom';
import {CustomButton} from '../../../assets/sfm-button';
import CheckBox from '../../../assets/check-box';

let businessNames=[
    "Operations","Maintenance","Quality","Planning & Scheduling","Replenishment & Material Management",
    "Procurement & Supplier Management","Engineering & R&D","Continuous Improvement","Information Technology","Human Resources"
];




function siteHeader(props){
    return(
        <div className="site-header-container">
            <span className="company-name">{props.location.state.siteName}</span>
            <Link to="/"><FormNavigationButton labelName="Complete" /></Link>
        </div>
    )
}





class AddBusinessFunctions extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cardSelectedIndexArray:[]
        }
        this.props.disableMenu(false);
    }

    businessFunctionCards = (props,cardSelected,index,changeState)=>{
        let businessName = props;
        let booleanValue=cardSelected.filter(element=>{
            return element===String(index)
        })
        return(
            <>
            <div className={"function-card "+booleanValue} onClick={changeState} value={index} key={index}>
                <CustomButton labelName={<>&#9432;</>}></CustomButton>
                <div className="card-text">{businessName}</div>
            </div>
           
            </>
        )
    }

    render(){
        return(
        <div className="add-business-function">
        <Header title="Add Business Functions" props={this.props} />
        {siteHeader(this.props)}
        
        
        {this.props.location.state.dataForBusinessFunctions.clientNames.map((element,index)=>{
            
        
            return(
            <>
                
                <div className="site-name" key={index}>
                    {element}
                    {index===0?<CheckBox labelName="Apply Selections across all sites"/>:""}
                </div>
        
                <div className="cards-container">
                        {businessNames.map((element,index)=>
                {
                    return(
                    this.businessFunctionCards(element,this.state.cardSelectedIndexArray,index,this.changeCardState)
                    )
                })}
        
                </div> 
                <div className="bottom-border"></div>
             </>  
            )
            
            
            })}
        </div>
        )
    }
}

export default withRouter(AddBusinessFunctions)