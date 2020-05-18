import {apiUrl} from '../main/mainapistorage'

let resultsApi={
    getResults:apiUrl+"clientService/report",
    demographics:apiUrl+"siteService/demographic",
    textEdit:apiUrl +"siteService/siteSummaryAndRecommendation",
    themesEdit:apiUrl+"clientService/setKeythemesAndRecommendations",
    clientReport: apiUrl+"clientService/clientNetworkReport",
    clientEditText: apiUrl+"clientService/sectorySummaryAndRecommendation",
    reportOnly:apiUrl+"clientService/reportOnly",
    userInfoDetails: apiUrl+"userService/userInfoDetails",
    associateUserSite: apiUrl+"siteService/associateUserSite"
}

export {
    resultsApi
}