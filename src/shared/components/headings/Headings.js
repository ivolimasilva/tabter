import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { SearchPlusIcon } from '../icons';

import { convertToKey } from '../../utils';

import styles from './Headings.module.css';

export const Headings = ({ headings, filters, onAddFilterClick }) => (
    <thead>
        <tr>
            { headings.map(({ value }, index) => (
                <th key={ convertToKey(value, index) } className={ styles.heading }>
                    { value }
                    <button
                        data-heading={ value }
                        onClick={ onAddFilterClick }
                        className={ classNames(styles.add, { [styles.hidden]: filters.includes(value) }) }>
                        <SearchPlusIcon className={ styles.icon } />
                    </button>
                </th>
            ))}
        </tr>
    </thead>
);

Headings.propTypes = {
    headings: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            options: PropTypes.arrayOf(PropTypes.any).isRequired,
        }).isRequired,
    ).isRequired,
    filters: PropTypes.array.isRequired,
    onAddFilterClick: PropTypes.func.isRequired,
};

export default Headings;
