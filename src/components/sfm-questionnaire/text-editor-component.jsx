import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import MUIRichTextEditor from 'mui-rte'
import './text-editor-component.scss';

let options = ["bold", "italic", "underline", "strikethrough", "bulletList", "numberList", "highlight", "save"];

export default class TextEditor extends React.Component{
    constructor(props){
        super(props);
       
        this.state={

        }
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
            <MuiThemeProvider theme={defaultTheme}>
            <MUIRichTextEditor controls={options} maxLength={1000}
                label="Type something here..."
            />
        </MuiThemeProvider>
        )
    }
}