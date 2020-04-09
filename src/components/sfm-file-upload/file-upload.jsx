import React from 'react'
import {DownloadButton} from '../../assets/sfm-button';


function downloadUpload(props,fileChange){
    return(
        <div className="upload-client-details">
            <div className="upload-text">Upload Client & Site Details</div>
            <span className="button-download"><DownloadButton labelName="Download Template" /></span>
            <span className="button-upload" id="upload">
                <DownloadButton labelName="Upload Template" />
                    
                
                {/* <input type="file" onChange={fileChange}></input> */}
            </span>
        </div>
    )
}


let matchString=/.*\.(xlsx|xls|csv)/g
export default class FileUpload extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectedFile:""
        }
    }


    fileChange=(e)=>{
        let file = e.target.files[0]
        let fileName=file.name;
        if(fileName.match(matchString)){
        this.setState({
            selectedFile:file
        })
        }
        else{
        console.log("invalid file")
        }
    }


    render(){
        return(
        downloadUpload(this.props,this.fileChange)
        )
    }
}