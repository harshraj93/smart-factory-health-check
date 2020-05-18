import {apiUrl} from '../main/mainapistorage'

let assessNotesApi={
    assessNotes:apiUrl+'userService/getSiteAssessmentNote',
    downloadNotes:apiUrl+'siteService/siteNotesDownload'
}

export default assessNotesApi;