import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Routes from 'routes';
import store from 'redux/store';

import 'styles/main.scss';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    htmlFontSize: 10,
    fontSize: 14,
  },
  palette: {
    primary: {
      main: '#613EEA',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f2075b',
      contrastText: '#fff',
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Routes />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
