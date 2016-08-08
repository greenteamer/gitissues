import React from 'react';
import { Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import routes from './routes';

const history = useRouterHistory(createHashHistory)({ queryKey: false });

import { Provider, connect } from 'react-redux';
import configureStore from './store';

const RouterWithRedux = connect()(Router);
const store = configureStore();

/* eslint-disable react/prefer-stateless-function  */
export default class RootComponent extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux routes={routes} history={history} />
      </Provider>
    );
  }
}
