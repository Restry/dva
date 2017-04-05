import moment from 'moment';
moment.locale('en');
import 'moment/locale/zh-cn';
import { addLocaleData, IntlProvider } from 'react-intl';

import zh from '../resources/zh_CN.js';    // 导入 i18n 配置文件
import en from '../resources/en_US.js';

addLocaleData([...zh.data, ...en.data]);

export default {
   namespace: 'app',
   state: {
     locale: zh
   },
   subscriptions: {
     //     setup ({ dispatch }) {
     //       dispatch({ type: 'queryUser' })
     //       window.onresize = () => {
     //         dispatch({ type: 'changeNavbar' })
     //       }
     //     },
   },
   effects: { 
     *switchLocale({
       payload,
     }, {put}) {
       yield put({
         type: 'handlerSwitchLocale',
       })
     },
   },
   reducers: {
     handlerSwitchLocale(state, action) {
       const localeValue = e.target.value;
       const locale = require(`../resources/${localeValue}.js`);

       if (localeValue == 'zh_CN') {
         moment.locale('zh-cn');
       } else {
         moment.locale('en');
       }

       return {
         ...state,
         ...action.payload
       }
     },
   },
 }