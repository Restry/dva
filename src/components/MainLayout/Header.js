import React from 'react';
import { Menu, Icon,Select,Radio } from 'antd';
import { Link } from 'dva/router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'dva';
const Option = Select.Option;

function Header({ dispatch,location }) {
  function switchLocaleHandler(e) {
    dispatch({
      type: 'app/switchLocale',
      payload: e.target.value,
    });
  }
  return (
    <Menu
      selectedKeys={[location.pathname]}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="/users">
        <Link to="/users"><Icon type="bars" />Users</Link>
      </Menu.Item>
      <Menu.Item key="/">
        <Link to="/"><Icon type="home" />Home</Link>
      </Menu.Item>
      <Menu.Item key="/sample">
        <Link to="/sample"><Icon type="frown-circle" />sample</Link>
      </Menu.Item>
      <Menu.Item key="/404">
        <Link to="/page-you-dont-know"><Icon type="frown-circle" />404</Link>
      </Menu.Item>
      <Menu.Item key="/antd">
        
        <div className="change-locale">
          <span style={{ marginRight: 16 }}>Change locale of components: </span>
          <Radio.Group defaultValue="zh_CN" onChange={switchLocaleHandler}>
            <Radio.Button key="en_US" value="en_US">English</Radio.Button>
            <Radio.Button key="zh-CN" value="zh_CN">中文</Radio.Button>
          </Radio.Group>
        </div>

        
      </Menu.Item>
    </Menu>
  );
}

export default connect()( Header);