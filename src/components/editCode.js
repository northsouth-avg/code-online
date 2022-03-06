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
        // console.log(value2);

        // const APP_ID = "1172"
        // const APP_SECRET = "675871a2bf49ac1582261c56d146690a"
        //
        // let code = value2;
        // let inputStr = "";
        // let lang = "py";
        //
        // const codebuff = encodeURIComponent(Base64.encode(code));
        // // const inputbuff = encodeURIComponent(Base64.encode(inputStr));
        // let sign = md5(code + inputStr + APP_SECRET)

        // const data = {
        //     "appId": APP_ID,
        //     "sign": sign,
        //     "lang": lang,
        //     "code": codebuff,
        //     // "input": inputbuff,
        // }
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
        //
        // axios({
        //     method: 'post',
        //     url: 'https://jsrun.net/api/run/v2',
        //     headers: {
        //         "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        //     },
        //     params: data
        // }).then(res => {
        //     console.log(res.data)
        //     alert(res.data)
        // }).catch(err => {
        //     console.log(err)
        //     alert(err)
        //
        // })

        // axios({
        //     method: 'post',
        //     url: 'https://api.toolnb.com/ext/topnowdata.json',
        //     headers: {
        //         "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        //     },
        //     params: {
        //         code:value2,
        //         token:'1eaab8cb95ae7de126d44247eb1992a9',
        //         code_type:"python"
        //     }
        // }).then(res => {
        //     console.log(res.data)
        //     alert(res.data)
        // }).catch(err => {
        //     console.log(err)
        //     alert(err)
        //
        // })
    }


    render() {
        return (
            <div style={{position:"relative"}}>
                <div>
                    <Button type='primary' onClick={this.runCode}>运行</Button>
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
                        <Button type='success' onClick={this.runCode} className="btn-code">运行结果</Button>
                        {/*<input type="text" value={this.state.codeRes}/>*/}
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