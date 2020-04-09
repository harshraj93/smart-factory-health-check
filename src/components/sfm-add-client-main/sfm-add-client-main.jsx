import React from 'react';
import {CustomButton} from '../../assets/sfm-button';
import leftIcon from '../../images/icon-small-chevron-left.svg';

export default function Header(props){
    return(
        <div className="add-new-client-title">
                <CustomButton imgSrc={leftIcon} clickFunction={props.props.history.goBack}/>
                <span className="title-text">
                    {props.title}
                </span>
        </div>
    )
}