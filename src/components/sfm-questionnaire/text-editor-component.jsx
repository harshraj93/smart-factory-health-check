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
        let length = value.toString('html').replace(/<[^>]+>/g, '').length
        //editorState.getCurrentContent().getPlainText('').length;
        if(length<=1000){this.setState({value})};
        if (this.props.textAreaValue&&length<=1000) {
          this.props.textAreaValue(
            value.toString('html')
          );
        }
      };
    render(){

        return(
            <RichTextEditor
            value={this.state.value}
            onChange={this.onChange}
            placeholder={this.props.placeholder}
            />
        )
    }
}