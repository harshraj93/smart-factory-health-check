import {apiUrl} from '../main/mainapistorage'

let resultsApi={
    getResults:apiUrl+"clientService/report",
    demographics:apiUrl+"siteService/demographic",
    textEdit:apiUrl +"siteService/siteSummaryAndRecommendation",
    themesEdit:apiUrl+"clientService/setKeythemesAndRecommendations",
    clientReport: apiUrl+"clientService/clientNetworkReport",
    clientEditText: apiUrl+"clientService/sectorSummaryAndRecommendation",
    clientThemesEdit: apiUrl+"clientService/setSectorKeyAndReco",
    reportOnly:apiUrl+"clientService/reportOnly",
    userInfoDetails: apiUrl+"userService/userInfoDetails",
    associateUserSite: apiUrl+"siteService/associateUserSite",
    associateSectorAndUser: apiUrl+"siteService/associateSectorAndUser",
}

export {
    resultsApi
}