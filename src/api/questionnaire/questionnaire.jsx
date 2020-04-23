import {apiUrl} from '../main/mainapistorage'

let  questionnaire = {
    getCapabilities:apiUrl+'/site/getSubCapabilities',
    saveAssessment:apiUrl+'/site/saveAssessment',
    getQuestionnaire:apiUrl+'/site/getQuestionaireDetails',
    addAssessmentNote:apiUrl+'/site/addAssessmentNote'
}

export default questionnaire;