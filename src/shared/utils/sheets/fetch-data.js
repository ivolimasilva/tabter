import fetch from 'isomorphic-unfetch';

const GOOGLE_VIZ_REGEX = /google\.visualization\.Query\.setResponse\((.*)\);/;

export const fetchData = async (sheet, page) => {
    const response = await fetch(`https://docs.google.com/spreadsheets/d/${sheet}/gviz/tq?gid=${page}`);
    const text = await response.text();

    const table = JSON.parse(text.match(GOOGLE_VIZ_REGEX)[1]).table;

    const headings = table.cols.filter((col) => !!col.label).map((col) => col.label);
    const rows = table.rows.map(({ c }) =>
        headings.reduce((acc, heading, index) => {
            acc[heading] = c[index].v;

            return acc;
        }, {}));

    return {
        headings,
        rows,
    };
};

export default fetchData;
