function parsAssessmentsJSON(JSONValue){
    JSONValue.resultantJSON.forEach((element,index)=>{
        element.siteList.forEach(sites => {
            sites.table_data.forEach(data=>{
                if(data.site_level_status!=="Open"){
                    let date=new Date(data.site_level_status);
                    date = date.toISOString().substring(0, 10);
                    data.site_level_status=date;
                }
            })
        });
    })
    return JSONValue;
}



export default parsAssessmentsJSON
