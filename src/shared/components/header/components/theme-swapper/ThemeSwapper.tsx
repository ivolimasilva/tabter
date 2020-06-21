import React, { useEffect, useCallback, FunctionComponent } from 'react';
import useSystemTheme from 'react-use-system-theme';

import { IconButton } from '@material-ui/core';
import { Brightness7 as SunIcon, Brightness4 as MoonIcon } from '@material-ui/icons';

import useStyles from './ThemeSwapper.styles';

const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
};

export const ThemeSwapper: FunctionComponent = () => {
    const classes = useStyles();
    const systemTheme = useSystemTheme(THEMES.LIGHT);

    useEffect(() => {
        if (document.body.getAttribute('data-theme') === systemTheme) {
            document.body.removeAttribute('data-theme');
        }
    }, [systemTheme]);

    const handleClick = useCallback(() => {
        if (!document.body.getAttribute('data-theme')) {
            document.body.setAttribute('data-theme', systemTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);
        } else {
            document.body.removeAttribute('data-theme');
        }
    }, [systemTheme]);

    return (
        <IconButton onClick={ handleClick } className={ classes.root } classes={ { label: classes.label } }>
            <SunIcon className={ classes.icon } />
            <MoonIcon className={ classes.icon } />
        </IconButton>
    );
};

export default ThemeSwapper;
