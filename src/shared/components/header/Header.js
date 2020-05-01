import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Link from 'next/link';
import { TabterIcon } from '../icons';
import SearchBar from '../search-bar';
import Options from '../options';

import styles from './Header.module.css';

export const Header = ({ className }) => (
    <header className={ classNames(styles.container, className) }>
        <div className={ styles.content }>
            <Link href="/">
                <a className={ styles.title }>
                    <TabterIcon className={ styles.logo } />
                    Tabter
                </a>
            </Link>
            <SearchBar className={ styles.search } />
            <Options />
        </div>
    </header>
);

Header.propTypes = {
    className: PropTypes.string,
};

export default Header;
