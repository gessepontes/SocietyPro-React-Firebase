import { PLAYER_INITIAL_VALUES, GET_PLAYER, EDIT_PLAYER, ADD_PLAYER, DELETE_PLAYER } from '../constant/player'

const INITIAL_STATE = { list: [], player: '' }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PLAYER:
            return { ...state, list: action.payload }
        case PLAYER_INITIAL_VALUES:
            return Object.assign({ ...state, player: INITIAL_STATE.PLAYER })
        case EDIT_PLAYER:
            return Object.assign({ ...state, payload: action.payload })
        case ADD_PLAYER:
            return Object.assign({ ...state, payload: action.payload })
        case DELETE_PLAYER:
            return Object.assign({ ...state, payload: action.payload })
        default:
            return state
    }
}


