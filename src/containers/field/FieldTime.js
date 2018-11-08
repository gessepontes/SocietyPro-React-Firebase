import React, { Component, Fragment } from 'react'
import * as moment from 'moment';
import 'moment/locale/pt-br';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { showHorary, initHorary, create } from '../../actions/scheduling'

import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DialogComponent from '../../components/DialogComponent';

import _ from "lodash";

class FieldTime extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            scheduling: {
                data: '',
                idhorario: 0,
                idpessoa: 0,
                tipohorario: 0
            },
            selectedDay: new Date()
        }
    }

    componentWillMount() {
        this.props.initHorary()
    }

    handleClickOpen = (bc) => {
        this.setState({
            scheduling: {
                ...this.state.scheduling,
                data: moment(this.state.selectedDay).format('MM-DD-YYYY'),
                idhorario: bc.id,
                idpessoa: localStorage.idpessoa,
                tipohorario: bc.tipohorario,
            },
        });

        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleCloseYes = () => {
        this.props.create(this.state.scheduling);
        this.handleClose();
    };

    handleClick = (e) => {
        this.props.showHorary(e.id, moment(this.state.selectedDay).format('DD-MM-YYYY'));
    };

    renderRows() {

        // console.log(this.props.fielditem)
        const list = this.props.fielditem || []

        const field = _.map(list, (bc, key) => {
            return <div key={key}><Button key={key} onClick={() => this.handleClick(key)} variant="contained" color="secondary" style={{ margin: 5 }} >
                {`${bc.nome}`}
            </Button></div>
        });

        if (!_.isEmpty(field)) {
            return field;
        } else {
            return ""
        }
    }

    renderRowsScheduling() {
        const listHorary = this.props.horary || []

        return listHorary.map(bc => (
            <Button key={bc.id} disabled={bc.agendado} onClick={() => this.handleClickOpen(bc)} variant="contained" color="primary" style={{ margin: 3 }}>
                {bc.horario}
            </Button>
        ))
    }

    render() {

        // Render the Calendar
        var today = new Date();
        var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        return (
            <Fragment>
                <InfiniteCalendar
                    locale={{
                        locale: require('date-fns/locale/pt'),
                        headerFormat: 'dddd, D MMM',
                        weekdays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
                        blank: 'Nenhuma data selecionada',
                        todayLabel: {
                            long: 'Hoje',
                            short: 'Hoje.'
                        },
                    }}
                    width={(window.innerWidth <= 650) ? window.innerWidth : 650}
                    height={window.innerHeight - 350}
                    selected={this.state.selectedDay}
                    onSelect={date => {
                        this.setState({ selectedDay: date });
                        this.props.initHorary();
                    }}
                    minDate={lastWeek}
                    min={lastWeek}
                />
                <Grid container spacing={8} style={{ margin: 2 }}>
                    <Grid item xs={4}>
                        {this.renderRows()}
                    </Grid>

                    <Grid item xs={8}>
                        {this.renderRowsScheduling()}
                    </Grid>
                </Grid>

                <DialogComponent open={this.state.open} onClose={this.handleClose} onClick={this.handleCloseYes} text="Você deseja realizar o agendamento desse horário?" />
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    fielditem: state.fielditem.list,
    horary: state.scheduling.horary
})

const mapDispatchToProps = dispatch => bindActionCreators({ showHorary, initHorary, create }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FieldTime);
