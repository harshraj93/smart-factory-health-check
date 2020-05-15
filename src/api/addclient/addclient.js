import {apiUrl} from '../main/mainapistorage'

let addclientapi={
    industryList:apiUrl+'clientService/industryList',
    sectorList:apiUrl+'siteService/sectorList',
    manufactureTypeList:apiUrl+'siteService/manufactureTypeList',
    addClient:apiUrl+'clientService/addClient',
    getBusinessFunctions:apiUrl+'clientService/businessFunctions',
    addSite:apiUrl+'siteService/addSite',
    upload:apiUrl+'siteService/uploadSiteInfo',
    download:apiUrl+'siteService/downloadSiteInfo',
    updateClient:apiUrl+'siteService/updateClient'

}

export default addclientapi;