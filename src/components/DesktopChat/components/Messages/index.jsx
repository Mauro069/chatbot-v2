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
      const visibleMessages = getVisibleMessages(messagesContainer, messages)

      const messagesFinds = visibleMessages.map(visibleMessage => {
        const find = messages.find(
          message =>
            message.text?.toLowerCase() === visibleMessage.text?.toLowerCase()
        )

        return { ...find, height: visibleMessage?.height }
      })

      const message = messagesFinds.reduce((moreHeightMsg, currentMsg) => {
        if (currentMsg?.height && currentMsg.banners && !currentMsg.default) {
          if (!moreHeightMsg || currentMsg?.height > moreHeightMsg?.height) {
            return currentMsg
          }
        }
        return moreHeightMsg
      }, null)

      if (message) toggleBanners(message.banners)

      const isScrolledToTop = messagesContainer.scrollTop === 0
      const isScrolledToBottom =
        messagesContainer.scrollTop + messagesContainer.clientHeight ===
        messagesContainer.scrollHeight

      if (isScrolledToTop) {
        toggleBanners(banners)
      }

      if (isScrolledToBottom) {
        toggleBanners(messages[message.length - 1]?.banners)
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
        const text = segundoDiv.innerText.trim()

        const height =
          Math.min(childRect.bottom, containerRect.bottom) -
          Math.max(childRect.top, containerRect.top)

        visibleMessages.push({
          text,
          height
        })
      }
    })

    return visibleMessages
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
