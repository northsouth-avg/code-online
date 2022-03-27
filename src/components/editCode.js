import React, {Component} from "react";
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-python"; //导入语言
import "ace-builds/src-noconflict/theme-monokai";     //导入主题
import 'ace-builds/src-noconflict/ext-language_tools'; //导入代码提示功能
import {Button} from 'antd';
import axios from "axios";
import '../css/editCode.css'

export default class EditCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'python',
            readOnly: false,
            // editorContent: 'print("123")',
            deskHeight: '200px',
            changed: true,
            codeRes:''
        }
    }

    codeRef = React.createRef();// 创建容器与代码区域绑定

    //点击运行代码
    runCode = (e) => {

    }


    onCodeBlur = (event, e) => {
        const value2 = e.getValue(); // 获取代码内容
        axios.post('http://localhost:8090/code/codeInfo', {data: value2})
            .then(res => {
                console.log(res.data.msg)
                let codeOut = res.data.msg
                console.log(codeOut)
                this.setState({
                    codeRes:codeOut
                })
            }).catch(err => {
            console.log(err)
        })
    }


    render() {
        return (
            <div style={{position:"relative"}}>
                <div>
                    <Button type='primary' onClick={this.runCode} style={{marginBottom:"10px"}}>
                        运行
                    </Button>
                </div>
                <div style={{float:'left'}}>
                    <AceEditor
                        ref={this.codeRef}
                        onBlur={this.onCodeBlur}
                        mode={this.state.mode}
                        readOnly={this.state.readOnly}
                        theme="monokai"
                        name="app_code_editor"
                        showPrintMargin
                        fontSize={14}
                        showGutter
                        // onChange={value => {
                        //     console.log(value); // 输出代码编辑器内值改变后的值
                        // }}
                        highlightActiveLine  //突出活动线
                        enableSnippets  //启用代码段
                        value={this.state.editorContent}
                        style={{width: '1300px', height: this.state.deskHeight, minHeight: 640}}
                        setOptions={{
                            enableBasicAutocompletion: false,   //启用基本自动完成功能
                            enableLiveAutocompletion: true,   //启用实时自动完成功能 （比如：智能代码提示）
                            enableSnippets: false,  //启用代码段
                            showLineNumbers: true,
                            tabSize: 4
                        }}
                    />
                    <div>
                        <Button type='success' onClick={this.runCode} className="btn-code">
                            运行结果
                        </Button>
                        <div>
                            <div className="code-result">
                                代码的运行结果：{this.state.codeRes}
                                <br/>
                                {/*耗时：*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}