import React from "react"; 
import {FormNavigationButton} from '../../../assets/sfm-button';
import Header from '../sfm-add-client-main';
import {Link,withRouter} from 'react-router-dom';
import {CustomButton} from '../../../assets/sfm-button';
import {createCardSelectedObj} from '../../../util/addbusinessfunctions'
import addclientapi from "../../../api/addclient/addclient";
import {apiGetHeader,apiPostHeader} from '../../../api/main/mainapistorage';


function siteHeader(props,enableButton,handleFormSubmission){
    return(
        <div className="site-header-container">
            <span className="company-name">{props.location.state.siteName}</span>
           <Link to = "/"><FormNavigationButton labelName="Complete" buttonStatus={enableButton} type="submit" onClick={handleFormSubmission}/></Link>
        </div>
    )
}


let indexObjectArray=[];
class AddBusinessFunctions extends React.Component{
    constructor(props){
        super(props);
        this.props.disableMenu(false);
        let indexObjArray=[];
        indexObjectArray = createCardSelectedObj(this.props.location.state.dataForBusinessFunctions.clientNames,indexObjArray)
        this.state={
            cardSelectedIndexArray:[...indexObjectArray],
            checked:"",
            enableButton:"false",
            businessNames:[]
        }
        
    }


    highlightCard = async(e)=>{
        let id = e.currentTarget.getAttribute("value");
        let siteName = e.currentTarget.getAttribute("sitename");
        let tempState = this.state.cardSelectedIndexArray;
        let cnt=0;
        let indexArrayObj = tempState.filter(element=>{
            return element.businessName===siteName
        })
        let tempArray = indexArrayObj[0].indexArray
        if(tempArray.includes(id)){
            let index = tempArray.indexOf(id);
            tempArray.splice(index,1);
        }
        else{
            tempArray.push(id);
        }
        
        tempState.forEach(element=>{
            if(element.indexArray.length>0){
                cnt++;
            }
        })
        if(cnt===tempState.length){
            this.setState({
                enableButton:"true"
            })
        }
        else{
            this.setState({
                enableButton:"false"
            }) 
        }
        await this.setState({ 
            cardSelectedIndexArray:[...tempState],
        })
    }


    businessFunctionCards = (businessName,siteName,index)=>{
        let businessObject = this.state.cardSelectedIndexArray.filter(element=>{
            return element.businessName===siteName
        })
        return(
            <>
            <div className={"function-card "+(businessObject[0].indexArray.includes(String(index))?"true":"false")} onClick={this.highlightCard} sitename={siteName} key={index} value={index} >
                <CustomButton labelName={<>&#9432;</>}></CustomButton>
                <div className="card-text" >{businessName}</div>
            </div>
           
            </>
        )
    }


    handleCheckBox = (e,siteName)=>{
        let tempArray = this.state.cardSelectedIndexArray; 
        let businessNameObjArray = tempArray.filter(element=>{
            return element.businessName===siteName;
        });
        let cnt=0;
        tempArray.forEach(element=>{
            element.indexArray = businessNameObjArray[0].indexArray
        })
        if(!this.state.checked){
        this.setState({
            cardSelectedIndexArray:[...tempArray],
            checked:!this.state.checked
        })
        }
        else{
            let businessArray = tempArray.filter(element=>{
                return element.businessName!==siteName
            })
            businessArray[0].indexArray=[];
            this.setState({
                checked:false,
                
            })
        }
       
        tempArray.forEach(element=>{
            if(element.indexArray.length>0){
                cnt++;
            }
        })
        if(cnt===tempArray.length){
            this.setState({
                enableButton:"true"
            })
        }
        else{
            this.setState({
                enableButton:"false"
            }) 
        }
        
    }




    handleFormSubmission = ()=>{
        let siteDetailsJSON = this.props.location.state.sitedetailsJSON;
        let clientNames = this.props.location.state.dataForBusinessFunctions.clientNames;
        for(let i = 0; i<siteDetailsJSON.sites.length; i++){
            console.log(siteDetailsJSON.sites[i].siteDetails.sitename,clientNames[i])
            if(siteDetailsJSON.sites[i].siteDetails.sitename===clientNames[i]){
                let functionsArray = [];
                let clientName = this.state.cardSelectedIndexArray.filter(element=>{
                    return element.businessName === clientNames[i];
                })
                clientName[0].indexArray.forEach(index=>{
                    functionsArray.push(this.state.businessNames[index]);
                    return functionsArray;
                })
                siteDetailsJSON.sites[i].businessFunctions=functionsArray;
                functionsArray = [];
            }
            
        }
        apiPostHeader.body = JSON.stringify(siteDetailsJSON);
        console.log(apiPostHeader,addclientapi.addSite)
        fetch(addclientapi.addSite,apiPostHeader)
            .then(resp=>resp.json())
            .then(resp=>console.log(resp))
            .catch(error=>console.log(error))
    }


    componentDidMount = async()=>{
       let resp =  await fetch(addclientapi.getBusinessFunctions,apiGetHeader)
       let response =   await resp.json()
       await this.setState({businessNames:response.resultantJSON}) 
    }


    render(){
       
        return(
        <div className="add-business-function">
        <Header title="Add Business Functions" props={this.props} />
        {siteHeader(this.props,this.state.enableButton,this.handleFormSubmission)}
            {/* <form id="add-business-functions" onSubmit={this.handleFormSubmission}> */}
        {this.props.location.state.dataForBusinessFunctions.clientNames.map((element,index)=>{
         return(
            <>
                
                <div className="site-name" key={index}>
                    {element}
                    {index===0?
                    <>
                        <span className="check-box" onChange={(e)=>this.handleCheckBox(e,element)}>
                             <input type="checkbox" checked={this.state.checked} />
                            <span></span>
                            <label>Apply Selections across all sites</label>
                        </span>
                    </>:""}
                </div>
        
                <div className="cards-container">
                        {this.state.businessNames.map((businessNames,index)=>
                {   
                    return(
                        <>
                {this.businessFunctionCards(businessNames,element,index)}
                    </>
                    )
                })}
        
                </div> 
                <div className="bottom-border"></div>
             </>  
            )
            
            
            })}
           <Link to="/">
           <FormNavigationButton labelName="Complete" buttonStatus={this.state.enableButton} onClick={this.handleFormSubmission}/>
           </Link>
            {/* </form> */}
        </div>
        )
    }
}

export default withRouter(AddBusinessFunctions)