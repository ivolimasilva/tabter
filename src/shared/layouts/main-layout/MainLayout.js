import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Header } from '../../components';

import styles from './MainLayout.module.css';

export const MainLayout = ({ children, className }) => (
    <Fragment>
        <Header className={ styles.header } />
        <main className={ classNames(styles.content, className) }>
            { children }
        </main>
        <footer className={ styles.footer }>
            Footer
        </footer>
    </Fragment>
);

MainLayout.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default MainLayout;
