/**
 * 
 * create by chenweilong 2018-5-17
 * 
 * 配合tabs进行使用生成tabbar组件
 * 
 */

import React from 'react';

const TabPane = ({ children }) => {
    return <div>{children}</div>;
};

TabPane.propTypes = {
    title: React.PropTypes.string
};

export default TabPane;
