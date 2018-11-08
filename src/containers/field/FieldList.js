import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ScheduleIcon from '@material-ui/icons/Schedule';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CheckIcon from '@material-ui/icons/Check';
import SyncIcon from '@material-ui/icons/Sync';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';

import { getList, showDetails, showTime, init } from '../../actions/field'
import { showScheduling } from '../../actions/scheduling'
import { getList as getListItem } from '../../actions/field-item'
import _ from "lodash";

import BottomRightFAB from '../../components/BottomLeftFAB'

class FieldList extends Component {

  state = {
    open: false
  };

  handleClickField = () => {
    this.props.init();
  };

  handleClick = (e) => {
    this.setState({ [e]: !this.state[e] });
  };

  handleClickDetails = (value) => {
    this.props.showDetails(value);
  };

  handleClickTime = (value) => {
    this.props.showTime(value);
  };

  handleClickScheduling = (value) => {
    this.props.showScheduling(value.id, localStorage.idpessoa);
  };

  handleClickItem = (value) => {
    localStorage.fieldid = value
    this.props.getListItem();
  };

  componentWillMount() {
    this.props.getList()
  }

  renderRows() {
    const list = _.map(this.props.list, (bc, key) => {
      return <div key={key}>

        <ListItem divider key={bc.nome} dense button onClick={() => this.handleClick(key)}>
          <Avatar src={bc.logo} alt={bc.nome} />
          <ListItemText primary={bc.nome} secondary={bc.telefone} />
        </ListItem>

        <Collapse key={key} component="li" in={this.state[key]} timeout="auto" unmountOnExit>
          <BottomNavigation
            showLabels
          >
            <BottomNavigationAction label="Localização" onClick={() => this.handleClickDetails(key)} icon={<LocationOnIcon color="primary" />} />
            <BottomNavigationAction label="Horários" onClick={() => this.handleClickTime(key)} icon={<ScheduleIcon color="secondary" />} />
            <BottomNavigationAction label="Agendamentos" onClick={() => this.handleClickScheduling(key)} icon={<CheckIcon />} />
            <BottomNavigationAction label="Item" onClick={() => this.handleClickItem(key)} icon={<SyncIcon color="primary" />} />
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
      </div>
    )
  }
}

const mapStateToProps = state => ({ list: state.field.list })
const mapDispatchToProps = dispatch => bindActionCreators({ getList, showDetails, showTime, showScheduling, getListItem, init }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FieldList);


