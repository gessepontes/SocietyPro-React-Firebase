import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

class DialogComponent extends Component {
    render() {
        const { open, onClose, onClick, text } = this.props

        return (
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{text ? text : "Você deseja excluir esse registro?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Não
                    </Button>
                    <Button onClick={onClick} variant="contained" color="primary" autoFocus>
                        Sim
                    </Button>
                </DialogActions>
            </Dialog>

        )
    }
}

export default (DialogComponent);