import {apiUrl} from '../main/mainapistorage'

let  questionnaire = {
    getCapabilities:apiUrl+'/site/getCapabilities',
    saveAssessment:apiUrl+'/site/saveAssessment',
    getQuestionnaire:apiUrl+'/site/getQuestionaireDetails',
    addAssessmentNote:apiUrl+'/users/addAssessmentNote',
    getProgress:apiUrl+'/site/getQuestionaireProgress'
}

export default questionnaire;