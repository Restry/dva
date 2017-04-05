import React, { PropTypes } from 'react'
import { connect } from 'dva'
// import Login from './login'
// import { Layout } from '../components' 
// import { Helmet } from 'react-helmet'
 import styles from '../components/MainLayout/MainLayout.css';
 import Header from '../components/MainLayout/Header';
 
import { message, LocaleProvider, Spin } from 'antd';
import { IntlProvider } from 'react-intl';

function App({ children, location, dispatch, app, loading }) {
  return (
        <LocaleProvider locale={app.locale.antd}>
          <IntlProvider
            locale={app.locale.locale}
            messages={app.locale.messages}>
    
             <div className={styles.normal}>
               <Header location={location} />
               <div className={styles.content}>
                 <div className={styles.main}>
                   {children}
                 </div>
               </div>
             </div>
    
          </IntlProvider>
        </LocaleProvider>
  );
}
 


export default connect(({ app, loading }) => ({ app, loading: loading.models.app }))(App)