import React from 'react'
import {DownloadButton} from '../../assets/sfm-button';

function downloadUpload(props,fileChange){
    return(
        <div className="upload-client-details">
            <div className="upload-text">Upload Client & Site Details</div>
            <span className="button-download"><DownloadButton labelName="Download Template" /></span>
            <span className="button-upload" id="upload">
                <label className="upload-file-label">
                    <input type="file" accept=".xls,.xlsx" onChange={fileChange} id="upload-file"></input> 
                    <span>Upload Template</span>
                </label>
            </span>
        </div>
    )
}


export default class FileUpload extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectedFile:"",
            showPopup:false
        }
    }

    getBase64 = (file) =>{
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
            if ((encoded.length % 4) > 0) {
              encoded += '='.repeat(4 - (encoded.length % 4));
            }
            resolve(encoded);
          };
          reader.onerror = error => reject(error);
        });
      }

    fileChange=async(e)=>{
        let file = e.target.files[0]
        let fileName=file.name;
        let baseEncodedString = await this.getBase64(file).catch(e => Error(e));
            if(baseEncodedString instanceof Error) {
               console.log('Error: ', baseEncodedString.message);
               return;
            };
        
    }

    handleClose = ()=>{
        this.setState({
            showPopup:false
        })
    }

    render(){
        return(
        downloadUpload(this.props,this.fileChange)
        
        )
    }
}

