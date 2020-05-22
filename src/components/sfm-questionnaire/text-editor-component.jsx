import React from 'react';
//import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import FlagImg from '../../images/icon-small-flagged-outline.svg';
import RichTextEditor from 'react-rte';

export default class TextEditor extends React.Component{
    constructor(props){
        super(props);
       
        this.state={
            value: RichTextEditor.createEmptyValue()
        }
    }

    onChange = (value) => {
        console.log(value.toString('html').length)
        let length = value.toString('html').replace(/<[^>]+>/g, '').length
        //editorState.getCurrentContent().getPlainText('').length;
        if(length<=1000){this.setState({value})};
        if (this.props.textAreaValue&&length<=1000) {
          // Send the changes up to the parent component as an HTML string.
          // This is here to demonstrate using `.toString()` but in a real app it
          // would be better to avoid generating a string on each change.
          this.props.textAreaValue(
            value.toString('html')
          );
        }
      };
    render(){
//         const defaultTheme = createMuiTheme()

// Object.assign(defaultTheme, {
//     overrides: {
//         MUIRichTextEditor: {
//             root: {
//                 color:"#fefefe",
//                 backgroundColor:"#232325",
//                 padding: "9px",
//                 width: "60vw",
//                 height: "100%",
//                 borderRadius: "8px"
//             },
//             editor: {
//                 borderBottom: "1px solid gray",
//                 color:"#fefefe",
//                 height: "100%",
//                 padding: "8px 16px",
//                 textAlign: "left"
//             },
//             toolbar:{
//                 backgroundColor:"#161617",
//                 color: "#727279",
//                 borderRadius: "4px"
//             },
//             container:{
//                 margin: "0px",
//                 height: "100%"
//             }
//         }
//     }
// })
        return(
            // this.props.data?this.notesCards():
            // <MuiThemeProvider theme={defaultTheme}>
            // <MUIRichTextEditor controls={options} maxLength={1000}
            //     label="Type something here..."
            //     value={JSON.parse(this.props.value)}
            // />
            // </MuiThemeProvider>
            <RichTextEditor
            value={this.state.value}
            onChange={this.onChange}
            placeholder={this.props.placeholder}
            maxlength={1000}
            />
            
           
            
        )
    }
}