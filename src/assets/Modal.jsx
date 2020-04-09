import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button' 

export default function ModalPopup(props){
    return(
        <Modal show={props.showPopup} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={props.handleClose}>
            <Modal.Body>{props.popupMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                                      
                </Modal.Footer>
        </Modal>
    )
}