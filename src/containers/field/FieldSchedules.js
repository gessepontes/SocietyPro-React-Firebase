import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as moment from 'moment';
import 'moment/locale/pt-br';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Avatar from '@material-ui/core/Avatar';

import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';

import DialogComponent from '../../components/DialogComponent';

import { showTicket, cancel } from '../../actions/scheduling'

class FieldSchedules extends Component {

    state = {
        open: false,
        bc: ''
    };

    handleClickCollapse = (e) => {
        this.setState({ [e]: !this.state[e] });
    };

    handleClickDetails = (value) => {
        this.props.showTicket(value);
    };

    handleClickOpen = (bc) => {
        this.setState({ open: true, bc });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleCloseYes = () => {
        this.props.cancel(this.state.bc);
        this.handleClose();
    };

    renderRows() {
        const list = this.props.list || []
        return list.map((bc, index) => (
            <Fragment key={index}>
                <ListItem divider key={bc.id} dense button onClick={() => this.handleClickCollapse(index)}>
                    <Avatar src={bc.logo} alt={bc.nome} />
                    <ListItemText primary={'Campo: ' + bc.campo}
                        secondary={'Data: ' + moment(bc.data).format('DD/MM/YYYY')} />

                    <ListItemText primary={'R$: ' + bc.valor}
                        secondary={'Status: ' + bc.status} />
                </ListItem>

                <Collapse key={index} component="li" in={this.state[index]} timeout="auto" unmountOnExit>
                    <BottomNavigation
                        showLabels
                    >
                        <BottomNavigationAction label="Comprovante" onClick={() => this.handleClickDetails(bc)} icon={<CheckIcon color="primary" />} />
                        <BottomNavigationAction label="Cancelar Horário" onClick={() => this.handleClickOpen(bc)} icon={<CancelIcon color="secondary" />} />
                    </BottomNavigation>
                </Collapse>
            </Fragment>

        ))
    }


    render() {
        return (
            <div>
                <List>
                    {this.renderRows()}
                </List>

                <DialogComponent open={this.state.open} onClose={this.handleClose} onClick={this.handleCloseYes} text="Você deseja cancelar este agendamento?" />
            </div>
        )
    }
}

const mapStateToProps = state => ({ list: state.scheduling.scheduling })
const mapDispatchToProps = dispatch => bindActionCreators({ showTicket, cancel }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FieldSchedules);
