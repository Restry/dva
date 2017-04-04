import dva from 'dva';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import { message, LocaleProvider, Radio } from 'antd';
import { addLocaleData, IntlProvider } from 'react-intl';
import ReactDOM from 'react-dom';
import React from 'react';

import moment from 'moment';
import zh from './resources/zh_CN.js';    // 导入 i18n 配置文件
import en from './resources/en_US.js';

moment.locale('en');

import 'moment/locale/zh-cn';

import './index.html';
import './index.css';

addLocaleData([...zh.data, ...en.data]);

const ERROR_MSG_DURATION = 3; // 3 秒

// 1. Initialize
const app = dva({
  history: browserHistory,
  onError(e) {
    message.error(e.message, ERROR_MSG_DURATION);
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model(require('./models/users'));

// 4. Router
app.router(require('./router'));

// 5. Start
// app.start('#root');

const InitAPp = app.start();

class Applocator extends React.Component {
  constructor() {
    super();
    this.state = {
      locale: zh,
    };
  }
  changeLocale = (e) => {
    const localeValue = e.target.value;
    const locale = require(`./resources/${localeValue}.js`);
    this.setState({ locale });
    if (localeValue=='zh_CN') {
      moment.locale('zh-cn');
    } else {
      moment.locale('en');
    }
  }
  render() {
    return (
      <div>
        <div className="change-locale">
          <span style={{ marginRight: 16 }}>Change locale of components: </span>
          <Radio.Group defaultValue="zh_CN" onChange={this.changeLocale}>
            <Radio.Button key="en_US" value="en_US">English</Radio.Button>
            <Radio.Button key="zh-CN" value="zh_CN">中文</Radio.Button>
          </Radio.Group>
        </div>
        <LocaleProvider locale={this.state.locale.antd}>
          <IntlProvider
            locale={this.state.locale.locale}
            messages={this.state.locale.messages}>
            <InitAPp />
          </IntlProvider>
        </LocaleProvider>
      </div>
    );
  }
}


ReactDOM.render(<Applocator />, document.getElementById('root'));
