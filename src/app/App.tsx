import React, { FunctionComponent, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { AppProps } from 'next/app';
import { withNextIntlSetup } from '@moxy/next-intl';
import { LayoutTree } from '@moxy/next-layout';

import nextIntlConfig from '../../intl';

const MainLayout: FunctionComponent = ({ children }) => (
    <main>{children}</main>
);

export const App = ({ Component, pageProps }: AppProps): ReactNode => (
    <LayoutTree Component={ Component } pageProps={ pageProps } defaultLayout={ <MainLayout /> } />
);

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object,
};

export default withNextIntlSetup(nextIntlConfig)(App);
