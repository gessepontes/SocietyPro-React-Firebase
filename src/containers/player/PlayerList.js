import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';


import DialogComponent from '../../components/DialogComponent';
import BottomRightFAB from '../../components/BottomLeftFAB'
import CollapseModel from '../../components/CollapseModel';

import _ from "lodash";
import { getAll, player, remove, init } from '../../actions/player'

class PlayerList extends Component {

  state = {
    open: false,
    key: '',
    idtime: localStorage.idtime || 0
  };

  handleClick = () => {
    this.props.init();
  };

  handleClickCollapse = (e) => {
    this.setState({ [e]: !this.state[e] });
  };

  handleClickUpdate = (value) => {
    this.props.player(value);
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
    this.props.getAll();
  }

  renderRows() {
    const list = _.map(this.props.list, (bc, key) => {
      return <div key={key}>
        <ListItem divider key={bc.nome} dense button onClick={() => this.handleClickCollapse(key)}>
          <Avatar src={bc.foto} alt={bc.nome} />
          
          {(() => {
            switch (bc.dispensado) {
              case true: return <ListItemText primary={bc.nome} secondary='Dispensado' />;
              case false: return <ListItemText primary={bc.nome} secondary={bc.telefone} />;
              default: return <ListItemText primary={bc.nome} secondary={bc.telefone} />;
            }
          })()}
        </ListItem>

        <CollapseModel keyCollapse={key} open={this.state[key]}
          onClick={() => this.handleClickUpdate(key)}
          onClickDelete={() => this.handleClickOpen(key)}
          color="primary"
          colorDelete="secondary" />
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

        <BottomRightFAB variant="fab" color='secondary' onClick={this.handleClick} />
        <DialogComponent open={this.state.open} onClose={this.handleClose} onClick={this.handleCloseYes} />
      </div>
    )
  }
}

const mapStateToProps = state => ({ list: state.player.list })
const mapDispatchToProps = dispatch => bindActionCreators({ getAll, player, remove, init }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PlayerList);


