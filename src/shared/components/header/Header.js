import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Link from 'next/link';
import SearchBar from '../search-bar';

import styles from './Header.module.css';

export const Header = ({ className }) => (
    <header className={ classNames(styles.container, className) }>
        <div className={ styles.content }>
            <Link href="/">
                <a className={ styles.title }>
                    Tabter
                </a>
            </Link>
            <SearchBar className={ styles.search } />
        </div>
    </header>
);

Header.propTypes = {
    className: PropTypes.string,
};

export default Header;