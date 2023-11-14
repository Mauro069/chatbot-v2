import { useState } from 'react'
import { Messages } from '../Messages'
import styles from './styles.module.css'
import { InputChat } from '../InputChat'

const initialMessage = {
  text: 'Hey there! At Valtira, we solve hard technology problems, and we do it with a 😊 on our face. What brings you here today?'
}

const apiUrl = import.meta.env.VITE_API_URL

export function Chat () {
  // const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([initialMessage])

  // const testMessages = [
  //   {
  //     message:
  //       'Hey there! At Valtira, we solve hard technology problems, and we do it with a 😊 on our face. What brings you here today?',
  //     time: '08:55'
  //   },
  //   {
  //     message: 'Do you do DevOps?',
  //     time: '08:55',
  //     me: true
  //   },
  //   {
  //     message:
  //       'Valtira was an early adopter of the DevOps philosophy and has built an established practice around operational excellence in cloud-based applications.',
  //     time: '08:55'
  //   }
  // ]

  const handleSubmit = async e => {
    // setLoading(true)
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
        // Handle server response if necessary
        setMessages(prevValues => [
          ...prevValues,
          { text: data.message, links: [...data.links] }
        ])
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

    // setLoading(false)
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
