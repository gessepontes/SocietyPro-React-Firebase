import React, { Component } from 'react'

import {
    IconButton
} from '@material-ui/core'

import { connect } from 'react-redux'

import { fetchUser, signOut } from '../actions/auth'
import { person } from '../actions/person'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { withStyles } from '@material-ui/core/styles'

import MoreVertIcon from '@material-ui/icons/MoreVert';
import { compose } from 'recompose'


import { withRouter } from 'react-router'

const styles = theme => ({
    logout: {
        marginLeft: 'auto'
    }
})


class LogOut extends Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    signOut = () => {
        this.setState({ anchorEl: null });
        this.props.signOut();
    }

    person = () => {
        this.setState({ anchorEl: null });
        this.props.person();
    }

    componentWillMount() {
        this.props.fetchUser();
    }


    render() {
        const { classes } = this.props

        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                <IconButton
                    color="inherit"
                    aria-label="More"
                    aria-owns={open ? 'long-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    className={classes.logout}>
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleClose}
                >
                    <MenuItem  onClick={() => this.person()}>
                        <ListItemIcon>
                        <AccountCircle />
                        </ListItemIcon>
                        <ListItemText inset primary="Usuário" />
                    </MenuItem>
                    <MenuItem onClick={() => this.signOut()}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="Sair" />
                    </MenuItem>
                </Menu>
            </div>

        )
    }
}

export default compose(
    connect(null, { fetchUser, signOut, person }),
    withStyles(styles),
    withRouter,
)(LogOut)

