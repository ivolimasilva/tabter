import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useIntl } from 'react-intl';

import { SearchIcon } from '../icons';

import styles from './SearchBar.module.css';

export const SearchBar = ({ className }) => {
    const formRef = useRef();
    const { formatMessage } = useIntl();

    const toggleFocusClass = useCallback(() => {
        formRef.current.classList.toggle(styles.focused);
    }, []);

    return (
        <form ref={ formRef } className={ classNames(styles.container, className) }>
            <input
                type="text"
                className={ styles.input }
                placeholder={ formatMessage({ id: 'search.placeholder' }) }
                onFocus={ toggleFocusClass }
                onBlur={ toggleFocusClass } />
            <button className={ styles.searchButton }>
                <SearchIcon className={ styles.icon } />
            </button>
        </form>
    );
};

SearchBar.propTypes = {
    className: PropTypes.string,
};

export default SearchBar;
