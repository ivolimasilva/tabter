import React from 'react';
import PropTypes from 'prop-types';

import { withNextIntlSetup } from '@moxy/next-intl';
import { LayoutTree } from '@moxy/next-layout';
import { MainLayout } from '../shared/layouts';

import nextIntlConfig from '../../intl';

export const App = ({ Component, pageProps }) => (
    <LayoutTree
        Component={ Component }
        pageProps={ pageProps }
        defaultLayout={ <MainLayout /> } />
);

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object,
};

export default withNextIntlSetup(nextIntlConfig)(App);
