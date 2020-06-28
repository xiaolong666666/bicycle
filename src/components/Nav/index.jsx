import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import './index.less'
import menuList from './../../config/menuConfig.js'
import { switch_menu } from './../../redux/actions'

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

const Nav = (props) => {
    const initialMenu = window.location.pathname
    let [menuTreenode, setMenuTreenode] = useState(null)
    let [currentMenu, setCurrentMenu] = useState(initialMenu)

    useEffect(()=>{
        const menuTreenode = renderMenu(menuList);
        setMenuTreenode(menuTreenode)
    },[])

    const handleClick = ({item, key}) => {
        const { switch_menu } = props
        switch_menu(item.props.title)
        setCurrentMenu(key)
    }

    return (
        <div className='nav-left'>
            <div className="logo">
                <img src="/assets/logo-ant.svg" alt="logo" />
                <h2>Imooc MS</h2>
            </div>
            <Menu theme="dark" mode="vertical" selectedKeys={currentMenu} onClick={handleClick}>
                {menuTreenode}
            </Menu>
        </div>
    );
};

export default connect(null, { switch_menu})(Nav);