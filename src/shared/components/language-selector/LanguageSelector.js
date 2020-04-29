import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import classNames from 'classnames';

import { useNextIntl } from '@moxy/next-intl';

import styles from './LanguageSelector.module.css';

export const LanguageSelector = ({ className }) => {
    const { locales, locale, changeLocale } = useNextIntl();

    const handleChange = useCallback((event) =>
        changeLocale(event.target.value), [changeLocale]);

    return (
        <div className={ classNames(styles.container, className) }>
            <select value={ locale.id } onChange={ handleChange } className={ styles.select }>
                { locales.map(({ id, name }) => (
                    <option key={ id } value={ id }>{ name }</option>
                )) }
            </select>
        </div>
    );
};

LanguageSelector.propTypes = {
    className: PropTypes.string,
};

export default LanguageSelector;
