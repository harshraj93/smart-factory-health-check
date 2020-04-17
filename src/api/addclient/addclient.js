import {apiUrl} from '../main/mainapistorage'

let addclientapi={
    industryList:apiUrl+'/client/industryList',
    sectorList:apiUrl+'/site/sectorList',
    manufactureTypeList:apiUrl+'/site/manufactureTypeList',
    addClient:apiUrl+'/client/addClient',
    getBusinessFunctions:apiUrl+'/client/businessFunctions',
    addSite:apiUrl+'/site/addSite'

}

export default addclientapi;