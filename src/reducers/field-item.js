import {
    FIELD_ITEM_FETCHED, FIELD_ITEM_DELETE,
    ADD_FIELD_ITEM, EDIT_FIELD_ITEM, FIELD_ITEM_INITIAL_VALUES
} from '../constant/field-item'

const INITIAL_STATE = { list: [] }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FIELD_ITEM_FETCHED:
            return Object.assign({ ...state, list: action.payload })
        case ADD_FIELD_ITEM:
            return Object.assign({ ...state, payload: action.payload })
        case EDIT_FIELD_ITEM:
            return Object.assign({ ...state, payload: action.payload })
        case FIELD_ITEM_DELETE:
            return Object.assign({ ...state, payload: action.payload })
        case FIELD_ITEM_INITIAL_VALUES:
            return Object.assign({ ...state, payload: INITIAL_STATE })
        default:
            return state
    }
}
