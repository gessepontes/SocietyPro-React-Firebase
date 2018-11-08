import { push } from "connected-react-router";
import { toastr } from 'react-redux-toastr'
import { database } from "../utils/firebase-config";

import {
    FIELD_ITEM_FETCHED, FIELD_ITEM_DELETE,
    ADD_FIELD_ITEM, EDIT_FIELD_ITEM, FIELD_ITEM_INITIAL_VALUES
} from '../constant/field-item'

const INITIAL_VALUES = { list: {}, fielditem: null }

export const getList = () => async dispatch => {
    database.ref(`fielditem/${localStorage.fieldid}`).on("value", snapshot => {
        dispatch({
            type: FIELD_ITEM_FETCHED,
            payload: snapshot.val()
        });

        dispatch(push(`/field-item-list/`));
    });
};

export const getById = (key, callback) => async dispatch => {
    let newData = {};
    var starCountRef = database.ref(`fielditem/${localStorage.fieldid}/${key}`);
    starCountRef.on('value', function (snapshot) {
        newData = snapshot.val();
    });
    return callback(newData);
};

export const add = values => async dispatch => {
    database.ref(`fielditem/${localStorage.fieldid}/`).push().set(values)
        .then(resp => {

            dispatch({
                type: ADD_FIELD_ITEM,
                payload: resp
            });

            toastr.success('Sucesso', 'Operação Realizada com sucesso.')
            dispatch(push("/field-item-list"));
        })
        .catch(e => {
            toastr.error('Erro', 'Erro ao realizar a operação')
        })
};

export const update = (values, key) => async dispatch => {
    database.ref(`fielditem/${localStorage.fieldid}/${key}`).set(values)
        .then(resp => {

            dispatch({
                type: EDIT_FIELD_ITEM,
                payload: resp
            });

            toastr.success('Sucesso', 'Operação Realizada com sucesso.')
            dispatch(push("/field-item-list"));
        })
        .catch(e => {
            toastr.error('Erro', 'Erro ao realizar a operação')
        });
};

export const remove = id => async dispatch => {
    database.ref(`fielditem/${localStorage.fieldid}/${id}`).remove()
        .then(resp => {
            dispatch({
                type: FIELD_ITEM_DELETE,
                payload: resp
            });

            toastr.success('Sucesso', 'Operação Realizada com sucesso.')
        })
        .catch(e => {
            toastr.error('Erro', 'Erro ao realizar a operação')
        });
};

export const fielditem = key => async dispatch => {
    dispatch(push(`/field-item/${key}`));
}

export function init() {
    return (dispatch) => {
        dispatch({ type: FIELD_ITEM_INITIAL_VALUES, payload: INITIAL_VALUES })
        dispatch(push("/field-item"));
    }
}



