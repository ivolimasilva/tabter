import React, { FunctionComponent } from 'react';

import { AppBar, Toolbar, Typography, InputBase } from '@material-ui/core';
import { Face as FaceIcon, Search as SearchIcon } from '@material-ui/icons';
import { LanguageSelector, ThemeSwapper } from './components';

import useStyles from './Header.styles';

export const Header: FunctionComponent = () => {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <FaceIcon className={ classes.faceIcon } />
                <Typography component="h1" variant="h6" noWrap>
                    Tabter
                </Typography>
                <div className={ classes.search }>
                    <div className={ classes.searchIcon }>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={ {
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        } }
                        inputProps={ { 'aria-label': 'search' } } />
                </div>
                <LanguageSelector />
                <ThemeSwapper />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
