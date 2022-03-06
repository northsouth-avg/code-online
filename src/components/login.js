import React, {Component} from "react";
import {
    UserOutlined,
    LockOutlined,
    UserSwitchOutlined,
    HomeOutlined,
    IdcardOutlined,
    LaptopOutlined,
    RocketOutlined,
    HolderOutlined
} from "@ant-design/icons";

import {Button, Col, Form, Input, message, Modal, Row} from "antd";
import '../css/login.css'
import axios from "axios";
import {HOST, PORT} from "../config/urlConfig";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerVisible: false
        }
    }

    registerRef = React.createRef(); //创建容器与注册窗口中的表单绑定
    loginRef = React.createRef(); //创建容器和登录组件中的登录表单绑定

    //点击注册按钮显示注册框的事件
    register = () => {
        this.setState({
            registerVisible: true
        })
    }

    //登录的方法
    userLogin = async () => {
        await this.loginRef.current.validateFields().then(value => { //表单验证成功,向后台发送登录请求
            axios.post(`${HOST}:${PORT}/option/login`, value)
                .then(result => {
                    console.log(result)
                    if (result.data.code === 1004) { //用户名密码验证成功
                        sessionStorage.setItem('username', value.username); //将用户名存储到sessionStorage中
                        sessionStorage.setItem('token', result.data.token); //将token信息存储到sessionStorage中
                        message.success(result.data.msg);
                        this.props.history.push('/home/edit');//进行页面跳转
                    } else { //用户名，密码验证失败 返回登录界面
                        message.error(result.data.msg);
                        return '验证失败';
                    }
                }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            message.error('验证失败');
            return '验证有误'
        })
    }


    render() {
        const {registerVisible} = this.state
        return (
            <div className="login-bgc">
                <div className="system-name">欢迎使用在线代码运行系统</div>
                <section className="login-content">
                    <h2 className="h2">用户登录</h2>
                    <Form className='login-form' ref={this.loginRef}>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name='username'
                                    rules={
                                        [
                                            {
                                                required: true,
                                                message: '用户名不能为空'
                                            }
                                        ]
                                    }
                                >
                                    <Input prefix={<UserOutlined/>} style={{color: 'rgba(0,0,0,0.25)'}}
                                           placeholder='用户名'
                                           className='input-style'
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name='userpwd'
                                    rules={
                                        [
                                            {
                                                required: true,
                                                message: '密码不能为空'
                                            }
                                        ]
                                    }
                                >
                                    <Input.Password
                                        prefix={<LockOutlined/>}
                                        style={{color: 'rgba(0,0,0,0.25)'}}
                                        placeholder='密码'
                                        className='input-style'
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item>
                                    <Button type='primary' className={'login-form-button'} onClick={this.userLogin}>
                                        登录
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item>
                                    <Button type='primary' className={'login-form-button'} onClick={this.register}>
                                        注册
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </section>

                {/*用户注册框*/}
                <Modal
                    title={
                        <div style={{width: '100%'}}>
                            用户注册
                        </div>
                    }
                    visible={registerVisible}
                    onCancel={() => {
                        this.setState({
                            registerVisible: false
                        })
                    }
                    }
                    cancelText={'取消'}
                    //点击注册按钮
                    onOk={async () => {  //点击注册按钮
                        await this.registerRef.current.validateFields().then(value => { //验证成功后向后台发送请求
                            axios.post(`${HOST}:${PORT}/option/register`, value)
                                .then(res => {
                                    message.success(res.data.msg) //
                                    this.props.history.push('/')  //注册成功跳转到登录页面
                                    this.setState({
                                        registerVisible: false //关闭注册窗口
                                    })
                                }).catch(err => {
                                console.log(err.message)
                            })
                        }).catch(err => {
                            return '注册失败'
                        })
                    }
                    }
                    okType={'primary'}  //注册按钮的样式
                    okText={'注册'}
                    destroyOnClose //关闭对话框后，表单重置
                >
                    <Form ref={this.registerRef} preserve={false}>
                        <Form.Item
                            label='用&nbsp;户&nbsp;名&nbsp;&nbsp;'
                            name='username'
                            rules={
                                [
                                    {
                                        required: true,
                                        message: '请输入用户名'
                                    }
                                ]
                            }
                        >
                            <Input prefix={<UserOutlined/>}
                                   style={{color: 'rgba(0,0,0,0.25)'}}
                                   placeholder='用户名'
                            />
                        </Form.Item>
                        <Form.Item
                            label='输入密码'
                            name='userPwd'
                            rules={
                                [
                                    {
                                        required: true,
                                        message: '请输入密码'
                                    }
                                ]
                            }
                        >
                            <Input.Password
                                prefix={<LockOutlined/>}
                                style={{color: 'rgba(0,0,0,0.25)'}}
                                placeholder='输入密码'
                            />
                        </Form.Item>
                        <Form.Item
                            label='确认密码'
                            name='confirmPwd'
                            rules={
                                [
                                    {
                                        required: true,
                                        message: '请重复密码'
                                    },
                                    {  //进行两次输入验证
                                        validator: (rule, value) => {
                                            //获取第一次输入的密码
                                            let userPwd = this.registerRef.current.getFieldValue('userPwd')
                                            //进行验证
                                            if (userPwd && userPwd !== value) {
                                                return Promise.reject('两次密码不一致')
                                            } else {
                                                return Promise.resolve();
                                            }
                                        }
                                    }
                                ]
                            }
                        >
                            <Input.Password
                                prefix={<LockOutlined/>}
                                style={{color: 'rgba(0,0,0,0.25)'}}
                                placeholder='确认密码'
                            />
                        </Form.Item>
                        <Form.Item
                            label='输入姓名'
                            name='tname'
                            rules={
                                [
                                    {
                                        required: true,
                                        message: '请输入姓名'
                                    }
                                ]
                            }
                        >
                            <Input
                                prefix={<HomeOutlined/>}
                                style={{color: 'rgba(0,0,0,0.25)'}}
                                placeholder='输入姓名'
                            />
                        </Form.Item>
                        <Form.Item
                            label='输入年龄'
                            name='age'
                            rules={
                                [
                                    {
                                        required: true,
                                        message: '请输入年龄'
                                    }
                                ]
                            }
                        >
                            <Input
                                prefix={<IdcardOutlined/>}
                                style={{color: 'rgba(0,0,0,0.25)'}}
                                placeholder='输入年龄'
                            />
                        </Form.Item>
                        <Form.Item
                            label='输入性别'
                            name='gender'
                            rules={
                                [
                                    {
                                        required: true,
                                        message: '请输入性别'
                                    }
                                ]
                            }
                        >
                            <Input
                                prefix={<UserSwitchOutlined/>}
                                style={{color: 'rgba(0,0,0,0.25)'}}
                                placeholder='输入性别'
                            />
                        </Form.Item>
                        <Form.Item
                            label='输入学校'
                            name='school'
                            rules={
                                [
                                    {
                                        required: true,
                                        message: '请输入学校名称'
                                    }
                                ]
                            }
                        >
                            <Input
                                prefix={<HolderOutlined />}
                                style={{color: 'rgba(0,0,0,0.25)'}}
                                placeholder='输入学校'
                            />
                        </Form.Item>
                        <Form.Item
                            label='输入专业'
                            name='discipline'
                            rules={
                                [
                                    {
                                        required: true,
                                        message: '请输入专业'
                                    }
                                ]
                            }
                        >
                            <Input
                                prefix={<RocketOutlined/>}
                                style={{color: 'rgba(0,0,0,0.25)'}}
                                placeholder='输入专业'
                            />
                        </Form.Item>
                        <Form.Item
                            label='输入年级'
                            name='grade'
                            rules={
                                [
                                    {
                                        required: true,
                                        message: '请输入年级'
                                    }
                                ]
                            }
                        >
                            <Input
                                prefix={<LaptopOutlined/>}
                                style={{color: 'rgba(0,0,0,0.25)'}}
                                placeholder='输入年级'
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}