import React from 'react'
import {DownloadButton} from '../../assets/sfm-button';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button' 

function downloadUpload(props,fileChange){
    return(
        <div className="upload-client-details">
            <div className="upload-text">Upload Client & Site Details</div>
            <span className="button-download"><DownloadButton labelName="Download Template" /></span>
            <span className="button-upload" id="upload">
                <label className="upload-file-label">
                    <input type="file" onChange={fileChange} id="upload-file"></input> 
                    <span>Upload Template</span>
                </label>
            </span>
        </div>
    )
}


let matchString=/.*\.(xlsx|xls|csv)/g
export default class FileUpload extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectedFile:"",
            showPopup:false
        }
    }


    fileChange=(e)=>{
        let file = e.target.files[0]
        
        let fileName=file.name;
        if(fileName.match(matchString)){
        this.setState({
            selectedFile:file,
            showPopup:true,
            popupMessage:"File successfully uploaded"
        })
        }
        else{
        this.setState({
            showPopup:true,
            popupMessage:"Please select your file again"
        })
        }
    }

    handleClose = ()=>{
        this.setState({
            showPopup:false
        })
    }

    render(){
        return(
        <>
        {downloadUpload(this.props,this.fileChange)}
        
        <Modal show={this.state.showPopup} size="sm" aria-labelledby="contained-modal-title-vcenter" centered onHide={this.handleClose}>
            <Modal.Body style={{textAlign:"center"}}>{this.state.popupMessage}</Modal.Body>
                <Modal.Footer style={{borderTop:'unset'}}>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                                      
                </Modal.Footer>
        </Modal>
        </>
        )
    }
}

