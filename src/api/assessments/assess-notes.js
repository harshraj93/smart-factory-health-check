import {apiUrl} from '../main/mainapistorage'

let assessNotesApi={
    assessNotes:apiUrl+'/users/getSiteAssessmentNote',
    downloadNotes:apiUrl+'/site/siteNotesDownload'
}

export default assessNotesApi;