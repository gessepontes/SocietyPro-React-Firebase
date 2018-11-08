import {
    CHAMPIONSHIP_FETCHED_PREINSCRIPTION, CHAMPIONSHIP_FETCHED_INSCRIPTION
} from '../constant/championship'

const INITIAL_STATE = { list: [], championship: '' }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHAMPIONSHIP_FETCHED_PREINSCRIPTION:
            return { ...state, listPreInscription: action.payload.data }
        case CHAMPIONSHIP_FETCHED_INSCRIPTION:
            return { ...state, listInscription: action.payload.data }
        default:
            return state
    }
}
