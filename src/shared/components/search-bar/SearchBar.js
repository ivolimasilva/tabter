import React, { useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import { CrossIcon, MagnifierIcon } from '../icons';

import { getInfoFromSheetsUrl, createSheetsUrl } from '../../utils';
import { GOOGLE_SHEETS_REGEX } from '../../variables';

import styles from './SearchBar.module.css';

export const SearchBar = ({ className }) => {
    const formRef = useRef();
    const inputRef = useRef()
;
    const router = useRouter();

    const { formatMessage } = useIntl();

    const handleChange = useCallback(({ target: { value } }) => {
        if (value === '') {
            router.push('/');

            return;
        }

        if (value.match(GOOGLE_SHEETS_REGEX)) {
            const { sheetId, pageId } = getInfoFromSheetsUrl(value);

            router.push('/d/[sheet]/[page]', `/d/${sheetId}/${pageId}`);
        } else {
            router.push('/error');
        }
    }, [router]);

    useEffect(() => {
        const { route, query: { sheet, page } } = router;

        if (route === '/') {
            inputRef.current.value = '';

            return;
        }

        if (sheet && page) {
            inputRef.current.value = createSheetsUrl(sheet, page);
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
            <span className={ styles.searchButton }>
                <MagnifierIcon className={ styles.icon } />
            </span>
            <input
                required
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
