export const convertToKey = (str = '', index = 0) =>
    `${str.replace(' ', '_').toLowerCase()}-${index}`;
