import React from 'react';
import {
  Router
} from 'dva/router';
import App from './routes/app'

const cached = {};

function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

function RouterConfig({history,app}) {
  const routes = [{
      path: '/',
      component: App,
      getIndexRoute(nextState, cb) {
        require.ensure([], require => {
          cb(null, {
            component: require('./routes/IndexPage')
          })
        }, 'dashboard')
      },
      childRoutes: [{
        path: '/',
        name: 'IndexPage',
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('./routes/IndexPage'));
          });
        },
      }, {
        path: '/users',
        name: 'UsersPage',
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            registerModel(app, require('./models/users'));
            cb(null, require('./routes/Users'));
          });
        },
      }, {
        path: '/sample',
        name: 'SamplePage',
        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('./routes/LocalSample'));
          });
        },
      }, ]
    }]

    return <Router history = { history } routes = {routes} />;
  }

  export default RouterConfig;