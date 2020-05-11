import {apiUrl} from '../main/mainapistorage'

let resultsApi={
    getResults:apiUrl+"clientService/report",
    demographics:apiUrl+"siteService/demographic",
    textEdit:apiUrl +"siteService/siteSummaryAndRecommendation",
    themesEdit:apiUrl+"clientService/setKeythemesAndRecommendations",
    clientReport: apiUrl+"clientService/clientNetworkReport",
    reportOnly:apiUrl+"clientService/reportOnly"
}

export {
    resultsApi
}