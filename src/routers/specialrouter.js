import React from "react";
import {Redirect, Route} from 'react-router-dom'

//定义鉴权函数
let authentication = () => {
    let token = sessionStorage.getItem('token');
    return token ? true : false
}

//路由拦截
const PrivateRouter = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest} //遍历组件
            //若鉴权函数返回值为true，则已经登陆，否则返回登录界面
            render={(props) => authentication() ? <Component {...props}/> :
                <Redirect to={{  //页面重定向
                    pathname: '/login',
                    state: {form: props.location}
                }}/>}
        >
        </Route>
    )

}
export default PrivateRouter