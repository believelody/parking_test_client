export const ALL_SPOTS = "ALL_SPOTS"
export const ONE_SPOT = "ONE_SPOT"
export const ADD_SPOT = "ADD_SPOT"
export const DELETE_SPOT = "DELETE_SPOT"
export const ERROR_CREATE_SPOT = "ERROR_CREATE_SPOT"
export const ASSIGN_USER = "ASSIGN_USER"

export default (state, { type, payload }) => {
    switch (type) {
        case ALL_SPOTS:
            return {
                ...state,
                spots: payload
            }

        case ONE_SPOT:
            return {
                ...state,
                selectedSpot: payload
            }

        case ADD_SPOT:
            return {
                ...state,
                spots: [...state.spots, payload]
            }

        case DELETE_SPOT:
            return {
                ...state,
                spots: state.spots.filter(spot => spot.id !== payload)
            }

        case ERROR_CREATE_SPOT:
            let errors = {}
            errors[payload.code] = payload.msg
            return {
                ...state,
                errors
            }

        case ASSIGN_USER:
            return {
                ...state,
                selectedSpot: {...state.selectedSpot, user: payload}
            }

        case DISCONNECTED:
            return userStateInit

        default:
            return state;
    }
}