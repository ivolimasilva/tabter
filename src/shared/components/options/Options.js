import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import LanguageSelector from '../language-selector';
import ThemeSelector from '../theme-selector';

import styles from './Options.module.css';

export const Options = ({ className }) => (
    <div className={ classNames(styles.container, className) }>
        <LanguageSelector className={ styles.language } />
        <ThemeSelector />
    </div>
);

Options.propTypes = {
    className: PropTypes.string,
};

export default Options;
