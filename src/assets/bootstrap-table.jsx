import React from 'react'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import CustomButton from './sfm-button';
import plusIcon from '../images/icon-small-add.svg';
import smallLink from '../images/icon-small-link.svg';
import downloadIcon from '../images/icon-small-download.svg';
import {Link,withRouter} from 'react-router-dom';

let headerStyle = ()=>{
    return { width: '35%',color: "#727279", fontSize:"11px", borderTop:"unset" };
}
let props = ""
const columns= [{
    dataField:"Location",
    text:"SITE",
    formatter:locationFormatter,
    headerStyle:headerStyle()
},{
    dataField:"DeloitteLead",
    text:"DELOITTE LEAD",
    headerStyle:headerStyle()
},{
    dataField:"Completed",
    text:"STATUS",
    headerStyle:headerStyle()
},{
    dataField:"Open",
    text:"",
    isDummyField:true,
    formatter: actionsFormatter,
    headerStyle:headerStyle()
}
    ]


function locationFormatter(cell,row){
    let style={backgroundColor:"#ef7c03",borderRadius:"4px", color:"white", marginLeft:"4px", outline:"none"}
    if(row.Completed!=="In Progress"){
        return <div id="revisit">{cell} <CustomButton labelName="Revisit" style={style} /></div>
    }
    else {
        return cell;
    }
}


function actionsFormatter(cell,row){
    
    let rowLabel,style,loadComponentString;
        if(row.Completed==="In Progress"){
            rowLabel="Open";
            style={backgroundColor:"#57bb50"};
            loadComponentString="assessments";
        }
        else{
            rowLabel="Results";
            style={backgroundColor:"#0b6ec5"};
            loadComponentString="results";
        }
        return  <div className="misc-container">
                        {row.Completed!=="In Progress"?<img  className="link-icon" aria-label="link" src={smallLink} alt=""/>:<div></div>}
                        {row.Completed!=="In Progress"?<img  className="download" aria-label="download" src={downloadIcon} alt=""/>:<div></div>}         
                        <span className="button"> 
                        <Link to='/reports'> <CustomButton labelName={rowLabel} className="openButton" style={style} clickFunction={()=>loadComponent(loadComponentString)}/></Link>
                        </span>
                </div>
    
}

function addSiteRow (props){
    
    return (
    <div className="add-site">
       
        <span className="add-button">
            <CustomButton imgSrc={plusIcon}/>
                    <span className="add-text">Add Site</span>
        </span>
        
        <div className="view-plant">
            View {props.industryType} <span className="plant-navigate">></span>
        </div>
    </div>
    )
}

function loadComponent(pageString){
    props.disableMenu();
    
}


class Table extends React.Component{
   
        componentDidMount = ()=>{
            props=this.props;
        }

        render(){
            
            return(
                <>
                <BootstrapTable keyField='id' striped bordered={false} data={this.props.data} columns={columns}/>
                {addSiteRow(this.props)}
                </>                    
            )

        }
    }


export default withRouter(Table)