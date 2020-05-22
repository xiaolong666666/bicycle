import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom'
import './index.less'
import menuList from './../../config/menuConfig.js'

const { SubMenu } = Menu;

let renderMenu = (data) => {
    return data.map(item => {
        if (item.children) {
            return <SubMenu title={item.title} key={item.key}>
                {renderMenu(item.children)}
            </SubMenu>
        }
        return <Menu.Item title={item.title} key={item.key}><NavLink to={item.key}>{item.title}</NavLink></Menu.Item>
    })
}

const Nav = () => {
    let [menuTreenode, setMenuTreenode] = useState(null)

    useEffect(()=>{
        const menuTreenode = renderMenu(menuList);
        setMenuTreenode(menuTreenode)
    },[])

    return (
        <div>
            <div className="logo">
                <img src="/assets/logo-ant.svg" alt="logo" />
                <h2>Imooc MS</h2>
            </div>
            <Menu theme="dark" mode="vertical">
                {menuTreenode}
            </Menu>
        </div>
    );
};

export default Nav;