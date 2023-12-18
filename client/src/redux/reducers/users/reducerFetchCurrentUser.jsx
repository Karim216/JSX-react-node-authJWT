import { FETCH_CURRENT_USER_LOADING, FETCH_CURRENT_USER_SUCCESS, FETCH_CURRENT_USER_ERROR } from '../../constants';

const INITIAL_STATE = {
    isLoading: true,
    data: [],
    error: ''
}

const reducerFetchCurrentUser = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case FETCH_CURRENT_USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_CURRENT_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                error: ''

            }
        case FETCH_CURRENT_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                data: [],
                error: action.payload
            }
    
        default:
            return state
    }
}

export default reducerFetchCurrentUser;