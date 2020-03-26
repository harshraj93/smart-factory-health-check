import React from 'react'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import CustomButton from './sfm-button';
import plusIcon from '../images/icon-small-add.svg';
import smallLink from '../images/icon-small-link.svg';
import downloadIcon from '../images/icon-small-download.svg';
const columns= [{
    dataField:"Location",
    text:"Site",
    formatter:locationFormatter,
    headerStyle:() => {
        return { width: '25%',color: "#727279" };
      }
},{
    dataField:"DeloitteLead",
    text:"Deloitte Lead",
    headerStyle:() => {
        return { width: '20%',color: "#727279"  };
      }
},{
    dataField:"Completed",
    text:"Status",
    headerStyle:() => {
        return { width: '20%',color: "#727279"  };
      }
},{
    dataField:"Open",
    text:"",
    isDummyField:true,
    formatter: actionsFormatter,
    headerStyle:() => {
        return { width: '35%',color: "#727279"  };
      }
}
    ]

const data=[{
    Location:"Bristol",
    DeloitteLead:"Jana Strassman",
    Completed:"In Progress",

},{
    Location:"Edinburgh",
    DeloitteLead:"Jana Strassman",
    Completed:"In Progress",

},{
    Location:"Odessa",
    DeloitteLead:"Jana Strassman",
    Completed:"10/25/2019",

},{
    Location:"Bristol",
    DeloitteLead:"Jana Strassman",
    Completed:"In Progress",

}]

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
    
    let rowLabel,style;
        if(row.Completed==="In Progress"){
            rowLabel="Open";
            style={backgroundColor:"#57bb50"};
        }
        else{
            rowLabel="Results";
            style={backgroundColor:"#0b6ec5"};
        }
        return  <div className="misc-container">
                        {row.Completed!=="In Progress"?<img  className="link-icon" aria-label="link" src={smallLink} alt=""/>:<div></div>}
                        {row.Completed!=="In Progress"?<img  className="download" aria-label="download" src={downloadIcon} alt=""/>:<div></div>}         
                        <span className="button"> 
                            <CustomButton labelName={rowLabel} className="openButton" style={style} />
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
            View Conagra Network <span className="plant-navigate">></span>
        </div>
    </div>
    )
}



class Table extends React.Component{

        render(){
            return(
                <>
                <BootstrapTable keyField='id' striped bordered={false} data={data} columns={columns} rowStyle={{height:"56px"}}/>
                {addSiteRow()}
                </>                    
            )

        }
    }


export default Table