import { banners } from '../../utils/banners'
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

    case CHAT_TYPES.END_LOADING:
      return {
        ...state,
        loading: false,
        disabled: false
      }

    case CHAT_TYPES.SET_TYPE:
      return {
        ...state,
        hoverType: action.payload
      }

    case CHAT_TYPES.SET_LINKS:
      return {
        ...state,
        links: action.payload
      }

    case CHAT_TYPES.SET_CURRENT_BANNERS:
      return {
        ...state,
        currentBanners: action.payload
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
