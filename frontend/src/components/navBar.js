import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  tag:{
      color: 'white',
      display: 'inline',

  }
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            <Button color="inherit"><a href="/visualization" className={classes.tag}>visualization</a></Button>
            <Button color="inherit"><a href="/database" className={classes.tag}>Database</a></Button>
            <Button color="inherit"><a href="/modules" className={classes.tag}>Computations</a></Button>
            <Button color="inherit"><a href="/register" className={classes.tag}>Register User</a></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}