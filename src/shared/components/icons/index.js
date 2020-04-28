import React, { forwardRef } from 'react';

import Icon from '@moxy/react-icon';

/* SVGs */
const crossSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/cross.inline.svg');
const magnifierSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/magnifier.inline.svg');

/* Icons */
const CrossIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ crossSvg } />);
const MagnifierIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ magnifierSvg } />);

export {
    CrossIcon,
    MagnifierIcon,
};
