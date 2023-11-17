import React, { createContext, useContext, useReducer } from 'react'
import { reducer } from './reducer'

const MessagesContext = createContext()

const initialMessage = {
  text: 'Hey there! At Valtira, we solve hard technology problems, and we do it with a 😊 on our face. What brings you here today?'
}

const initialState = {
  messages: [initialMessage]
}

const MessagesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <MessagesContext.Provider value={{ state, dispatch }}>
      {children}
    </MessagesContext.Provider>
  )
}

const useMessages = () => {
  const context = useContext(MessagesContext)
  if (!context) {
    throw new Error('useMessages debe ser utilizado dentro de MessagesProvider')
  }
  return {
    messages: context.state.messages,
    dispatch: context.dispatch
  }
}

export { MessagesProvider, useMessages }
