import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Select from '../select';
import { SearchPlusIcon } from '../icons';

import { convertToKey } from '../../utils';

import styles from './Filters.module.css';

export const Filters = ({ filters, className }) => {
    if (!filters.length) {
        return (
            <div className={ classNames(styles.zero, className) }>
                <p>
                    You have no filters selected. Click on a <SearchPlusIcon className={ styles.icon } /> to add a filter.
                </p>
            </div>
        );
    }

    return (
        <div className={ classNames(styles.container, className) }>
            { filters.map((filter, index) => (
                <div key={ convertToKey(`filter_${filter}`, index) } className={ styles.filter }>
                    { filter }
                    <Select bordered>
                        { ['foo'].map((option, index) => (
                            <option key={ convertToKey(`option_${option}`, index) }>
                                { option }
                            </option>
                        )) }
                    </Select>
                </div>
            )) }
        </div>
    );
};

Filters.propTypes = {
    filters: PropTypes.array,
    className: PropTypes.string,
};

export default Filters;
