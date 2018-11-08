import axios from 'axios'
import { database } from "../utils/firebase-config";
import { push } from "connected-react-router";
import { toastr } from 'react-redux-toastr'

import {
    SCHEDULING_HORARY, SCHEDULING_INITIAL_VALUES,
    SCHEDULING_SHOW, SCHEDULING_TICKET
} from '../constant/scheduling'

const BASE_URL = 'http://localhost:53487/api'
const INITIAL_VALUES = { horary: {} }


export const showHorary = (key, data) => async dispatch => {
    database.ref(`scheduling/${key}`).on("value", snapshot => {
        dispatch({
            type: SCHEDULING_HORARY,
            payload: snapshot.val()
        });
    });
};


// export function showHorary(id, data) {
//     return (dispatch) => {
//         axios.get(`${BASE_URL}/scheduling/GetHorary/${id}/${data}`)
//             .then(response => {
//                 dispatch({ type: SCHEDULING_HORARY, payload: response })
//                 dispatch(push("/field-time"));
//             })
//             .catch(e => {
//                 toastr.error('Erro', 'Erro ao realizar a operação')
//             })
//     }
// }

export function initHorary() {
    return (dispatch) => {
        dispatch({ type: SCHEDULING_INITIAL_VALUES, payload: INITIAL_VALUES })
    }
}

export function create(values) {
    console.log(values)
    return (dispatch) => {
        axios.post(`${BASE_URL}/scheduling/`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.')
                dispatch(push("/field-list"));
            })
            .catch(e => {
                toastr.error('Erro', 'Erro ao realizar a operação')
            })
    }
}

export function showScheduling(id, idPessoa) {
    return (dispatch) => {
        axios.get(`${BASE_URL}/scheduling/GetFieldScheduling/${id}/${idPessoa}`)
            .then(response => {
                dispatch({ type: SCHEDULING_SHOW, payload: response })
                dispatch(push("/field-schedules"));
            })
            .catch(e => {
                toastr.error('Erro', 'Erro ao realizar a operação')
            })
    }
}

export function cancel(values) {
    return (dispatch) => {
        axios.put(`${BASE_URL}/scheduling/PutCancel/`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.')
                dispatch(push("/field-list"));
            })
            .catch(e => {
                toastr.error('Erro', 'Erro ao realizar a operação')
            })
    }
}

export function showTicket(value) {
    return (dispatch) => {
        axios.get(`${BASE_URL}/scheduling/GetTicket/${value.id}`)
            .then(response => {
                dispatch({ type: SCHEDULING_TICKET, payload: response })
                dispatch(push("/field-ticket"));
            })
            .catch(e => {
                toastr.error('Erro', 'Erro ao realizar a operação')
            })
    }
}

