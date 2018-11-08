import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getChampionshipInscription, inscription } from '../../../actions/championship'
import { PIC_PATH } from '../../../constant/championship'
import ChampionshipList from '../../../components/ChampionshipList';

class PlayerInscriptionList extends Component {
    componentWillMount() {
        this.props.getChampionshipInscription(localStorage.idpessoa)
    }

    handleClick = () => {
        this.props.inscription(localStorage.idtime);
    };

    render() {
        return (
            <ChampionshipList
                onClick={() => this.handleClick()}
                list={this.props.list}
                pic_path={PIC_PATH} />
        )

    }

}

const mapStateToProps = state => ({ list: state.championship.listInscription })
const mapDispatchToProps = dispatch => bindActionCreators({ getChampionshipInscription, inscription }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInscriptionList);