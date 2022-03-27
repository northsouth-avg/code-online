import React, {Component} from "react";
import { Table,Image } from "antd";
import course from '../img/网课.png'

export default class OnlineCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        
        return (

            <div>
              <Image 
                src={course}
              />
            </div>
        )
    }
}