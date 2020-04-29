import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import { CrossIcon, MagnifierIcon } from '../icons';

import { getInfoFromSheetsUrl } from '../../utils';
import { GOOGLE_SHEETS_REGEX } from '../../variables';

import styles from './SearchBar.module.css';

export const SearchBar = ({ className }) => {
    const formRef = useRef();
    const inputRef = useRef();
    const router = useRouter();
    const { formatMessage } = useIntl();

    const handleChange = useCallback(({ target: { value } }) => {
        console.log('Analyzing...', value);

        if (value.match(GOOGLE_SHEETS_REGEX)) {
            const { sheetId, pageId } = getInfoFromSheetsUrl(value);

            router.push('/d/[sheet]/[page]', `/d/${sheetId}/${pageId}`);
        }
    }, [router]);

    const toggleFocusClass = useCallback(() => {
        formRef.current.classList.toggle(styles.focused);
    }, []);

    const handleClearClick = useCallback((event) => {
        event.preventDefault();

        inputRef.current.value = '';
        router.push('/');
    }, [router]);

    return (
        <form ref={ formRef } className={ classNames(styles.container, className) }>
            <button className={ styles.searchButton }>
                <MagnifierIcon className={ styles.icon } />
            </button>
            <input
                ref={ inputRef }
                type="text"
                className={ styles.input }
                placeholder={ formatMessage({ id: 'search.placeholder' }) }
                onChange={ handleChange }
                onFocus={ toggleFocusClass }
                onBlur={ toggleFocusClass } />
            <button onClick={ handleClearClick } className={ styles.clearButton }>
                <CrossIcon className={ styles.icon } />
            </button>
        </form>
    );
};

SearchBar.propTypes = {
    className: PropTypes.string,
};

export default SearchBar;
