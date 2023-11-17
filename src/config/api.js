// api.js
import { apiUrl } from './config' // Ajusta la ruta según tu estructura

export const addMessageToApi = async (input, dispatch) => {
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
