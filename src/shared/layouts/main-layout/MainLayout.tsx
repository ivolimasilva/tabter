import React, { FunctionComponent, Fragment } from 'react';

import { Header } from '../../components';

export const MainLayout: FunctionComponent = ({ children }) => (
    <Fragment>
        <Header />
        <main>{children}</main>
    </Fragment>
);

export default MainLayout;
