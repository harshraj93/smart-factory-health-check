
let indexObj = {};
function createCardSelectedObj(siteNames,indexObjArray,excelData,response){
  console.log(siteNames);
    if(excelData.length>0){
      let indexArray=[];
      siteNames.forEach(element => {
        indexObj["businessName"]=element;
        console.log(element,excelData)
        excelData.forEach(site=>{

          if(element===site.sitename){
            let businessFunctions = site.businessFunctions;
            businessFunctions.forEach(bfunc=>{
                if(response.resultantJSON.includes(bfunc)){
                  console.log(site.sitename,bfunc,response.resultantJSON.indexOf(bfunc))
                  indexArray.push(String(response.resultantJSON.indexOf(bfunc)));
                }
              })
              
              indexObj["indexArray"]=indexArray
              indexArray=[];
          }
        })
        
        indexObjArray.push(indexObj);
        console.log(indexObjArray);
        indexObj={}; 
      });
    }
    else{
    siteNames.forEach(element => {
      indexObj["businessName"]=element;
      indexObj["indexArray"]=[] ;
      indexObjArray.push(indexObj);
      indexObj={}; 
    });
  }
    
    return indexObjArray;
}

export{
    createCardSelectedObj
}