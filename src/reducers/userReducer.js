export const AUTH_SUCCESS = "AUTH_SUCCESS"
export const AUTH_FAILED = "AUTH_FAILED"
export const DISCONNECTED = "DISCONNECTED"

export default (state, { type, payload }) => {
    switch (type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                isConnected: true,
                user: payload
            }

        case AUTH_FAILED:
            let errors = {}
            errors[payload.code] = payload.msg
            return {
                ...state,
                errors
            }

        case DISCONNECTED:
            return userStateInit
    
        default:
            return state;
    }
}