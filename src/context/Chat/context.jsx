import { initialMessage, testButton } from '../../utils/initialMessage'
import { createContext, useContext, useReducer } from 'react'
import { reducer } from './reducer'

const ChatContext = createContext()

const initialState = {
  isOpen: false,
  messages: [initialMessage, testButton],
  links: null,
  disabled: false,
  loading: false,
  hoverType: null
}

const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}

const useChat = () => {
  const context = useContext(ChatContext)

  if (!context) {
    throw new Error('useChat debe ser utilizado dentro de ChatProvider')
  }

  return {
    isOpen: context.state.isOpen,
    messages: context.state.messages,
    links: context.state.links,
    disabled: context.state.disabled,
    loading: context.state.loading,
    hoverType: context.state.hoverType,
    dispatch: context.dispatch
  }
}

export { ChatProvider, useChat }
