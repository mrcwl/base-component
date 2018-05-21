/**
 * 
 * create by chenweilong 2018-5-16
 * 
 * tabs组件
 * 
 */

import React from 'react';
import TabPane from './TabPane';

const { PropTypes } = React;

class Tabs extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            activeKey: props.activeKey || props.defaultActiveKey || 0
        };
    }

    static TabPane = TabPane;

    componentWillReceiveProps(nextProps) {
        if ('activeKey' in nextProps) {
            this.setState({
                activeKey: nextProps.activeKey
            });
        }
    }

    onTabBarClick = (key) => !('activeKey' in this.props) && this.setState({ activeKey: key });

    render() {
        const { children, onChange, className, tabBarActiveClassName, tabBarClassName } = this.props;
        const { activeKey } = this.state;

        const tabBar = React.Children.map(children, (child, index) => {
            const { title } = child.props;

            if (!title) {
                return null;
            }

            const el = this.props.renderTabBar(title, index);

            const onClick = () => {
                this.onTabBarClick(index);
                onChange && onChange(index);
            };

            return React.cloneElement(el, {
                key: el.key || index,
                onClick,
                className: `${el.props.className} ${tabBarClassName} ${index === activeKey
                    ? tabBarActiveClassName
                    : ''}`
            });
        });

        return (
            <div className={className}>
                {tabBar}
                {React.Children.toArray(this.props.children)[activeKey]}
            </div>
        );
    }
}

//#region 属性定义

Tabs.defaultProps = {
    tabBarActiveClassName: '',
    className: '',
    tabBarClassName: ''
};

Tabs.propTypes = {
    /**
     * 当前选中Tab的key
     */
    activeKey: PropTypes.number,
    /**
     * 默认选中Tab的key
     */
    defaultActiveKey: PropTypes.number,
    /**
     * Tab 变更事件
     * 
     * @param {number} key
     * 
     */
    onChange: PropTypes.func,
    /**
     * 容器样式名
     */
    className: PropTypes.string,
    /**
     * TabBar样式名
     */
    tabBarClassName: PropTypes.string,
    /**
     * TabBar渲染组件
     * 
     * @param {string} tabBar名称
     * 
     * @param {number} 索引
     * 
     */
    renderTabBar: PropTypes.func,
    /**
     * TabBar Active classname
     * 
     */
    tabBarActiveClassName: PropTypes.string
};
//#endregion

export default Tabs;
