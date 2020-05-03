export const getInfoFromSheetsUrl = (url) => {
    const matches = url.match(/d\/(\w*)\/edit#gid=(\d+)/);

    console.log('matches', matches);

    return { sheetId: matches[1], pageId: matches[2] };
};
