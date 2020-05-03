import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { SearchPlusIcon, SearchMinusIcon } from '../../shared/components';

import { fetchData, convertToKey } from '../../shared/utils';

import styles from './Table.module.css';

export const Table = ({ headings, rows }) => {
    const [filters, setFilters] = useState([]);

    const addFilter = useCallback((event) => {
        const heading = event.currentTarget.getAttribute('data-heading');

        setFilters((filters) => (filters.includes(heading) ?
            filters : [
                ...filters,
                heading,
            ]));
    }, []);

    const computeOptions = useCallback((property) =>
        [...new Set(rows.reduce((acc, element) => ([
            ...acc,
            element[property],
        ]), []))], [rows]);

    return (
        <div className={ styles.container }>
            <div className={ styles.filters }>
                { filters.map((filter, index) => (
                    <div key={ convertToKey(`filter_${filter}`, index) } className={ styles.filter }>
                        { filter }
                        <select className={ styles.filterInput }>
                            { computeOptions(filter).map((option, index) => (
                                <option key={ convertToKey(`option_${option}`, index) }>
                                    { option }
                                </option>
                            )) }
                        </select>
                    </div>
                )) }
            </div>
            <table className={ styles.table }>
                <thead>
                    <tr>
                        { headings.map((heading, index) => (
                            <th key={ convertToKey(heading, index) } className={ styles.heading }>
                                { heading }
                                <button
                                    data-heading={ heading }
                                    onClick={ addFilter }
                                    className={ classNames(styles.addFilter, { [styles.hidden]: filters.includes(heading) }) }>
                                    <SearchPlusIcon className={ styles.icon } />
                                </button>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={ styles.body }>
                    { rows.map((row, index) => (
                        <tr key={ convertToKey('row', index) } className={ styles.row }>
                            { Object.entries(row).map(([name, value]) => (
                                <td key={ convertToKey(name, index) }>{ value }</td>
                            )) }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

Table.propTypes = {
    headings: PropTypes.array,
    rows: PropTypes.array,
};

Table.getInitialProps = ({ query: { sheet, page } }) =>
    fetchData(sheet, page);

export default Table;
