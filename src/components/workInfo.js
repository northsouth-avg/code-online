import React, {Component} from "react";
import { Table,Image } from "antd";
import work from '../img/工作.png'

export default class WorkInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        
        return (

            <div>
              <Image src={work}/>
            </div>
        )
    }
}