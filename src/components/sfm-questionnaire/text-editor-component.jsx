import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import MUIRichTextEditor from 'mui-rte'
import './text-editor-component.scss';


export default class TextEditor extends React.Component{
    constructor(props){
        super(props);
       
        this.state={

        }
    }

    
    
    render(){
        console.log(this.props)
        const defaultTheme = createMuiTheme()

Object.assign(defaultTheme, {
    overrides: {
        MUIRichTextEditor: {
            root: {
                color:"#727279",
                backgroundColor:"#161617"
            },
            editor: {
                borderBottom: "1px solid gray",
                color:"#727279",
            },
            toolbar:{
                color:"#727279",
            }
        }
    }
})
        return(
            <MuiThemeProvider theme={defaultTheme}>
            <MUIRichTextEditor 
                label="Type something here..."
                inputRef={this.props.inputRef}
            />
        </MuiThemeProvider>
        )
    }
}