import React, {Component} from "react";


export default class HelpWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: ""
        }
    }

    render() {
        return (
                <div>
                    <h1>Python3 <span >帮助文档</span></h1>
                    <p>我们将向大家介绍 Python3 的基本学习教程。</p>
                    <p>Python3 可应用于多平台包括 Windows、Linux 和 Mac OS X。</p>
                    <ul>
                        <li>Unix (Solaris, Linux, FreeBSD, AIX, HP/UX, SunOS, IRIX, 等等。)</li>
                        <li>Win 9x/NT/2000</li>
                        <li>Macintosh (Intel, PPC, 68K)</li>
                        <li>OS/2</li>
                        <li>DOS (多个DOS版本)</li>
                        <li>PalmOS</li>
                        <li>Nokia 移动手机</li>
                        <li>Windows CE</li>
                        <li>Acorn/RISC OS</li>
                        <li>BeOS</li>
                        <li>Amiga</li>
                        <li>VMS/OpenVMS</li>
                        <li>QNX</li>
                        <li>VxWorks</li>
                        <li>Psion</li>
                        <li>Python 同样可以移植到 Java 和 .NET 虚拟机上。</li>
                    </ul>
                    <h2>python下载</h2>
                    <p>
                        Python3的源码，新闻资讯等可以在 Python 的官网看到：
                        <br/>
                        Python 官网：<a href="https://www.python.org/" target={"_blank"}>https://www.python.org/</a>
                    </p>
                    <h2>环境配置</h2>
                    <p>
                        教程地址:
                        <a href="https://blog.csdn.net/qq_43489208/article/details/108398474" target={"_blank"}>点击访问</a>
                    </p>
                </div>
        )
    }
}
