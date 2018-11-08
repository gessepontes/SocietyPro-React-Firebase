import React from "react";
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getById, update, add } from '../../actions/player'

import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import PosicaoList from '../../utils/Posicao'
import imageUrl from '../../img/foto.png'
import { withRouter } from "react-router-dom";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    input: {
        display: 'none',
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
});

function validate(nome, rg, datanascimento) {
    // true means invalid, so our conditions got reversed
    return {
        nome: nome.length === 0,
        rg: rg.length === 0,
        datanascimento: datanascimento.length === 0
    };
}


class Player extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            id: 0, idtime: localStorage.idtime || 0, rg: '', nome: '', posicao: 0, datanascimento: '', telefone: '', dispensado: false, foto:imageUrl,
            touched: {
                nome: false,
                rg: false,
                datanascimento: false,
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

    fileChangedHandler = (event) => {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            this.setState({ foto: reader.result })
        }.bind(this);
    }

    handleSubmit = (evt) => {
        if (!this.canBeSubmitted()) {
            evt.preventDefault();
            return;
        }

        const value = {
            rg: this.state.rg,
            nome: this.state.nome,
            posicao: this.state.posicao,
            datanascimento: this.state.datanascimento,
            telefone: this.state.telefone,
            dispensado: this.state.dispensado,
            foto: this.state.foto
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
        const errors = validate(this.state.nome, this.state.rg, this.state.datanascimento);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    }

    render() {

        const { classes } = this.props;
        const { nome, rg, posicao, datanascimento, telefone, dispensado, foto } = this.state;

        const errors = validate(nome, rg, datanascimento);
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

                    <Grid item xs={12} sm={3}>
                        <TextField
                            error={shouldMarkError('rg') ? true : false}
                            onBlur={this.handleBlur('rg')}
                            required
                            fullWidth
                            id="rg"
                            label="Rg"
                            margin="normal"
                            value={rg}
                            onChange={this.handleChange('rg')}
                        />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <TextField
                            select
                            fullWidth
                            label="Posição"
                            margin="normal"
                            value={posicao}
                            onChange={this.handleChange('posicao')}
                        >
                            {PosicaoList.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            error={shouldMarkError('datanascimento') ? true : false}
                            onBlur={this.handleBlur('datanascimento')}
                            required
                            fullWidth
                            id="datanascimento"
                            label="Data de Nascimento"
                            margin="normal"
                            type='date'
                            onChange={this.handleChange('datanascimento')}
                            value={datanascimento}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            id="telefone"
                            label="Telefone"
                            margin="normal"
                            onChange={this.handleChange('telefone')}
                            value={telefone}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={dispensado}
                                    onChange={this.handleChangeChecked('dispensado')}
                                    value="dispensado"
                                    color="primary"
                                />
                            }
                            label="Dispensado"
                        />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            name="contained-button-file"
                            type="file"
                            onChange={this.fileChangedHandler}
                        />

                        <label htmlFor="contained-button-file">
                            <ButtonBase variant="contained" component="span"
                                focusRipple
                                key={foto}
                                className={classes.image}
                                focusVisibleClassName={classes.focusVisible}
                                style={{
                                    width: '100%',
                                }}
                            >
                                <span
                                    className={classes.imageSrc}
                                    style={{
                                        backgroundImage: `url(${foto})`,
                                    }}
                                />
                                <span className={classes.imageBackdrop} />
                                <span className={classes.imageButton}>
                                    <Typography
                                        component="span"
                                        variant="subheading"
                                        color="inherit"
                                        className={classes.imageTitle}
                                    >
                                        Foto
                                    <span className={classes.imageMarked} />
                                    </Typography>
                                </span>
                            </ButtonBase>
                        </label>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <Button onClick={this.handleSubmit} disabled={isDisabled} variant="contained" color="primary">Salvar</Button>
                        <Link to="/player-list" >
                            <Button>Cancelar</Button>
                        </Link>
                    </Grid>
                </Grid>
            </form>
        );
    }
}


const mapStateToProps = state => ({ player: state.player.player })
const mapDispatchToProps = dispatch => bindActionCreators({ getById, update, add }, dispatch)

export default compose(
    withStyles(styles, { withTheme: true }),
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(Player);