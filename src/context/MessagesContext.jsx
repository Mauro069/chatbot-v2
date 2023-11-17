import React, { createContext, useContext, useReducer } from 'react'

const MessagesContext = createContext()

const apiUrl = import.meta.env.VITE_API_URL

const MessagesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addMessage = async input => {
    dispatch({ type: 'ADD_MESSAGE', payload: { text: input, me: true } })

    const requestBody = { input }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      if (response.ok) {
        const data = await response.json()

        // if (data.links.length > 0) setLastLinks(data.links)
        // else setLastLinks(null)

        dispatch({ type: 'ADD_MESSAGE', payload: { text: data.message } })
      } else {
        console.error('Error in the request:', response.statusText)
        dispatch({
          type: 'ADD_MESSAGE',
          payload: { text: 'An error occurred', error: true }
        })
      }
    } catch (error) {
      console.error('Error in the request:', error)
    }
  }

  return (
    <MessagesContext.Provider value={{ state, dispatch, addMessage }}>
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
    dispatch: context.dispatch,
    addMessage: context.addMessage
  }
}

const initialMessage = {
  text: 'Hey there! At Valtira, we solve hard technology problems, and we do it with a 😊 on our face. What brings you here today?'
}

const initialState = {
  messages: [initialMessage]
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload]
      }

    default:
      return state
  }
}

export { MessagesProvider, useMessages }
