import React, {Component} from "react";


export default class UserInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h2 style={{float: 'right', color: "white"}}>
                当前用户:{sessionStorage.getItem('username')}
            </h2>
        )
    }

}