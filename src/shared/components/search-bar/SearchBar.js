import React, { useRef, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useIntl } from 'react-intl';

import { SheetsContext } from '../../contexts';
import { CrossIcon, MagnifierIcon } from '../icons';

import { GOOGLE_SHEETS_REGEX } from '../../variables';

import styles from './SearchBar.module.css';

export const SearchBar = ({ className }) => {
    const { formatMessage } = useIntl();

    const formRef = useRef();

    const { setSheetsUrl } = useContext(SheetsContext);

    const handleChange = useCallback(({ target: { value } }) => {
        if (value.match(GOOGLE_SHEETS_REGEX)) {
            setSheetsUrl(value);
        }
    }, [setSheetsUrl]);

    const toggleFocusClass = useCallback(() => {
        formRef.current.classList.toggle(styles.focused);
    }, []);

    return (
        <form ref={ formRef } className={ classNames(styles.container, className) }>
            <button className={ styles.searchButton }>
                <MagnifierIcon className={ styles.icon } />
            </button>
            <input
                type="text"
                className={ styles.input }
                placeholder={ formatMessage({ id: 'search.placeholder' }) }
                onChange={ handleChange }
                onFocus={ toggleFocusClass }
                onBlur={ toggleFocusClass } />
            <button className={ styles.clearButton }>
                <CrossIcon className={ styles.icon } />
            </button>
        </form>
    );
};

SearchBar.propTypes = {
    className: PropTypes.string,
};

export default SearchBar;
