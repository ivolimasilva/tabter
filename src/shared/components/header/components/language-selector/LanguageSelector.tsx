import React, { Fragment, useState, useCallback, FunctionComponent } from 'react';
import { useNextIntl } from '@moxy/next-intl';

import { Button, Menu, MenuItem } from '@material-ui/core';
import { Translate as TranslateIcon, KeyboardArrowDown as KeyboardArrowDownIcon } from '@material-ui/icons';

import { convertToKey } from '../../../../utils';

type Locale = {
    id: string;
    name: string;
};

export const LanguageSelector: FunctionComponent = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { locales, locale, changeLocale } = useNextIntl();

    const handleButtonClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleMenuItemClick = useCallback((event) => {
        changeLocale(event.target.getAttribute('data-locale'));
        setAnchorEl(null);
    }, [changeLocale]);

    return (
        <Fragment>
            <Button
                onClick={ handleButtonClick }
                aria-haspopup="true"
                aria-label="Change language"
                startIcon={ <TranslateIcon /> }
                endIcon={ <KeyboardArrowDownIcon /> }>
                { locale.name }
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={ anchorEl }
                open={ Boolean(anchorEl) }
                onClose={ handleClose }>
                { locales.map((locale: Locale, index: number) => (
                    <MenuItem
                        onClick={ handleMenuItemClick }
                        data-locale={ locale.id }
                        key={ convertToKey(locale.id, index) }>
                        { locale.name }
                    </MenuItem>
                ))}
            </Menu>
        </Fragment>
    );
};

export default LanguageSelector;
