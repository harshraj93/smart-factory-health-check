import React from 'react'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import {CustomButton} from './sfm-button';
import {Link,withRouter} from 'react-router-dom';




function addSiteRow (props){
    
    return (
    <div className="add-site">
        
        <Link to={{
            pathname:'/reports',
            clientName:props.companyName,
            sector : props.industryType,
            clientid:props.clientid,
            loadComponentString : "network",
        }}
        >
        <div className="view-plant">
            View {props.industryType} Network <span className="plant-navigate">></span>
        </div>
        </Link>
    </div>
    )
}


class Table extends React.Component{


headerStyle = ()=>{
    return { width: '35%',color: "#727279", fontSize:"11px", borderTop:"unset",padding:"0.50rem" };
}


locationFormatter = (cell,row)=>{
    let style={backgroundColor:"#ef7c03",borderRadius:"4px", color:"white", marginLeft:"4px", outline:"none"}
    // if(row.site_level_status!=="Open"){
    //     return <div id="revisit"><span>{cell}</span> <CustomButton labelName="Revisit" style={style} /></div>
    // }
    if(row.revisit_flag==="true" || row.revisit_flag===true){
        return <div id="revisit"><span>{cell}</span> <CustomButton labelName="Revisit" style={style} /></div>
    }
    else {
        return cell;
    }
}


actionsFormatter = (cell,row)=>{

    localStorage.setItem("clientName", this.props.companyName)
        
        return  (<div className="misc-container">
                        {/* {row.site_level_status!=="Open"?<img  className="link-icon" aria-label="link" src={smallLink} alt=""/>:<div></div>}
                        {row.site_level_status!=="Open"?<img  className="download" aria-label="download" src={downloadIcon} alt=""/>:<div></div>}          */}
                        <span className="button"> 
                        <Link to={{
                            pathname:'/reports',
                            locationString:row.Location,
                            companyName:this.props.companyName,
                            loadComponentString : "assessments",
                            industryType : this.props.industryType,
                            siteid: row.siteid,
                            clientid: this.props.clientid
                        }}
                        >
                            >
                        </Link>
                        </span>
                </div>
        )    
}


columns= [{
    dataField:"Location",
    text:"",
    formatter:this.locationFormatter,
    headerStyle:this.headerStyle
},{
    dataField:"deloitteLead",
    text:"",
    headerStyle:this.headerStyle
},
{
    dataField:"OpenedOn",
    text:"",
    headerStyle:this.headerStyle
},
{
    dataField:"site_level_status",
    text:"",
    headerStyle:this.headerStyle
},{
    dataField:"Open",
    text:"",
    isDummyField:true,
    formatter: this.actionsFormatter,
    headerStyle:this.headerStyle
}
    ]

    rowEvents = {
       
        onClick : (e, row, rowIndex)=>{
            this.props.history.push({
                pathname:'/reports',
                locationString:row.Location,
                companyName:this.props.companyName,
                loadComponentString : "assessments",
                industryType : this.props.industryType,
                siteid: row.siteid,
                clientid: this.props.clientid
            })
        }
        
    }


    render(){
            
            return(
                <>
                <BootstrapTable 
                keyField='id' 
                striped bordered={false} 
                data={this.props.data} 
                columns={this.columns}
                rowEvents={ this.rowEvents }
                />
                {addSiteRow(this.props)}
                </>                    
            )

        }
    }


export default withRouter(Table)