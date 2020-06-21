import React, { ReactNode, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppProps } from 'next/app';
import { withNextIntlSetup } from '@moxy/next-intl';
import { LayoutTree } from '@moxy/next-layout';
import { StylesProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { MainLayout } from '../shared/layouts';
import { ThemeProvider } from '../shared/theme';

import nextIntlConfig from '../../intl';

export const App = ({ Component, pageProps }: AppProps): ReactNode => {
    useEffect(() => {
        // Remove server side inject styles since <StyleProvider>
        // will inject the most updated and only needed styles
        const jssServerSide = document.head.querySelector('[id="jss-server-side"]');

        jssServerSide && document.head.removeChild(jssServerSide);
    }, []);

    return (
        <StylesProvider injectFirst>
            <ThemeProvider>
                <LayoutTree Component={ Component } pageProps={ pageProps } defaultLayout={ <MainLayout /> } />
            </ThemeProvider>
            <CssBaseline />
        </StylesProvider>
    );
};

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object,
};

export default withNextIntlSetup(nextIntlConfig)(App);
