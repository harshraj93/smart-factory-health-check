import React from 'react';
import './drop-down-input-box.scss'
function DropDownMenu(props){
    
        return(
            <div className="dropdown">
                <label htmlFor="dropdown-select">{props.data.labelName.toUpperCase()}</label>
                <select className="dropdown-select">
                    {props.data.dropDownData.map((element,index)=><option key={index} value={element}>{element}</option>)}
                </select>
            </div>
        )
    
}

export default DropDownMenu