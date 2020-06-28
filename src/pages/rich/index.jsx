import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd'
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'defaultStyle/common.less'

class Rich extends Component {
    state = {
        editorState: '',
        contentState: '',
        showRichText: false
    }
    handleClearContent = () => {
        this.setState({
            editorState: ''
        })
    }
    handleGetText = () => {
        this.setState({
            showRichText: true
        })
    }
    onContentStateChange = (contentState) => {
        this.setState({
            contentState
        })
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState: editorState
        })
    }
    render() {
        const { editorState, contentState, showRichText } = this.state
        return (
            <div className="wrapper">
                <Card className="button-wrapper">
                    <Button type="primary" onClick={this.handleClearContent}>清空内容</Button>
                    <Button type="primary" onClick={this.handleGetText}>获取HTML文本</Button>
                </Card>
                <Card title="富文本编辑器" className="card-wrapper">
                    <Editor
                        editorState={editorState}
                        onContentStateChange={this.onContentStateChange}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </Card>
                <Modal title='富文本' visible={showRichText} onCancel={()=>{this.setState({ showRichText: false })}} footer={null}>
                    {draftToHtml(contentState)}
                </Modal>
            </div>
        );
    }
}

export default Rich;