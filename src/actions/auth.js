import { auth, database } from "../utils/firebase-config";
import { push } from "connected-react-router";
import { toastr } from 'react-redux-toastr'

import { USER_LOGGED_IN, USER_LOGGED_OUT, FETCH_USER } from "../constant/auth";

// Sign Up
export const doCreateUserWithEmailAndPassword = (value) =>
    auth.createUserWithEmailAndPassword(value.email, value.senha);

// Sign In
export const signInWithEmailAndPassword = (value) => dispatch =>
    auth.signInWithEmailAndPassword(value.email, value.senha)
        .then((result) => {
            localStorage.uid = result.user.uid;

            var refPerson = database.ref(`person`);

            refPerson.orderByChild("uid").equalTo(localStorage.uid).once("value", function (snapshot) {
                localStorage.personid = Object.keys(snapshot.val())[0];

                var refTeam = database.ref(`team/${localStorage.personid}`);
                refTeam.orderByChild("ativo").equalTo(true).once("value", function (snapshot) {
                    localStorage.teamid = Object.keys(snapshot.val())[0];
                });
            });


            dispatch(userLoggedIn(result));
            dispatch(push("/dashboard"));
        }).catch(e => {
            console.log(e)
            toastr.error('Erro', 'Usuário ou senha inválido.')
        })

// Sign out
export const signOut = () => dispatch =>
    auth.signOut()
        .then(() => {
            localStorage.uid = ""
            localStorage.personid = "";
            localStorage.teamid = "";

            dispatch(userLoggedOut());
            dispatch(push("/login"));
        }).catch(e => {
            console.log(e)
            toastr.error('Erro', 'Usuário ou senha inválido.')
        })


// Password Reset
export const doPasswordReset = (email) =>
    auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) =>
    auth.currentUser.updatePassword(password);

export const userLoggedIn = user => ({
    type: USER_LOGGED_IN,
    user
});

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
});

export const fetchUser = () => dispatch => {
    auth.onAuthStateChanged(user => {
        if (user) {
            dispatch({
                type: FETCH_USER,
                payload: user
            });
        } else {
            dispatch(push("/login"));
            dispatch({
                type: FETCH_USER,
                payload: null
            });
        }
    });
};