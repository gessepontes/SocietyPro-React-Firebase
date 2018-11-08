import { TEAM_INITIAL_VALUES, GET_TEAM, EDIT_TEAM, ADD_TEAM, DELETE_TEAM, STATUS_TEAM } from '../constant/team'

const INITIAL_STATE = { list: [], team: '' }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_TEAM:
            return { ...state, list: action.payload }
        case STATUS_TEAM:
            return { ...state, list: action.payload }
        case TEAM_INITIAL_VALUES:
            return Object.assign({ ...state, team: INITIAL_STATE.team })
        case EDIT_TEAM:
            return Object.assign({ ...state, payload: action.payload })
        case ADD_TEAM:
            return Object.assign({ ...state, payload: action.payload })
        case DELETE_TEAM:
            return Object.assign({ ...state, payload: action.payload })
        default:
            return state
    }
}


