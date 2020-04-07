import React from 'react';
import './drop-down-input-box.scss'
function DropDownMenu(props){
    
        return(
            <div className="dropdown">
                {props.placeholder?"":<label htmlFor="dropdown-select">{props.data.labelName.toUpperCase()}</label>}
                <select className="dropdown-select">
                {props.placeholder&&<option value="" disabled selected style={{fontWeight:"100"}}>{props.placeholder}</option>}
                    {props.data.dropDownData.map((element,index)=>{
                        return(
                            <>
                            <option key={index} value={element}>{element}</option>
                            </>
                        )
                        })}
                </select>
            </div>
        )
    
}

export default DropDownMenu