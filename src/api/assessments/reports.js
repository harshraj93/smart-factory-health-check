import {apiUrl} from '../main/mainapistorage'

let resultsApi={
    getResults:apiUrl+"/client/report",
    demographics:apiUrl+"/site/demographic",
    textEdit:apiUrl +"/site/siteSummaryAndRecommendation",
    themesEdit:apiUrl+"/client/setKeythemesAndRecommendations",
    reportOnly:apiUrl+"/client/reportOnly"
}

export {
    resultsApi
}