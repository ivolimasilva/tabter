import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import SheetsContext from './SheetsContext';

import { getInfoFromSheetsUrl } from '../../utils';

export const SheetsProvider = ({ children }) => {
    const [ids, setIds] = useState({ sheetId: null, pageId: null });

    const value = useMemo(() => ({
        setSheetsUrl: async (url) => {
            const { sheetId, pageId } = getInfoFromSheetsUrl(url);

            setIds({ sheetId, pageId });

            const res = await fetch(`https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?gid=${pageId}`);

            console.log(res.body);

            const text = await res.text();

            console.log(text);

            const re = /google\.visualization\.Query\.setResponse\((.*)\);/;

            console.log('json', JSON.parse(text.match(re)[1]));
        },
    }), []);

    return (
        <SheetsContext.Provider value={ value }>
            { children }
        </SheetsContext.Provider>
    );
};

SheetsProvider.propTypes = {
    children: PropTypes.node,
};

export default SheetsProvider;
