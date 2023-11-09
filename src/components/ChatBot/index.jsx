import { useEffect, useState, useRef } from 'react'
import './styles.css'
import { Loader } from '../Loader'

const initialMessage = {
  text: 'Hey there! At Valtira, we solve hard technology problems, and we do it with a 😊 on our face. What brings you here today?'
}

const apiUrl = import.meta.env.VITE_API_URL

export function ChatBot () {
  const [chatStatus, setChatStatus] = useState('close')
  const [messages, setMessages] = useState([initialMessage])
  const [prompt, setPrompt] = useState({ text: '', disabled: false })
  const [loading, setLoading] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const messagesContainerRef = useRef(null)

  const openChat = () => {
    setChatStatus('open')
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = scrollPosition
      }
    }, 1)
  }

  const closeChat = () => {
    const currentScrollPosition = messagesContainerRef.current.scrollTop
    setScrollPosition(currentScrollPosition)
    setChatStatus('close-in-progress')

    setTimeout(() => {
      setChatStatus('close')
    }, 300)
  }

  const lastMessageRef = useRef(null)

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      const lastMessage = lastMessageRef.current
      lastMessage.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async e => {
    setLoading(true)
    e.preventDefault()

    setMessages(prevValues => [
      ...prevValues,
      { text: e.target.value, me: true }
    ])

    setPrompt({ text: '', disabled: true })

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

    setLoading(false)
    setPrompt({ text: '', disabled: false })
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <div className='chatbot'>
      {chatStatus === 'close' && (
        <div onClick={openChat} className='open_button'>
          <img src='/assets/chat.svg' alt='chatbot' />
        </div>
      )}

      {chatStatus !== 'close' && (
        <div className={`chat_container fade-in ${chatStatus}`}>
          <header>
            <img className='chat_icon' src='/assets/chat.svg' />
            <span>AI Chatbot</span>
            <img
              onClick={closeChat}
              className='close_button'
              src='/assets/close.svg'
            />
          </header>
          <div className='messages_container' ref={messagesContainerRef}>
            {messages.map((message, index) => {
              const isLastMessage = index === messages.length - 1

              let messageType = ''

              if (message.error) messageType = 'error'
              if (message.me) messageType = 'me'

              return (
                <div
                  ref={isLastMessage ? lastMessageRef : null}
                  key={index}
                  className='message_container'
                >
                  <div className={`message ${messageType}`}>{message.text}</div>
                  {message?.links?.length > 0 && (
                    <div className='links'>
                      {message.links.map((messageLink, index) => (
                        <a
                          href={messageLink.link}
                          className='link'
                          target='_blank'
                          rel='noreferrer'
                          key={index}
                        >
                          {messageLink.title.length > 30
                            ? messageLink.title.substring(0, 30) + '...'
                            : messageLink.title}
                          <img className='icon' src='/assets/icon.svg' />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <form onSubmit={handleSubmit} className='prompt_container'>
            {!loading ? (
              <>
                <textarea
                  rows='3'
                  autoFocus
                  disabled={prompt.disabled}
                  placeholder='Your message'
                  value={prompt.text}
                  onChange={e => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </>
            ) : (
              <div className='loader_container'>
                <Loader />
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  )
}
