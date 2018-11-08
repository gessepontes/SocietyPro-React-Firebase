import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import Icon from '@material-ui/core/Icon';

import * as moment from 'moment';
import 'moment/locale/pt-br';
var QRCode = require('qrcode.react');

class FieldTicket extends Component {
    render() {

        const { ticket } = this.props

        return (
            <Fragment>

                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center" style={{ textAlign: 'center' }}
                >
                    <Grid item xs={6}>
                        <img src={ticket.logo} alt={ticket.local} style={{ height: 130, with: 130 }} />

                        <Typography align='center' variant="title" gutterBottom>
                            {ticket.local}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <QRCode value={`http://www.societypro.com.br/api/scheduling/GetTicket/${ticket.id}`} />
                    </Grid>
                </Grid>

                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{ textAlign: 'center', marginTop: 30 }}
                >
                    <Grid item xs={4}>
                        <IconButton>
                            <Icon style={{ fontSize: "larger" }}>monetization_on</Icon>
                        </IconButton>
                        <Typography variant="subheading" gutterBottom>{ticket.valor}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <IconButton>
                            <Icon style={{ fontSize: "larger" }}>calendar_today</Icon>
                        </IconButton>
                        <Typography variant="subheading" gutterBottom>{moment(ticket.data).format('DD/MM/YYYY')}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <IconButton>
                            <Icon style={{ fontSize: "larger" }}>alarm</Icon>
                        </IconButton>

                        <Typography variant="subheading" gutterBottom>{ticket.hora}</Typography>
                    </Grid>
                </Grid>

                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{ marginTop: 30 }}
                >
                    <Grid item xs={3}>
                        <IconButton>
                            <Icon style={{ fontSize: "larger" }}>place</Icon>
                        </IconButton>
                    </Grid>

                    <Grid item xs={9}>
                        <Typography variant="subheading" gutterBottom>Campo: {ticket.campo}</Typography>
                        <Typography variant="subheading" gutterBottom>{ticket.endereco}</Typography>
                        <Typography variant="subheading" gutterBottom>{ticket.telefone}</Typography>
                    </Grid>

                    <Grid item xs={3}>
                        <IconButton>
                            <Icon style={{ fontSize: "larger" }}>person</Icon>
                        </IconButton>
                    </Grid>

                    <Grid item xs={9}>
                        <Typography variant="subheading" gutterBottom>{ticket.pessoa}</Typography>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({ ticket: state.scheduling.ticket })
export default connect(mapStateToProps)(FieldTicket);