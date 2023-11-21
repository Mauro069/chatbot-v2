import { initialMessage, testButton } from '../../utils/initialMessage'
import { createContext, useContext, useReducer } from 'react'
import { reducer } from './reducer'
import { banners } from '../../utils/banners'

const ChatContext = createContext()

const initialState = {
  isOpen: false,
  messages: [initialMessage, testButton],
  banners: banners,
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

  const { hoverType } = context.state

  const isHidden = type => {
    if (type !== hoverType && hoverType && hoverType !== '') {
      return 'hidden'
    }

    if (hoverType === type) return 'active'

    return ''
  }

  return {
    isOpen: context.state.isOpen,
    messages: context.state.messages,
    banners: context.state.banners,
    links: context.state.links,
    disabled: context.state.disabled,
    loading: context.state.loading,
    hoverType: context.state.hoverType,
    dispatch: context.dispatch,
    isHidden: isHidden
  }
}

export { ChatProvider, useChat }
