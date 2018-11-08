import axios from 'axios'
import { push } from "connected-react-router";
import { toastr } from 'react-redux-toastr'

import {
    CHAMPIONSHIP_FETCHED_PREINSCRIPTION, CHAMPIONSHIP_FETCHED_INSCRIPTION
} from '../constant/championship'

const BASE_URL = 'http://localhost:53487/api'

export function getPreInscription() {
    return (dispatch) => {
        axios.get(`${BASE_URL}/championship/getPreInscription`)
            .then(response => dispatch({ type: CHAMPIONSHIP_FETCHED_PREINSCRIPTION, payload: response }))
            .catch(e => {
                toastr.error('Erro', 'Erro ao realizar a operação')
            })
    }
}

export function getChampionshipInscription(value) {
    return (dispatch) => {
        axios.get(`${BASE_URL}/championship/getChampionshipInscription/${value}`)
            .then(response => dispatch({ type: CHAMPIONSHIP_FETCHED_INSCRIPTION, payload: response }))
            .catch(e => {
                toastr.error('Erro', 'Erro ao realizar a operação')
            })
    }
}


export function inscription(value) {
    return (dispatch) => {
        dispatch(push("/player-inscription"));
    }
}


