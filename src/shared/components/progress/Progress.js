import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Progress.module.css';

export const Progress = forwardRef(({ className, ...props }, ref) => (
    <svg ref={ ref } viewBox="22 22 44 44" className={ classNames(styles.svg, className) } { ...props }>
        <circle className={ styles.circle } cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" />
    </svg>
));

Progress.propTypes = {
    className: PropTypes.string,
};

export default Progress;
