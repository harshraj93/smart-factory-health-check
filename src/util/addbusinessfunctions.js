
let indexObj = {};
function createCardSelectedObj(siteNames,indexObjArray){
    
    

    siteNames.forEach(element => {
      indexObj["businessName"]=element;
      indexObj["indexArray"]=[] ;
      indexObjArray.push(indexObj);
      indexObj={}; 
    });
   
    return indexObjArray;
}

export{
    createCardSelectedObj
}