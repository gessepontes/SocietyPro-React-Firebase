import { push } from "connected-react-router";
import { toastr } from 'react-redux-toastr'
import { database } from "../utils/firebase-config";

import {
    FIELD_FETCHED, FIELD_ID_FETCHED,
    FIELD_TIME, ADD_FIELD, EDIT_FIELD, FIELD_INITIAL_VALUES
} from '../constant/field'


import {
    FIELD_ITEM_FETCHED
} from '../constant/field-item'

const INITIAL_VALUES = { list: {}, field: null }

export const getList = () => async dispatch => {
    database.ref(`field/`).on("value", snapshot => {
        dispatch({
            type: FIELD_FETCHED,
            payload: snapshot.val()
        });
    });
};


export const showDetails = (key) => async dispatch => {
    database.ref(`field/${key}`).on("value", snapshot => {
        dispatch({
            type: FIELD_ID_FETCHED,
            payload: snapshot.val()
        });

        dispatch(push("/field"));
    });
};

export const showTime = (key) => async dispatch => {
    database.ref(`field/${key}`).on("value", snapshot => {
        dispatch({
            type: FIELD_TIME,
            payload: snapshot.val()
        });
    });

    var ref = database.ref(`fielditem/${key}`);
    ref.orderByChild("disponivel").equalTo(true).on("value", function (snapshot) {
        dispatch({
            type: FIELD_ITEM_FETCHED,
            payload: snapshot.val()
        });
    });


    dispatch(push("/field-time"));
};

export const getById = (key, callback) => async dispatch => {
    let newData = {};
    var starCountRef = database.ref(`field/${key}`);
    starCountRef.on('value', function (snapshot) {
        newData = snapshot.val();
    });
    return callback(newData);
};

export const add = values => async dispatch => {
    database.ref(`field/`).push().set(values)
        .then(resp => {

            dispatch({
                type: ADD_FIELD,
                payload: resp
            });

            toastr.success('Sucesso', 'Operação Realizada com sucesso.')
            dispatch(push("/field-list"));
        })
        .catch(e => {
            toastr.error('Erro', 'Erro ao realizar a operação')
        })
};

export const update = (values, key) => async dispatch => {
    database.ref(`field/${key}`).set(values)
        .then(resp => {

            dispatch({
                type: EDIT_FIELD,
                payload: resp
            });

            toastr.success('Sucesso', 'Operação Realizada com sucesso.')
            dispatch(push("/field-list"));
        })
        .catch(e => {
            toastr.error('Erro', 'Erro ao realizar a operação')
        });
};

export function init() {
    return (dispatch) => {
        dispatch({ type: FIELD_INITIAL_VALUES, payload: INITIAL_VALUES })
        dispatch(push("/field-add"));
    }
}

// const BASE_URL = 'http://localhost:53487/api'

// export function getList() {
//     return (dispatch) => {
//         axios.get(`${BASE_URL}/field/`)
//             .then(response => dispatch({ type: FIELD_FETCHED, payload: response }))
//             .catch(e => {
//                 toastr.error('Erro', 'Erro ao realizar a operação')
//             })
//     }
// }

// export function showDetails(value) {
//     return (dispatch) => {
//         axios.get(`${BASE_URL}/field/${value.id}`)
//             .then(response => {
//                 dispatch({ type: FIELD_ID_FETCHED, payload: response })
//                 dispatch(push("/field"));
//             })
//             .catch(e => {
//                 toastr.error('Erro', 'Erro ao realizar a operação')
//             })
//     }
// }

// export function showTime(value) {
//     return (dispatch) => {
//         axios.get(`${BASE_URL}/field/${value.id}`)
//             .then(response => {
//                 dispatch({ type: FIELD_TIME, payload: response })
//                 dispatch(push("/field-time"));
//             })
//             .catch(e => {
//                 toastr.error('Erro', 'Erro ao realizar a operação')
//             })
//     }
// }



