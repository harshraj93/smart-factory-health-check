import {apiUrl} from '../main/mainapistorage'

let  questionnaire = {
    getCapabilities:apiUrl+'siteService/getCapabilities',
    saveAssessment:apiUrl+'siteService/saveAssessment',
    getQuestionnaire:apiUrl+'siteService/getQuestionaireDetails',
    addAssessmentNote:apiUrl+'userService/addAssessmentNote',
    getProgress:apiUrl+'siteService/getQuestionaireProgress',
    skipFlag:apiUrl+'siteService/skipSubCapability'
}

export default questionnaire;