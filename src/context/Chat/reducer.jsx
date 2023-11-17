import { CHAT_TYPES } from './types'

export const reducer = (state, action) => {
  switch (action.type) {
    case CHAT_TYPES.TOGGLE_CHAT:
      return {
        ...state,
        isOpen: !state.isOpen
      }

    case CHAT_TYPES.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        links: null,
        loading: true,
        disabled: true
      }

    case CHAT_TYPES.ADD_MESSAGE_WITH_LINKS:
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
        links: action.payload.links,
        loading: false,
        disabled: false
      }

    case CHAT_TYPES.ADD_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        loading: false,
        disabled: false
      }

    case CHAT_TYPES.ADD_MESSAGE_ERROR:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        loading: false,
        disabled: false
      }

    case CHAT_TYPES.REMOVE_LINKS:
      return {
        ...state,
        links: null
      }

    default:
      return state
  }
}
