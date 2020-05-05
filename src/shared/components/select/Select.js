import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Select.module.css';

export const Select = ({ children, bordered, className, ...props }) => (
    <div className={ classNames(styles.container, { [styles.bordered]: bordered }, className) }>
        <select className={ styles.select } { ...props }>
            { children }
        </select>
    </div>
);

Select.propTypes = {
    children: PropTypes.array.isRequired,
    className: PropTypes.string,
    bordered: PropTypes.bool,
};

export default Select;
