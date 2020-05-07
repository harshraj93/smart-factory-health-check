function parsAssessmentsJSON(JSONValue){
    JSONValue.resultantJSON.forEach((element,index)=>{
        element.siteList.forEach(sites => {
            sites.table_data.forEach(data=>{
                if(data.OpenedOn){
                    let date=new Date(data.OpenedOn);
                    date = date.toISOString().substring(0, 10);
                    data.OpenedOn=date;
                }
            })
        });
    })
    return JSONValue;
}



export default parsAssessmentsJSON
