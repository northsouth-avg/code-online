import React, {Component} from 'react';
import {BrowserRouter, NavLink, Route} from "react-router-dom";
import {Layout, Menu} from "antd";
import logo from '../logo.svg'
import {UserOutlined} from "@ant-design/icons";
import EditCode from "./editCode";
import Logout from "./logout";
import HistoryCode from "./historyCode";
import HelpWord from "./helpWord";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

export default class Home extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Header className='App-header'>
                        <div style={{float: 'left'}}>
                            <img src={logo} alt="LOGO" className='App-logo'/>
                        </div>
                        <div>
                            <h2 style={{
                                float: 'left',
                                color: 'white',
                                fontSize: '25px',
                                marginLeft: '30px',
                            }}>在线代码运行系统</h2>
                        </div>
                        <div>
                            <h2>
                                <Logout/>
                            </h2>
                        </div>
                    </Header>
                </Layout>

                {/*侧边导航栏*/}
                <Layout>
                    <Sider width={200} className={'site-layout-content'}>
                        <Menu
                            theme='dark'
                            mode='inline'
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0}}
                        >
                            <SubMenu key='sub1' icon={<UserOutlined/>} title='功能板块'>
                                <Menu.Item key='1'>
                                    {/*todo*/}
                                    <NavLink to='/home/edit'>python编辑</NavLink>
                                </Menu.Item>
                                <Menu.Item key='2'>
                                    {/*todo*/}
                                    <NavLink to='/home/historyCode'>历史记录</NavLink>
                                </Menu.Item>
                                <Menu.Item key='3'>
                                    {/*todo*/}
                                    <NavLink to='/home/helpWord'>帮助文档</NavLink>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content
                            style={{
                                padding: 2,
                                margin: '15px 5px',
                                minHeight: 650,
                                color: 'black'
                            }}
                        >
                            {/*<Switch>*/}
                            <Route path='/home/edit' component={EditCode}/>
                            <Route path='/home/historyCode' component={HistoryCode}/>
                            <Route path='/home/helpWord' component={HelpWord}/>


                            {/*</Switch>*/}

                        </Content>
                        <Footer style={{textAlign: 'center'}}>主界面 ©2021 Created by GQ</Footer>
                    </Layout>
                </Layout>
            </BrowserRouter>
        )

    }
}