import React, { Component } from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom'
import './index.less'
import menuList from './../../config/menuConfig.js'

const { SubMenu } = Menu;

class Nav extends Component {

    renderMenu = (data) => {
        return data.map(item=>{
            if(item.children){
                return <SubMenu title={item.title} key={item.key}>
                            {this.renderMenu(item.children)}
                        </SubMenu>
            }
            return <Menu.Item title={item.title} key={item.key}><NavLink to={item.key}>{item.title}</NavLink></Menu.Item>
        })
    }

    UNSAFE_componentWillMount(){
        const menuTreenode = this.renderMenu(menuList);
        this.setState({ menuTreenode })
    }

    render() {
        let { menuTreenode } = this.state;
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="logo"/>
                    <h2>Imooc MS</h2>
                </div>
                <Menu theme="dark" mode="vertical">
                    { menuTreenode }
                </Menu>
            </div>
        );
    }
}

export default Nav;