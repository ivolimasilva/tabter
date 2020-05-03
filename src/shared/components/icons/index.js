import React, { forwardRef } from 'react';

import Icon from '@moxy/react-icon';

/* SVGs */
const crossSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/cross.inline.svg');
const magnifierSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/magnifier.inline.svg');
const moonSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/moon.inline.svg');
const searchMinusSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/search-minus.inline.svg');
const searchPlusSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/search-plus.inline.svg');
const sunSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/sun.inline.svg');
const tabterSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/tabter.inline.svg');

/* Icons */
const CrossIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ crossSvg } />);
const MagnifierIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ magnifierSvg } />);
const MoonIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ moonSvg } />);
const SearchMinusIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ searchMinusSvg } />);
const SearchPlusIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ searchPlusSvg } />);
const SunIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ sunSvg } />);
const TabterIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ tabterSvg } />);

export {
    CrossIcon,
    MagnifierIcon,
    MoonIcon,
    SearchMinusIcon,
    SearchPlusIcon,
    SunIcon,
    TabterIcon,
};
