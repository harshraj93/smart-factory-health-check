import {apiUrl} from '../main/mainapistorage'

let resultsApi={
    getResults:apiUrl+"/client/report",
    demographics:apiUrl+"/site/demographic"
}

export {
    resultsApi
}