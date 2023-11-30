import { useChat } from '../../../../context/Chat/context'
import React, { useEffect, useRef } from 'react'
import { RenderText } from '../../../RenderText'
import styles from './styles.module.css'
import { CHAT_TYPES } from '../../../../context/Chat/types'
import { banners } from '../../../../utils/banners'

export function Messages () {
  const { messages, dispatch } = useChat()
  const messagesContainerRef = useRef(null)
  const lastMessageRef = useRef(null)

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      const lastMessage = lastMessageRef.current
      lastMessage.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleBanners = banners => {
    if (banners?.length > 0) {
      dispatch({
        type: CHAT_TYPES.SET_CURRENT_BANNERS,
        payload: banners
      })
    }
  }

  const handleScroll = () => {
    const messagesContainer = messagesContainerRef.current

    if (messagesContainer) {
      const visibleMessages = getVisibleMessages(messagesContainer)
      if (visibleMessages[0]?.banners) toggleBanners(visibleMessages[0].banners)

      const isScrolledToTop = messagesContainer.scrollTop === 0

      if (isScrolledToTop) {
        toggleBanners(banners)
      }
    }
  }

  const getVisibleMessages = container => {
    const visibleMessages = []
    const containerRect = container.getBoundingClientRect()

    ;[...container.children].forEach(child => {
      const childRect = child.getBoundingClientRect()

      if (
        childRect.bottom > containerRect.top &&
        childRect.top < containerRect.bottom
      ) {
        const segundoDiv = child.children[1]
        const textoSegundoDiv = segundoDiv.innerText.trim()
        visibleMessages.push(textoSegundoDiv)
      }
    })

    const messagesFinds = visibleMessages.map(messageText => {
      const find = messages.find(message => message.text === messageText)

      return find
    })

    return messagesFinds
  }

  useEffect(() => {
    const messagesContainer = messagesContainerRef.current
    if (messagesContainer) {
      messagesContainer.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (messagesContainer) {
        messagesContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className={styles.messages} ref={messagesContainerRef}>
      {[...messages]?.map((message, index) => {
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
              <RenderText message={message} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
