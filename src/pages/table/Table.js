import React from 'react';
import PropTypes from 'prop-types';

import { fetchData, convertToKey } from '../../shared/utils';

export const Table = ({ headings, rows }) => (
    <table>
        <thead>
            <tr>
                { headings.map((heading, index) => (
                    <th key={ convertToKey(heading, index) }>{ heading }</th>
                ))}
            </tr>
        </thead>
        <tbody>
            { rows.map((row, index) => (
                <tr key={ convertToKey('row', index) }>
                    { row.map((property, propertyIndex) => (
                        <td key={ convertToKey(`row_${index}`, propertyIndex) }>{ Object.values(property)[0] }</td>
                    )) }
                </tr>
            ))}
        </tbody>
    </table>
);

Table.propTypes = {
    headings: PropTypes.array,
    rows: PropTypes.array,
};

Table.getInitialProps = ({ query: { sheet, page } }) =>
    fetchData(sheet, page);

export default Table;
