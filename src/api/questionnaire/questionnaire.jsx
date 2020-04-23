import {apiUrl} from '../main/mainapistorage'

let  questionnaire = {
    getCapabilities:apiUrl+'/site/getSubCapabilities',
    saveAssessment:apiUrl+'/site/saveAssessment',
    getQuestionnaire:apiUrl+'/site/getQuestionaireDetails'
}

export default questionnaire;