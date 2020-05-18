import React from 'react';
import {CustomButton,FormNavigationButton} from '../../assets/sfm-button';
import leftIcon from '../../images/icon-small-chevron-left.svg';
import {withRouter} from 'react-router-dom';
import CustomCheckBox from '../../assets/check-box';
import LabelledInputField from '../../assets/input-field';
import DropDownMenu from '../../assets/drop-down-input-box';
import addtoclientapi from '../../api/addtoexistingclient/addtoclient';
import {apiGetHeader,apiPostHeader} from '../../api/main/mainapistorage';
let sectors = ["Consumer Products","Automotive"]


function Header(props){
    if(props.title){localStorage.setItem("title",props.title)}
    return(
        <div className="add-new-client-title">
                <CustomButton imgSrc={leftIcon} clickFunction={()=>props.props.history.push("/")}/>
                <span className="title-text">
                    {localStorage.getItem("title")}
                </span>
        </div>
    )
}
let name, siteDetails;
let addSiteArray = [];


 class AddNewSite extends React.Component{
    constructor(props){
        super(props);
        this.state={
            addNewSector:false,
            enableButton:false,
            addSectorDiv:"",
            selectedSectors:[],
            allSectors:[],
            checkedSectors:"",
        }
        this.props.disableMenu(false)
    }

    
    handleChange = async (e)=>{
            let name = e.currentTarget.getAttribute("name");
            if(e.target.value){
            await this.setState({
                [name]:e.target.value
            })
            }
            else{
            await this.setState({
                [name]:e.target.getAttribute("value")
            })
            }
            if(this.state.addSectorDiv){
                if(this.state.sectorSelected&&this.state[name]){
                    this.setState({
                        enableButton:true
                    })
                }
                else{
                    this.setState({
                        enableButton:false
                    })
                }
            }
            else{
                if(this.state[name]>0){
                    this.setState({
                        enableButton:true
                    })
                }
                else{
                    this.setState({
                        enableButton:false
                    })
                }
            }
            this.getSiteData() 
    }


    showNewSector = ()=>{
        this.setState({
            addSectorDiv:!this.state.addSectorDiv
        })
    }


    changeButtonState = ()=>{
        this.setState({
            enableButton:false
        })
    }

    
    navigate = ()=>{
            this.getSiteNum();
            if(this.props.location.companyName){
                localStorage.setItem("siteCompanyName",this.props.location.companyName)
            }
            let state={
                sites:this.state.siteNum,
                clientName:localStorage.getItem("siteCompanyName"),
                industryList:this.state.allSectors,
                clientid:localStorage.getItem("clientid"),
                page:"addsite",
                addSiteArray:addSiteArray
             }
    
            localStorage.setItem("sitedetailsstate",JSON.stringify({
                state:state
            }))
            this.props.history.push({
                pathname: '/addsitedetails',
                state:state
             })
             addSiteArray=[]
    }


    getSiteNum = ()=>{
        addSiteArray.forEach(element=>{
            element["siteNum"] = this.state["siteNum"+element.sector]
        })
        console.log(this.state,addSiteArray)
    }


    getSiteData = ()=>{
        let addSiteJSON={};
        if(this.state.sectorSelected){
        addSiteJSON["sector"] = this.state.sectorSelected;
        let siteElement = addSiteArray.filter(element=>{
            return element.sector===this.state.sectorSelected
        })
        if(siteElement.length===0){addSiteArray.push(addSiteJSON)}
    }
    }   


    selectCheckBox = (e,name)=>{
        !this.state[e.target.name+"showInput"]?document.getElementById(e.target.name).style.color="#ffffff":document.getElementById(e.target.name).style.color="#9e9e9e";
        this.setState({
            enableButton:false,
            [e.target.name+"showInput"]:!this.state[e.target.name+"showInput"],
            addNewSector:!this.state.addNewSector,
            sectorSelected:name
        })
    }


    getSectors = async()=>{
        if(this.props.location.clientid)
        {
            localStorage.setItem("clientid",this.props.location.clientid)
        }
        let resp = await fetch(addtoclientapi.sectorsForClient+`?clientid=${localStorage.getItem("clientid")}`,apiGetHeader)
        let response = await resp.json();
       await this.setState({
            selectedSectors:response.resultantJSON.selectedSectors,
            allSectors:response.resultantJSON.allSectors
        })
    }


    componentDidMount = ()=>{
        this.getSectors();
    }


    render(){
        return(
            <div className="add-new-site">
            <Header title="Add New Site" props={this.props}/>
            <div className="select-sector-text">Select sector to add site(s)</div>
            <div className="checkbox-container">
            {this.state.selectedSectors.map((element,index)=>{
                return (
                    <>
                    <CustomCheckBox label={element} name={element.replace(/\s/g,'')} onClick={(e)=>this.selectCheckBox(e,element)}/>
                    <div className={"show-input-box "+this.state[element.replace(/\s/g,'')+"showInput"]}>
                    <LabelledInputField placeholder={true} 
                    type="number"
                    changeButtonState={this.changeButtonState} 
                    labelName="# of sites to assess*" required={true} 
                        name={"siteNum"+element} onChange={this.handleChange} />
                        </div>
                    </>
                )
            })}
           
            </div>
            <button type="button" className={"add-new-sector "+this.state.addNewSector} onClick={this.showNewSector}>
                <span>&#8853;</span> 
                Add New Sector
            </button>
            
            <div className="border-bottom" />
            {
                this.state.addSectorDiv&&<>
                <div className="add-new-sector-text">Add New Sector</div>
            <div className="container-add-sector">
            <DropDownMenu placeholder = "Select Sector*" data={this.state.allSectors} value={this.state.sectorSelected} name="sectorSelected" onChange={this.handleChange} dropdownIndex={0}/>
            <LabelledInputField placeholder={true} 
                    type="number"
                    changeButtonState={this.changeButtonState} 
                    labelName="# of sites to assess*" required={true} 
                        name={"siteNum"+this.state.sectorSelected} onChange={this.handleChange} />
            </div>
            <div className="border-bottom" />
            </>}
            <FormNavigationButton buttonStatus={this.state.enableButton} labelName="Next Step" onClick={this.navigate}/>
            </div>
        )
    }
}
export default withRouter(AddNewSite)