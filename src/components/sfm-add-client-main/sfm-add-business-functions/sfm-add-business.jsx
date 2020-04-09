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

let siteNames=[
    "Greenville","Muscatine","Wilton","Durant"
]


function siteHeader(props){
    return(
        <div className="site-header-container">
            <span className="company-name">Rotiva</span>
            <Link to="/"><FormNavigationButton labelName="Complete" /></Link>
        </div>
    )
}

function businessFunctionCards(props,cardSelected,index,changeState){
    let businessName = props;
    console.log(cardSelected,index);
    let booleanValue=cardSelected.filter(element=>{
        return element===String(index)
    })
    return(
        <>
        <div className={"function-card "+booleanValue} onClick={changeState} value={index}>
            <CustomButton labelName={<>&#9432;</>}></CustomButton>
            <div className="card-text">{businessName}</div>
        </div>
       
        </>
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


    changeCardState = (e)=>{
        console.log(e.currentTarget.getAttribute("value"))
        let pushValue = e.currentTarget.getAttribute("value")
        let updatedArray = this.state.cardSelectedIndexArray.push(pushValue);
        // this.setState({
        //     cardSelectedIndexArray:updatedArray
        // })
        
    }

    render(){
        return(
        <div className="add-business-function">
        <Header title="Add Business Functions" props={this.props} />
        {siteHeader(this.props)}
        
        <div className="site-name">{siteNames[0]}
            <CheckBox labelName="Apply Selections across all sites"/>
        </div>
        <div className="cards-container">
        {businessNames.map((element,index)=>
        {
            return(
        businessFunctionCards(element,this.state.cardSelectedIndexArray,index,this.changeCardState)
        )
        })}
        
        </div>
        {siteNames.map((element,index)=>{
            
        if(index!==0){
            return(
            <>
                <div className="bottom-border"></div>
                <div className="site-name">
                    {element}
                </div>
        
                <div className="cards-container">
                        {businessNames.map((element,index)=>
                {
                    return(
                    businessFunctionCards(element,this.state.cardSelectedIndexArray,index,this.changeCardState)
                    )
                })}
        
                </div> 
             </>  
            )
            }
            
            })}
        </div>
        )
    }
}

export default withRouter(AddBusinessFunctions)