import { Messages } from '../Messages'
import styles from './styles.module.css'
import { InputChat } from '../InputChat'

const apiUrl = import.meta.env.VITE_API_URL

export function Chat ({ messages, setMessages, setLastLinks }) {
  const handleSubmit = async e => {
    e.preventDefault()

    setMessages(prevValues => [
      ...prevValues,
      { text: e.target.value, me: true }
    ])

    const requestBody = {
      input: e.target.value
    }

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

        if (data.links.length > 0) setLastLinks(data.links)
        else setLastLinks(null)

        // Handle server response if necessary
        setMessages(prevValues => [...prevValues, { text: data.message }])
      } else {
        console.error('Error in the request:', response.statusText)
        setMessages(prevValues => [
          ...prevValues,
          { text: 'An error occurred', error: true }
        ])
      }
    } catch (error) {
      console.error('Error in the request:', error)
    }
  }

  return (
    <div className={styles.chat}>
      <header className={styles.chat_header}>
        <img src='/assets/complete_logo.svg' />
        <img src='/assets/hamburger.svg' />
      </header>

      <Messages messages={messages} />

      <div className={styles.chat_button_container}>
        <InputChat handleSubmit={handleSubmit} />
      </div>
    </div>
  )
}
