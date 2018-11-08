import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getPreInscription, inscription } from '../../../actions/championship'
import { PIC_PATH } from '../../../constant/championship'
import ChampionshipList from '../../../components/ChampionshipList';

class PreInscription extends Component {
    componentWillMount() {
        this.props.getPreInscription()
    }

    handleClick = () => {
        this.props.inscription(localStorage.idpessoa);
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

const mapStateToProps = state => ({ list: state.championship.listPreInscription })
const mapDispatchToProps = dispatch => bindActionCreators({ getPreInscription, inscription }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PreInscription);