import { createContext, useContext, useReducer } from 'react'
import reducers from '../reducers';
import initialState from '../init-state'

const StateContext = createContext()

export const StateProvider = ({ children }) => {
    return (
        <StateContext.Provider value={useReducer(reducers, initialState)}>
            {children}
        </StateContext.Provider>
    )
}

export const useAppHook = () => useContext(StateContext)