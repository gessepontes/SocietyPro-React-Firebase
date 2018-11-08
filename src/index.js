import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import green from '@material-ui/core/colors/green';

// const theme = createMuiTheme({
//     palette: {
//         primary: { main: green[500] },
//         secondary: { main: green[700] }, 
//     },
// });

ReactDOM.render(
        <App />
    , document.getElementById('root'));
registerServiceWorker();
