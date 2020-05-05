import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import { useNextIntl } from '@moxy/next-intl';

import Select from '../select';

export const LanguageSelector = ({ className }) => {
    const { locales, locale, changeLocale } = useNextIntl();

    const handleChange = useCallback((event) =>
        changeLocale(event.target.value), [changeLocale]);

    return (
        <Select value={ locale.id } onChange={ handleChange } className={ className }>
            { locales.map(({ id, name }) => (
                <option key={ id } value={ id }>{ name }</option>
            )) }
        </Select>
    );
};

LanguageSelector.propTypes = {
    className: PropTypes.string,
};

export default LanguageSelector;
