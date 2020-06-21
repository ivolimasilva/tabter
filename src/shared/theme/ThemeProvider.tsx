import React, { FunctionComponent } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core';

import theme from '.';

const ThemeProvider: FunctionComponent = ({ children }) =>
    <MuiThemeProvider theme={ theme }>{children}</MuiThemeProvider>;

export default ThemeProvider;
