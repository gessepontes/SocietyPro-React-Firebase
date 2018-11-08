import React from "react";
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getById, update, add } from '../../actions/field-item'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { withRouter } from "react-router-dom";

function validate(nome) {
    return {
        nome: nome.length === 0
    };
}


class FieldItem extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            id: 0, nome: '', disponivel: false,
            touched: {
                nome: false
            },
        }
    }

    componentWillMount = () => {
        const { id } = this.props.match.params;
       
        if (!(id === undefined || !id)) {
            this.setState({ id });

            this.props.getById(id, (data) => this.setState({ ...data }));
        }
    };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleChangeChecked = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleSubmit = (evt) => {
        if (!this.canBeSubmitted()) {
            evt.preventDefault();
            return;
        }

        const value = {
            nome: this.state.nome,
            disponivel: this.state.disponivel,
        }

        if (this.state.id) {
            this.props.update(value, this.state.id)
        } else {
            this.props.add(value)
        }
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }

    canBeSubmitted() {
        const errors = validate(this.state.nome);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    }

    render() {
        const { nome, disponivel } = this.state;
        const errors = validate(nome);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];

            return hasError ? shouldShow : false;
        };

        return (           
            <form>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            error={shouldMarkError('nome') ? true : false}
                            onBlur={this.handleBlur('nome')}
                            required
                            fullWidth
                            autoFocus
                            id="nome"
                            label="Nome"
                            margin="normal"
                            value={nome}
                            onChange={this.handleChange('nome')}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={disponivel}
                                    onChange={this.handleChangeChecked('disponivel')}
                                    value="disponivel"
                                    color="primary"
                                />
                            }
                            label="Disponível para agendamento"
                        />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <Button onClick={this.handleSubmit} disabled={isDisabled} variant="contained" color="primary">Salvar</Button>
                        <Link to="/field-item-list" >
                            <Button>Cancelar</Button>
                        </Link>
                    </Grid>
                </Grid>
            </form>
        );
    }
}


const mapStateToProps = state => ({ player: state.player })
const mapDispatchToProps = dispatch => bindActionCreators({ getById, update, add }, dispatch)

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(FieldItem);