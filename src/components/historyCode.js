import React, {Component} from "react";
import axios from "axios";
import '../css/historyCode.css'

export default class HistoryCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
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
                {this.state.data.map((i) => {
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
                })}

                {/*<span>运行结果</span>*/}
                {/*{this.state.data.map((i) => {*/}
                {/*    return (*/}
                {/*        <div className="right-result">*/}
                {/*            <ul>*/}
                {/*                <li >{i.results}</li>*/}
                {/*            </ul>*/}
                {/*        </div>*/}
                {/*    )*/}
                {/*})}*/}
            </div>
        )
    }
}