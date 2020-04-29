import React, { forwardRef } from 'react';

import Icon from '@moxy/react-icon';

/* SVGs */
const crossSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/cross.inline.svg');
const magnifierSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/magnifier.inline.svg');
const moonSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/moon.inline.svg');
const sunSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/sun.inline.svg');

/* Icons */
const CrossIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ crossSvg } />);
const MagnifierIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ magnifierSvg } />);
const MoonIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ moonSvg } />);
const SunIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ sunSvg } />);

export {
    CrossIcon,
    MagnifierIcon,
    MoonIcon,
    SunIcon,
};
