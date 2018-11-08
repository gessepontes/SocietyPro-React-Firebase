import { push } from "connected-react-router";
import { toastr } from 'react-redux-toastr'
import { database } from "../utils/firebase-config";

import { PLAYER_INITIAL_VALUES, GET_PLAYER, EDIT_PLAYER, ADD_PLAYER, DELETE_PLAYER } from '../constant/player'

const INITIAL_VALUES = { list: {}, player: null }

export const add = values => async dispatch => {
    database.ref(`player/${localStorage.teamid}`).push().set(values)
        .then(resp => {

            dispatch({
                type: ADD_PLAYER,
                payload: resp
            });

            toastr.success('Sucesso', 'Operação Realizada com sucesso.')
            dispatch(push("/player-list"));
        })
        .catch(e => {
            toastr.error('Erro', 'Erro ao realizar a operação')
        })
};

export const update = (values, key) => async dispatch => {
    database.ref(`player/${localStorage.teamid}/${key}`).set(values)
        .then(resp => {

            dispatch({
                type: EDIT_PLAYER,
                payload: resp
            });

            toastr.success('Sucesso', 'Operação Realizada com sucesso.')
            dispatch(push("/player-list"));
        })
        .catch(e => {
            toastr.error('Erro', 'Erro ao realizar a operação')
        });
};

export const remove = id => async dispatch => {
    database.ref(`player/${localStorage.teamid}/${id}`).remove()
        .then(resp => {
            dispatch({
                type: DELETE_PLAYER,
                payload: resp
            });

            toastr.success('Sucesso', 'Operação Realizada com sucesso.')
        })
        .catch(e => {
            toastr.error('Erro', 'Erro ao realizar a operação')
        });
};

export const player = key => async dispatch => {
    dispatch(push(`player/${key}`));
}

export const getById = (key, callback) => async dispatch => {
    let newData = {};
    var starCountRef = database.ref(`player/${localStorage.teamid}/${key}`);
    starCountRef.on('value', function (snapshot) {
        newData = snapshot.val();
    });
    return callback(newData);
};

export const getAll = () => async dispatch => {
    database.ref(`player/${localStorage.teamid}`).on("value", snapshot => {
        dispatch({
            type: GET_PLAYER,
            payload: snapshot.val()
        });
    });
};

export function init() {
    return (dispatch) => {
        dispatch({ type: PLAYER_INITIAL_VALUES, payload: INITIAL_VALUES })
        dispatch(push("/player"));
    }
}