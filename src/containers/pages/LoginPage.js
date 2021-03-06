import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { signInWithEmailAndPassword } from "../../actions/auth";

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class LoginPage extends Component {

  state = {
    data: {
      email: "",
      senha: ""
    },
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {    
    this.props.signInWithEmailAndPassword(this.state.data);
  };

  render() {

    const isInvalid =
      this.state.data.senha === '' ||
      this.state.data.email === '';

    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Sign in</Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input id="email" name="email" autoComplete="email" onChange={this.onChange} autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="senha">Senha</InputLabel>
                <Input
                  name="senha"
                  type="password"
                  id="senha"
                  onChange={this.onChange}
                  autoComplete="current-senha"
                />
              </FormControl>
              <Button
                fullWidth
                variant="raised"
                color="primary"
                disabled={isInvalid}
                onClick={this.onSubmit}
                className={classes.submit}
              >
                Login
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styledComponent = withStyles(styles)(LoginPage);

export default connect(null, { signInWithEmailAndPassword })(styledComponent);

