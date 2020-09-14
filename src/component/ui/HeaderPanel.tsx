import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appbar: {
        backgroundColor: '#f0f8ff',
    },
    addButton: {
        color: '#4caf50',
    },
    title: {
        flexGrow: 1,
        paddingRight: '123px',
        color: '#003e53',
    },
    logo: {
        height: '60px',
    },
}));

export interface HeaderProps {
    onAddUser: any;
    userCount: string;
}

export default function HeaderPanel(props: HeaderProps) {
    const classes = useStyles();

    let title = `Users (${props.userCount})`;
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                    <img src="companylogo.png" alt="logo" className={classes.logo}/>
                     <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <IconButton edge="start"
                                className={classes.addButton}
                                color="inherit" aria-label="menu"
                                onClick={props.onAddUser}>
                        <AddCircleIcon fontSize="large"/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}
