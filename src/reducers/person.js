import { GET_PERSON, ADD_PERSON, EDIT_PERSON, GET_PERSON_KEY, PERSON_INITIAL_VALUES } from '../constant/person'

const INITIAL_STATE = { person: '' }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PERSON:
            return { ...state, payload: action.payload }
        case PERSON_INITIAL_VALUES:
            return { ...state, payload: INITIAL_STATE }
        case GET_PERSON_KEY:
            return Object.assign({ ...state, payload: action.payload })
        case EDIT_PERSON:
            return Object.assign({ ...state, payload: action.payload })
        case ADD_PERSON:
            return Object.assign({ ...state, payload: action.payload })
        default:
            return state
    }
}


