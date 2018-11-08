import { push } from "connected-react-router";
import { toastr } from 'react-redux-toastr'
import { database } from "../utils/firebase-config";

import {
    TEAM_INITIAL_VALUES, GET_TEAM,
    EDIT_TEAM, ADD_TEAM,
    DELETE_TEAM
} from '../constant/team'

const INITIAL_VALUES = { list: {}, team: null }

export const add = values => async dispatch => {
    database.ref(`team/${localStorage.personid}`).push(values)
        .then(resp => {

            let value;

            database.ref(`team/${localStorage.personid}`).once("value", snapshot => {
                snapshot.forEach(function (child) {
                    if (child.key === resp.key) {
                        value = child.val()
                        localStorage.teamid = child.key;
                        child.ref.update({ ativo: true });
                    } else {
                        child.ref.update({ ativo: false });
                    }
                });
            })

            var ref = database.ref(`person`);
            ref.orderByChild("uid").equalTo(localStorage.uid).once("value", function (snapshot) {
                snapshot.forEach(function (child) {
                    child.ref.update({ timeAtivo: value.nome });
                });
            });

            dispatch({
                type: ADD_TEAM,
                payload: resp
            });

            toastr.success('Sucesso', 'Operação Realizada com sucesso.')
            dispatch(push("/team-list"));
        })
        .catch(e => {
            toastr.error('Erro', 'Erro ao realizar a operação')
        })
};

export const update = (values, key) => async dispatch => {
    database.ref(`team/${localStorage.personid}/${key}`).set(values)
        .then(resp => {

            dispatch({
                type: EDIT_TEAM,
                payload: resp
            });

            if (values.ativo) {
                var ref = database.ref(`person`);
                ref.orderByChild("uid").equalTo(localStorage.uid).once("value", function (snapshot) {
                    snapshot.forEach(function (child) {
                        child.ref.update({ timeAtivo: values.nome });
                    });
                });
            }

            toastr.success('Sucesso', 'Operação Realizada com sucesso.')
            dispatch(push("/team-list"));
        })
        .catch(e => {
            toastr.error('Erro', 'Erro ao realizar a operação')
        });
};

export const status = (key, callback) => async dispatch => {

    let value;

    database.ref(`team/${localStorage.personid}`).once("value", snapshot => {
        snapshot.forEach(function (child) {
            if (child.key === key) {
                value = child.val()
                localStorage.teamid = child.key;
                child.ref.update({ ativo: true });
            } else {
                child.ref.update({ ativo: false });
            }
        });
    })

    var ref = database.ref(`person`);
    ref.orderByChild("uid").equalTo(localStorage.uid).once("value", function (snapshot) {
        snapshot.forEach(function (child) {
            child.ref.update({ timeAtivo: value.nome });
        });
    });

    return callback(value);
};

export const remove = id => async dispatch => {
    database.ref(`team/${localStorage.personid}/${id}`).remove()
        .then(resp => {
            dispatch({
                type: DELETE_TEAM,
                payload: resp
            });

            toastr.success('Sucesso', 'Operação Realizada com sucesso.')
        })
        .catch(e => {
            toastr.error('Erro', 'Erro ao realizar a operação')
        });
};

export const team = key => async dispatch => {
    dispatch(push(`team/${key}`));
}

export const getById = (key, callback) => async dispatch => {
    let newData = {};
    var starCountRef = database.ref(`team/${localStorage.personid}/${key}`);
    starCountRef.on('value', function (snapshot) {
        newData = snapshot.val();
    });
    return callback(newData);
};

export const getall = () => async dispatch => {
    database.ref(`team/${localStorage.personid}`).on("value", snapshot => {
        dispatch({
            type: GET_TEAM,
            payload: snapshot.val()
        });
    });
};

export function init() {
    return (dispatch) => {
        dispatch({ type: TEAM_INITIAL_VALUES, payload: INITIAL_VALUES })
        dispatch(push("/team"));
    }
}