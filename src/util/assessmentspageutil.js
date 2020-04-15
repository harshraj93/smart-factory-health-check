function parsAssessmentsJSON(JSONValue){
    JSONValue.resultantJSON.forEach((element,index)=>{
        element.siteList.forEach(sites => {
            sites.table_data.forEach(data=>{
                if(data.sitelevelstatus!=="In Progress"){
                    let date=new Date(data.sitelevelstatus);
                    date = date.toISOString().substring(0, 10);
                    data.sitelevelstatus=date;
                }
            })
        });
    })
    return JSONValue;
}



export default parsAssessmentsJSON
