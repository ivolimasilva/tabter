import React from 'react';
import PropTypes from 'prop-types';

import { withNextIntlSetup } from '@moxy/next-intl';
import { LayoutTree } from '@moxy/next-layout';
import { MainLayout } from '../shared/layouts';
import { SheetsProvider } from '../shared/contexts';

import nextIntlConfig from '../../intl';

export const App = ({ Component, pageProps }) => (
    <SheetsProvider>
        <LayoutTree
            Component={ Component }
            pageProps={ pageProps }
            defaultLayout={ <MainLayout /> } />
    </SheetsProvider>
);

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object,
};

export default withNextIntlSetup(nextIntlConfig)(App);
