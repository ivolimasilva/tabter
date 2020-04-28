import React, { forwardRef } from 'react';

import Icon from '@moxy/react-icon';

/* SVGs */
const searchSvg = import(/* webpackChunkName: "svg-sprite" */ '../../media/icons/search.inline.svg');

/* Icons */
const SearchIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ searchSvg } />);

export {
    SearchIcon,
};
