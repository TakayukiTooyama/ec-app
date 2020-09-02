import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import * as History from 'history';
import { StylesProvider } from '@material-ui/styles';
// import { MuiThemeProvider } from '@material-ui/core/styles';

import createStore from './reducks/store/store';
import App from './App';

const history = History.createBrowserHistory();
export const store = createStore(history);

render(
  <StylesProvider injectFirst>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {/* <MuiThemeProvider theme={theme}> */}
        <App />
        {/* </MuiThemeProvider> */}
      </ConnectedRouter>
    </Provider>
  </StylesProvider>,
  document.getElementById('root')
);
