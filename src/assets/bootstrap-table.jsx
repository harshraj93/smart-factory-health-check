import React from 'react'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import CustomButton from './sfm-button';
import './bootstrap-table.scss'

const columns= [{
    dataField:"Location",
    text:"",
    formatter:locationFormatter
},{
    dataField:"DeloitteLead",
    text:""
},{
    dataField:"Completed",
    text:"",
},{
    dataField:"Open",
    text:"",
    isDummyField:true,
    formatter: actionsFormatter,
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
        return <>{cell} <CustomButton labelName="Revisit" style={style} /></>
    }
    else {
        return cell;
    }
}

function completeFormatter(cell,row){
    console.log(cell,"cell",row,"row");
    if(cell!="In Progress")
    {
        return <>&#10004; {cell}</>
    }
    else{
        return cell
    }
}

function actionsFormatter(cell,row){
    
    let rowLabel,style;
        if(row.Completed=="In Progress"){
            rowLabel="Open";
            style={backgroundColor:"#57bb50"};
            // return <div className="misc-container">
            //             <span className="button">
            //                 <CustomButton labelName={rowLabel} className="openButton" style={style} />
            //             </span>
            //       </div>
        }
        else{
            rowLabel="Results";
            style={backgroundColor:"#0b6ec5"};
            // return  <div className="misc-container">
            //             <span className="link-icon">
            //                 &#128279;
            //             </span>
            //             <span className="download">
            //                 &#8595;
            //             </span>
            //             <span className="button">
            //                 <CustomButton labelName={rowLabel} className="openButton" style={style} />
            //             </span>
            //         </div>

        }
        return  <div className="misc-container">
                        <span className="link-icon">
                            &#128279;
                        </span>
                        <span className="download">
                            &#8595;
                        </span>
                        <span className="button">
                            <CustomButton labelName={rowLabel} className="openButton" style={style} />
                        </span>
                    </div>
    
}


class Table extends React.Component{

        render(){
            return(
                <BootstrapTable keyField='id' striped bordered={false} data={data} columns={columns}/>
            )

        }
    }


export default Table