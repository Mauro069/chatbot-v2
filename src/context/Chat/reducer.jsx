import { CHAT_TYPES } from './types'

export const reducer = (state, action) => {
  switch (action.type) {
    case CHAT_TYPES.TOGGLE_CHAT:
      return {
        ...state,
        isOpen: !state.isOpen
      }

    case CHAT_TYPES.START_LOADING:
      return {
        ...state,
        loading: true,
        disabled: true
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
        links: action.payload.links
      }

    case CHAT_TYPES.END_LOADING:
      return {
        ...state,
        loading: false,
        disabled: false
      }

    case CHAT_TYPES.REMOVE_LINKS:
      return {
        ...state,
        links: null
      }

    case CHAT_TYPES.SET_TYPE:
      return {
        ...state,
        hoverType: action.payload
      }

    default:
      return state
  }
}
