import React from "react";
import compose from 'recompose/compose';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { update, getById, add } from '../../actions/person'
import { status, getall } from '../../actions/team'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import ConfirmationDialogRaw from './ConfirmationDialogRaw'
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

class Person extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            nome: '', email: '', time: 0, telefone: '', password: '', foto: imageUrl,
            open: false,
            timeAtivo: '',
            touched: {
                nome: false
            },
        }
    }

    handleClickListItem = () => {
        this.setState({ open: true });
    };

    handleClose = value => {
        if (value !== undefined) {
            this.props.status(value, (data) => {
                this.setState({ timeAtivo: data.nome })
            });

        }

        this.setState({ open: false })
    };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
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
        const value = {
            uid: localStorage.uid,
            nome: this.state.nome,
            email: this.state.email,
            telefone: this.state.telefone,
            foto: this.state.foto,
            timeAtivo: this.state.timeAtivo
        }

        this.props.update(value, localStorage.personid)
        //this.props.add(value)
    }

    componentWillMount = () => {
        //this.props.getById(this.props.personKey, (data) => this.setState({ ...data }));
        this.setState({ ...this.props.person })
        this.props.getall();
    };


    render() {

        const { classes, list } = this.props;
        const { nome, email, telefone, password, foto } = this.state;

        return (
            <form>
                <Grid container spacing={24}>
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


                    <Grid item xs={12} sm={6}>
                        <TextField
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
                            id="email"
                            label="Email"
                            margin="normal"
                            value={email}
                            onChange={this.handleChange('email')}
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
                        <ListItem
                            button
                            divider
                            aria-haspopup="true"
                            aria-controls="ringtone-menu"
                            aria-label="Time Ativo"
                            style={{ paddingLeft: 0 }}
                            onClick={this.handleClickListItem}
                        >
                            <ListItemText primary="Time Ativo" secondary={this.state.timeAtivo} />
                        </ListItem>
                        <ConfirmationDialogRaw
                            classes={{
                                paper: classes.paper,
                            }}
                            open={this.state.open}
                            onClose={this.handleClose}
                            value={this.state.timeAtivo}
                            list={list}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            type="password"
                            id="password"
                            label="Senha"
                            margin="normal"
                            onChange={this.handleChange('password')}
                            value={password}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <Button onClick={this.handleSubmit} variant="contained" color="primary">Salvar</Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}


const mapStateToProps = state => ({ person: state.person.payload, list: state.team.list })
const mapDispatchToProps = dispatch => bindActionCreators({ update, getById, getall, status, add }, dispatch)

export default compose(
    withStyles(styles, { withTheme: true }),
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(Person);