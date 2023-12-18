import { FETCH_ALL_USERS_LOADING, FETCH_ALL_USERS_SUCCESS, FETCH_ALL_USERS_ERROR } from '../../constants';

const INITIAL_STATE = {
    isLoading: true,
    data: [],
    error: ''
}

const reducerFetchAllUsers = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case FETCH_ALL_USERS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_ALL_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                error: ''

            }
        case FETCH_ALL_USERS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
    
        default:
            return state
    }
}

export default reducerFetchAllUsers;