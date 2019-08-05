import React, { createContext, useContext, useReducer } from 'react'
import userReducer from '../reducers/userReducer';
import spotReducer from '../reducers/spotReducer';
import userStateInit from '../init-state/userStateInit'
import spotStateInit from '../init-state/spotStateInit'

const StateContext = createContext()

export const StateProvider = ({ children }) => {
    return (
        <StateContext.Provider 
            value={{
                useUser: useReducer(userReducer, userStateInit),
                useSpot: useReducer(spotReducer, spotStateInit)
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useAppHook = () => useContext(StateContext)