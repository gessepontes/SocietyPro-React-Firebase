import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import _ from "lodash";

class ConfirmationDialogRaw extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: props.value,
    };
  }

  // TODO
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleEntering = () => {
    this.radioGroupRef.focus();
  };

  handleCancel = () => {
    this.props.onClose();
  };

  handleOk = () => {
    this.props.onClose(this.state.value);
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  renderRows() {
    const list = this.props.list;

    const listTeam = _.map(list, (bc, key) => {
      return <FormControlLabel value={key} key={key} control={<Radio />} label={bc.nome} />
    });

    if (!_.isEmpty(listTeam)) {
      return listTeam;
    } else {
      return (console.log("Não existe resgistro cadastrado."))
    }
  }

  render() {
    const { value, ...other } = this.props;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">Meus Times</DialogTitle>
        <DialogContent>
          <RadioGroup
            ref={ref => {
              this.radioGroupRef = ref;
            }}
            aria-label="Ringtone"
            name="ringtone"
            value={this.state.value}
            onChange={this.handleChange}
          >
            {this.renderRows()}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancelar
            </Button>
          <Button onClick={this.handleOk} color="primary">
            Ok
            </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func,
  value: PropTypes.string,
};

export default (ConfirmationDialogRaw);