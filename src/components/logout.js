import React, {Component} from "react";
import {Menu, Dropdown} from 'antd';

export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }

    }

    handleMenuClick = e => {
        if (e.key === '1') {
            this.setState({visible: false});
        }
    };

    handleVisibleChange = flag => {
        this.setState({visible: flag});
    };

    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1" onClick={() => {
                    sessionStorage.clear();
                    window.location.reload()
                }}>
                    退出登录
                </Menu.Item>
            </Menu>
        );
        return (
            <Dropdown
                overlay={menu}
                onVisibleChange={this.handleVisibleChange}
                visible={this.state.visible}
            >
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}
                   style={{float: 'right', color: 'white'}}
                >
                    当前用户:{sessionStorage.getItem('username')}
                </a>
            </Dropdown>
        );
    }
}
