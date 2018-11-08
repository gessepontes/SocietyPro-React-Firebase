import { database } from "../utils/firebase-config";
import { push } from "connected-react-router";
import { toastr } from 'react-redux-toastr'

import { GET_PERSON, ADD_PERSON, EDIT_PERSON } from "../constant/person";

export const add = values => async dispatch => {
    database.ref(`person`).push(values)
        .then(resp => {

            localStorage.personid = resp.key

            dispatch({
                type: ADD_PERSON,
                payload: resp
            });

            toastr.success('Sucesso', 'Operação Realizada com sucesso.')
        })
        .catch(e => {
            toastr.error('Erro', 'Erro ao realizar a operação')
        })
};

export const update = (values, key) => async dispatch => {
    database.ref(`person/${key}`).set(values)
        .then(resp => {

            dispatch({
                type: EDIT_PERSON,
                payload: resp
            });

            toastr.success('Sucesso', 'Operação Realizada com sucesso.')
        })
        .catch(e => {
            toastr.error('Erro', 'Erro ao realizar a operação')
        });
};

// export const person = () => async dispatch => {
//     var ref = database.ref(`person`);
//     ref.orderByChild("useruid").equalTo(localStorage.useruid).on("value", function (snapshot) {
//         dispatch({
//             type: GET_PERSON_KEY,
//             payload: Object.keys(snapshot.val())[0]
//         });
//         dispatch(push("/person"));
//     });
// };

export const person = () => async dispatch => {
    database.ref(`person/${localStorage.personid}`).on("value", snapshot => {
        dispatch({
            type: GET_PERSON,
            payload: snapshot.val()
        });

        dispatch(push("/person"));
    });
}

export const getById = (key, callback) => async dispatch => {
    let newData = {};

    database.ref(`person/${key}`).on("value", snapshot => {
        newData = snapshot.val();
    });

    return callback(newData);
};



