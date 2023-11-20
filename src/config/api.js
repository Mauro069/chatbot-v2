import { apiUrl } from '.'
import { CHAT_TYPES } from '../context/Chat/types'
import { testResponse } from '../utils/resp'

export const addMessageToApi = async (input, dispatch) => {
  dispatch({ type: CHAT_TYPES.ADD_MESSAGE, payload: { text: input, me: true } })
  dispatch({ type: CHAT_TYPES.START_LOADING })

  const requestBody = { input }

  try {
    // const response = await fetch(apiUrl, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(requestBody)
    // })

    if (true) {
      const data = testResponse

      if (data.links.length > 0) {
        dispatch({
          type: CHAT_TYPES.ADD_MESSAGE_WITH_LINKS,
          payload: { message: { text: data.message }, banners: data.links }
        })

        dispatch({ type: CHAT_TYPES.END_LOADING })
        return
      }

      dispatch({
        type: CHAT_TYPES.ADD_MESSAGE,
        payload: { text: data.message }
      })
    } else {
      console.error('Error in the request:', response.statusText)
      dispatch({
        type: CHAT_TYPES.ADD_MESSAGE_ERROR,
        payload: { text: 'An error occurred', error: true }
      })
    }
  } catch (error) {
    console.error('Error in the request:', error)
    dispatch({
      type: CHAT_TYPES.ADD_MESSAGE_ERROR,
      payload: { text: 'An error occurred', error: true }
    })
  }

  dispatch({ type: CHAT_TYPES.END_LOADING })
}
