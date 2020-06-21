import { Theme, makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        minWidth: 0,
        width: theme.typography.pxToRem(48),
        height: theme.typography.pxToRem(48),
    },
    label: {
        position: 'relative',
        height: '100%',
    },
    icon: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        height: '100%',
    },
    sun: {

    },
    moon: {

    },
}));

export default useStyles;
