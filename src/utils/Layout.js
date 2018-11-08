import React, { Component, Fragment } from 'react'

import {
  AppBar, Toolbar, IconButton, Typography, Hidden,
  Drawer, CssBaseline
} from '@material-ui/core'


import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu';
import { compose } from 'recompose'
import Messages from '../components/Messages';
import MenuComponent from '../components/MenuComponent'
import { withRouter } from 'react-router'

import LogOut from '../routes/LogOut'
import TitleComponent from '../components/TitleComponent';

const drawerWidth = 240

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  logout: {
    marginLeft: 'auto'
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit,
  },
  maps: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 0,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
})

class Layout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      anchorEl: null,
      title: "SocietyPro"
    };


  }


  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  getRoute() {
    return this.props.location.pathname === "/field" || this.props.location.pathname === "/field-time";
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, children } = this.props
    const { mobileOpen } = this.state

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <MenuComponent onClick={() => this.handleDrawerToggle()} />
      </div>
    );


    return <Fragment>
      <CssBaseline />
      <div className={classes.root}>

        {localStorage.uid &&
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => this.handleDrawerToggle()}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                <TitleComponent page={this.props.location.pathname} />
              </Typography>

              <div style={{ marginLeft: 'auto' }} >
                <LogOut />
              </div>

            </Toolbar>
          </AppBar>
        }

        <Hidden mdUp>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>

        {!this.getRoute() ? (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
          </main>
        ) : (
            <main className={classes.maps}>
              <div className={classes.toolbar} />
              {children}
            </main>
          )}

        <Messages />
      </div>
    </Fragment>
  }
}

export default compose(
  withStyles(styles),
  withRouter,
)(Layout)

