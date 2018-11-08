import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { init, fielditem, remove } from '../../actions/field-item'
import _ from "lodash";

import BottomRightFAB from '../../components/BottomLeftFAB'
import DialogComponent from '../../components/DialogComponent';

import Collapse from '@material-ui/core/Collapse';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import ScheduleIcon from '@material-ui/icons/Schedule';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

class FieldItemList extends Component {

    state = {
        open: false,
        key: ''
    };

    handleClickField = () => {
        this.props.init();
    };

    handleClick = (e) => {
        this.setState({ [e]: !this.state[e] });
    };

    handleClickUpdate = (value) => {
        this.props.fielditem(value);
    };

    handleClickOpen = (key) => {
        this.setState({ open: true, key });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleCloseYes = () => {
        this.props.remove(this.state.key);
        this.handleClose();
    };


    renderRows() {
        const list = _.map(this.props.list, (bc, key) => {
            return <div key={key}>

                <ListItem divider key={bc.nome} dense button onClick={() => this.handleClick(key)}>
                    <ListItemText
                        primary={bc.nome}
                        secondary={bc.disponivel ? 'Disponível para locação' : null}
                    />
                </ListItem>


                <Collapse key={key} component="li" in={this.state[key]} timeout="auto" unmountOnExit>
                    <BottomNavigation
                        showLabels
                    >
                        <BottomNavigationAction label="Editar" onClick={() => this.handleClickUpdate(key)} icon={<EditIcon color="primary" />} />
                        <BottomNavigationAction label="Horários" onClick={() => this.handleClickTime(key)} icon={<ScheduleIcon color="secondary" />} />
                        <BottomNavigationAction label="Horários Extra" onClick={() => this.handleClickScheduling(key)} icon={<ScheduleIcon />} />
                        <BottomNavigationAction label="Excluir" onClick={() => this.handleClickOpen(key)} icon={<DeleteIcon color="secondary" />} />
                    </BottomNavigation>
                </Collapse>
            </div>;
        });
        if (!_.isEmpty(list)) {
            return list;
        } else {
            return (<ListItem>
                <ListItemText primary="Não existe resgistro cadastrado." />
            </ListItem>)
        }
    }

    render() {
        return (
            <div>
                <List>
                    {this.renderRows()}
                </List>

                <BottomRightFAB variant="fab" color='secondary' onClick={this.handleClickField} />
                <DialogComponent open={this.state.open} onClose={this.handleClose} onClick={this.handleCloseYes} />
            </div>
        )
    }
}

const mapStateToProps = state => ({ list: state.fielditem.list })
const mapDispatchToProps = dispatch => bindActionCreators({ init, fielditem, remove }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FieldItemList);


