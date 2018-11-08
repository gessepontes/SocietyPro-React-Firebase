import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import DialogComponent from '../../components/DialogComponent';
import BottomRightFAB from '../../components/BottomLeftFAB'

import Collapse from '@material-ui/core/Collapse';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Icon from '@material-ui/core/Icon';

import _ from "lodash";

import { getall, team, remove, init } from '../../actions/team'

class TeamList extends Component {

  state = {
    open: false,
    key: ''
  };

  handleClick = () => {
    this.props.init();
  };

  handleClickCollapse = (e) => {
    this.setState({ [e]: !this.state[e] });
  };

  handleClickUpdate = (value) => {
    this.props.team(value);
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

  componentWillMount() {
    this.props.getall();
  }

  renderRows() {
    const list = this.props.list;
    const toDos = _.map(list, (bc, key) => {
      return <div key={key}>
        <ListItem divider key={bc.id} dense button onClick={() => this.handleClickCollapse(key)}>
          <Avatar src={bc.simbolo} alt={bc.nome} />
          <ListItemText primary={bc.nome} />

          <ListItemSecondaryAction>
            {bc.ativo &&
              <Icon>check_circle</Icon>}

          </ListItemSecondaryAction>
        </ListItem>

        <Collapse key={key} component="li" in={this.state[key]} timeout="auto" unmountOnExit>
          <BottomNavigation
            showLabels
          >
            <BottomNavigationAction label="Editar" onClick={() => this.handleClickUpdate(key)} icon={<Icon color="primary">edit</Icon>} />
            <BottomNavigationAction label="Excluir" onClick={() => this.handleClickOpen(key)} icon={<Icon color="secondary">delete</Icon>} />
          </BottomNavigation>
        </Collapse>
      </div>;
    });
    if (!_.isEmpty(toDos)) {
      return toDos;
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

        <BottomRightFAB variant="fab" color='secondary' onClick={this.handleClick} />
        <DialogComponent open={this.state.open} onClose={this.handleClose} onClick={this.handleCloseYes} />
      </div>
    )
  }
}

const mapStateToProps = state => ({ list: state.team.list })
const mapDispatchToProps = dispatch => bindActionCreators({ getall, team, remove, init }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TeamList);


