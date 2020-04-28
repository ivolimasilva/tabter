import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import { AppProps } from 'next/app';
import { withNextIntlSetup } from '@moxy/next-intl';
import { LayoutTree } from '@moxy/next-layout';

import nextIntlConfig from '../../intl';

// eslint-disable-next-line react/prop-types
const MainLayout: FunctionComponent = ({ children }) => (
    <main>{ children }</main>
);

export const App = ({ Component, pageProps }: AppProps) => (
    <LayoutTree Component={ Component } pageProps={ pageProps } defaultLayout={ <MainLayout /> } />
);

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object,
};

export default withNextIntlSetup(nextIntlConfig)(App);
