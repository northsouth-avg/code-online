import React, {Component} from "react";
import axios from "axios";
import '../css/historyCode.css'
import { Table } from "antd";

export default class HistoryCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource:[
                {
                    key: '1',
                    id: 1,
                    historyCode: 'print("123")',
                    runResult: '123',
                }, {
                    key: '2',
                    id: 2,
                    historyCode: 'print("1+3")',
                    runResult: '4',
                },
            ],
            columns:[
                {
                    title:'编号',
                    dataIndex:'id',
                    key:'id'
                },
                {
                    title:'历史代码',
                    dataIndex:'historyCode',
                    key:'historyCode'
                },
                {
                    title:'运行结果',
                    dataIndex:'runResult',
                    key:'runResult'
                }
            ]
        }
    }


    componentDidMount() {
        axios.get('http://localhost:8090/code/historyCode')
            .then(res => {
                    this.setState({
                        data : res.data
                    })
                    console.log(res.data)
                }
            )
    }

    render() {
        
        return (

            <div>
                {/* {this.state.data.map((i) => {
                    return (
                        <div className="left-code">
                            <span>历史代码</span>
                            <ul>
                                <li >{i.code}</li>
                            </ul>
                            <span>运行结果</span>
                            <ul>
                                <li>{i.results}</li>
                            </ul>
                        </div>
                    )
                })} */}
                <Table 
                    dataSource={this.state.dataSource} 
                    columns={this.state.columns}
                    bordered
                >
                </Table>
            </div>
        )
    }
}