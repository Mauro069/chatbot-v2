import { CHAT_TYPES } from '../../../../context/Chat/types'
import { useChat } from '../../../../context/Chat/context'
import React, { useEffect, useRef } from 'react'
import styles from './styles.module.css'

export function Messages () {
  const { messages } = useChat()
  const messagesContainerRef = useRef(null)
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

  return (
    <div className={styles.messages} ref={messagesContainerRef}>
      {[
        ...messages,
        {
          text: "We offer both DevOps solutions architecture as well as just-in-time and managed <button class='services'>services</button> around cloud-based applications and integrations with a keen eye for scalability, uptime, and repeatability"
        }
      ]?.map((message, index) => {
        const time = '08:55'

        let messageType
        if (message.me) messageType = 'me'

        const isLastMessage = index === messages.length - 1

        return (
          <div
            key={index}
            ref={isLastMessage ? lastMessageRef : null}
            className={styles.message_container}
          >
            <div className={styles.message_container_top}>
              <div
                className={`${styles.message_owner} ${
                  styles[messageType] || ''
                }`}
              >
                <div
                  className={`${styles.circle} ${styles[messageType] || ''}`}
                />
                <span>{message.me ? 'You' : 'Valtira'}</span>
              </div>

              <span className={styles.message_time}>{time}</span>
            </div>

            <div className={`${styles.message} ${styles[messageType] || ''}`}>
              <RenderLinkWithButton text={message.text} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

const RenderLinkWithButton = ({ text }) => {
  const { dispatch } = useChat()
  const buttonStartIndex = text.indexOf('<button')

  if (buttonStartIndex === -1) {
    return <>{text}</>
  }

  const buttonEndIndex = text.indexOf('</button>', buttonStartIndex)

  if (buttonEndIndex === -1) {
    return <>{text}</>
  }

  const buttonTag = text.substring(
    buttonStartIndex,
    buttonEndIndex + '</button>'.length
  )

  const buttonContent = buttonTag.replace(/<\/?button[^>]*>/g, '')

  // dispatch({ type: CHAT_TYPES.SET_TYPE, payload: buttonContent })

  console.log(buttonContent)

  const beforeButton = text.substring(0, buttonStartIndex)
  const afterButton = text.substring(buttonEndIndex + '</button>'.length)

  const handleHover = () => {
    dispatch({ type: CHAT_TYPES.SET_TYPE, payload: buttonContent })
  }

  const handleMouseLeave = () => {
    dispatch({ type: CHAT_TYPES.SET_TYPE, payload: '' })
  }

  return (
    <>
      {beforeButton}
      {React.createElement('a', {
        className: `${styles.button}`,
        dangerouslySetInnerHTML: { __html: buttonContent },
        onMouseOver: handleHover,
        onMouseLeave: handleMouseLeave
      })}
      {afterButton}
    </>
  )
}
