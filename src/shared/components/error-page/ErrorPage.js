import React from 'react';
import PropTypes from 'prop-types';

export const ErrorPage = ({ message }) => (
    <div>
        { message }
    </div>
);

ErrorPage.propTypes = {
    message: PropTypes.string,
};

export default ErrorPage;
