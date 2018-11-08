import {
    SCHEDULING_HORARY, SCHEDULING_INITIAL_VALUES,
    SCHEDULING_SHOW, SCHEDULING_TICKET
} from '../constant/scheduling'

const INITIAL_STATE = { list: [], horary: '', scheduling:'' }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SCHEDULING_INITIAL_VALUES:
            return Object.assign({ ...state, horary: INITIAL_STATE.field })
        case SCHEDULING_HORARY:
            return Object.assign({ ...state, horary: action.payload.data })
        case SCHEDULING_SHOW:
            return Object.assign({ ...state, scheduling: action.payload.data })
        case SCHEDULING_TICKET:
            return Object.assign({ ...state, ticket: action.payload.data })
        default:
            return state
    }
}