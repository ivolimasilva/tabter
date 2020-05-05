import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Headings, Filters } from '../../shared/components';

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

    return (
        <div className={ styles.container }>
            <Filters filters={ filters } className={ styles.filters } />
            <table className={ styles.table }>
                <Headings headings={ headings } filters={ filters } onAddFilterClick={ addFilter } />
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
    headings: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
};

Table.getInitialProps = ({ query: { sheet, page } }) =>
    fetchData(sheet, page);

export default Table;
