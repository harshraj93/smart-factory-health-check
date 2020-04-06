import React from 'react'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import {CustomButton} from './sfm-button';
import plusIcon from '../images/icon-small-add.svg';
import smallLink from '../images/icon-small-link.svg';
import downloadIcon from '../images/icon-small-download.svg';
import {Link,withRouter} from 'react-router-dom';




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


class Table extends React.Component{


headerStyle = ()=>{
    return { width: '35%',color: "#727279", fontSize:"11px", borderTop:"unset" };
}


locationFormatter = (cell,row)=>{
    let style={backgroundColor:"#ef7c03",borderRadius:"4px", color:"white", marginLeft:"4px", outline:"none"}
    if(row.Status!=="In Progress"){
        return <div id="revisit">{cell} <CustomButton labelName="Revisit" style={style} /></div>
    }
    else {
        return cell;
    }
}


actionsFormatter = (cell,row)=>{

    let rowLabel,style,loadComponentString;
        if(row.Status==="In Progress"){
            rowLabel="Open";
            style={backgroundColor:"#57bb50"};
            loadComponentString="assessments";
        }
        else{
            rowLabel="Results";
            style={backgroundColor:"#0b6ec5"};
            loadComponentString="results";
        }
        return  (<div className="misc-container">
                        {row.Status!=="In Progress"?<img  className="link-icon" aria-label="link" src={smallLink} alt=""/>:<div></div>}
                        {row.Status!=="In Progress"?<img  className="download" aria-label="download" src={downloadIcon} alt=""/>:<div></div>}         
                        <span className="button"> 
                        <Link to={{
                            pathname:'/reports',
                            locationString:row.Location,
                            companyName:this.props.companyName,
                            loadComponentString : loadComponentString
                        }}
                        >
                            <CustomButton labelName={rowLabel} className="openButton" style={style}/>
                        </Link>
                        </span>
                </div>
        )    
}


columns= [{
    dataField:"Location",
    text:"SITE",
    formatter:this.locationFormatter,
    headerStyle:this.headerStyle
},{
    dataField:"POC",
    text:"DELOITTE LEAD",
    headerStyle:this.headerStyle
},{
    dataField:"Status",
    text:"STATUS",
    headerStyle:this.headerStyle
},{
    dataField:"Open",
    text:"",
    isDummyField:true,
    formatter: this.actionsFormatter,
    headerStyle:this.headerStyle
}
    ]


    render(){
            
            return(
                <>
                <BootstrapTable 
                keyField='id' 
                striped bordered={false} 
                data={this.props.data} 
                columns={this.columns}
                />
                {addSiteRow(this.props)}
                </>                    
            )

        }
    }


export default withRouter(Table)