import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import FlagImg from '../../images/icon-small-flagged-outline.svg';
import MUIRichTextEditor from 'mui-rte'
import './text-editor-component.scss';
let options = ["bold", "italic", "underline", "strikethrough", "bulletList", "numberList", "highlight", "save"];

export default class TextEditor extends React.Component{
    constructor(props){
        super(props);
       
        this.state={

        }
    }

    notesCards() {
        return(
            <div className="notes-card">
                <div className="notes-card-header">
                    {this.props.data.flag!==null?<img src={FlagImg} alt="" style={{marginTop: "2.5px", marginRight: "10px"}}></img>:""}
                    <div className="header-block">
                        <span className="user-name">{this.props.data.userName}</span>
                        <div className="date-time">
                            <p>11:28AM</p>
                            <p>02/01/2020</p>
                        </div>
                    </div>
                </div>
                <p className="notes-card-content">{this.props.data.text}</p>
            </div>
        )
    }

    render(){
        const defaultTheme = createMuiTheme()

Object.assign(defaultTheme, {
    overrides: {
        MUIRichTextEditor: {
            root: {
                color:"#fefefe",
                backgroundColor:"#232325",
                padding: "9px",
                width: "60vw",
                height: "100%",
                borderRadius: "8px"
            },
            editor: {
                borderBottom: "1px solid gray",
                color:"#fefefe",
                height: "100%",
                padding: "8px 16px",
                textAlign: "left"
            },
            toolbar:{
                backgroundColor:"#161617",
                color: "#727279",
                borderRadius: "4px"
            },
            container:{
                margin: "0px",
                height: "100%"
            }
        }
    }
})
        return(
            this.props.data?this.notesCards():
            <MuiThemeProvider theme={defaultTheme}>
            <MUIRichTextEditor controls={options} maxLength={1000}
                label="Type something here..."
                value={JSON.parse(this.props.value)}
            />
            </MuiThemeProvider>
            // <textarea className="notes-editor-area" onChange={(e)=>this.props.textAreaValue(e)} placeholder="Type Something Here" defaultValue={this.props.value}></textarea>
           
            
        )
    }
}