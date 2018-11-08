import {
    FIELD_FETCHED, FIELD_ID_FETCHED,
    FIELD_TIME, ADD_FIELD, EDIT_FIELD, FIELD_INITIAL_VALUES
} from '../constant/field'

const INITIAL_STATE = { list: [], field: '' }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FIELD_FETCHED:
            return Object.assign({ ...state, list: action.payload })
        case ADD_FIELD:
            return Object.assign({ ...state, field: action.payload })
        case EDIT_FIELD:
            return Object.assign({ ...state, field: action.payload })
        case FIELD_ID_FETCHED:
            return Object.assign({ ...state, field: action.payload })
        case FIELD_TIME:
            return Object.assign({ ...state, field: action.payload })
        case FIELD_INITIAL_VALUES:
            return Object.assign({ ...state, field: INITIAL_STATE })
        default:
            return state
    }
}
