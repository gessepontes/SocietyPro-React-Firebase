import React from "react";
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getById, update, add } from '../../actions/team'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import imageUrl from '../../img/simbolo.jpg'
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

function validate(nome, datafundacao) {
    return {
        nome: nome.length === 0,
        datafundacao: datafundacao.length === 0
    };
}

class Team extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            id: 0, nome: '', observacao: '', datafundacao: '', ativo: false, simbolo: imageUrl,
            touched: {
                nome: false,
                datafundacao: false,
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

    handleChangeSwitch = prop => event => {
        this.setState({ [prop]: event.target.checked });
    };

    fileChangedHandler = (event) => {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            this.setState({ simbolo: reader.result })
        }.bind(this);
    }

    handleSubmit = (evt) => {
        if (!this.canBeSubmitted()) {
            evt.preventDefault();
            return;
        }

        const value = {
            nome: this.state.nome,
            observacao: this.state.observacao,
            datafundacao: this.state.datafundacao,
            ativo: this.state.ativo,
            simbolo: this.state.simbolo
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
        const errors = validate(this.state.nome, this.state.datafundacao);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    }

    render() {

        const { classes } = this.props;
        const { nome, observacao, datafundacao, simbolo } = this.state;

        const errors = validate(nome, datafundacao);
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
                        <TextField
                            fullWidth
                            multiline
                            id="observacao"
                            label="Observação"
                            margin="normal"
                            value={observacao}
                            onChange={this.handleChange('observacao')}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            error={shouldMarkError('datafundacao') ? true : false}
                            onBlur={this.handleBlur('datafundacao')}
                            required
                            fullWidth
                            id="datafundacao"
                            label="Data de Fundação"
                            margin="normal"
                            type='date'
                            onChange={this.handleChange('datafundacao')}
                            value={datafundacao}
                            InputLabelProps={{
                                shrink: true,
                            }}
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
                                key={simbolo}
                                className={classes.image}
                                focusVisibleClassName={classes.focusVisible}
                                style={{
                                    width: '100%',
                                }}
                            >
                                <span
                                    className={classes.imageSrc}
                                    style={{
                                        backgroundImage: `url(${simbolo})`,
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
                                        simbolo
                                    <span className={classes.imageMarked} />
                                    </Typography>
                                </span>
                            </ButtonBase>
                        </label>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <Button onClick={this.handleSubmit} disabled={isDisabled} variant="contained" color="primary">Salvar</Button>
                        <Link to="/team-list" >
                            <Button>Cancelar</Button>
                        </Link>
                    </Grid>
                </Grid>
            </form>
        );
    }
}


const mapStateToProps = state => ({ team: state.team.payload })
const mapDispatchToProps = dispatch => bindActionCreators({ getById, update, add }, dispatch)

export default compose(
    withStyles(styles, { withTheme: true }),
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(Team);
