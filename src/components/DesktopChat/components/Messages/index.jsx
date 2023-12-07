import { useChat } from '../../../../context/Chat/context'
import React, { useEffect, useRef, useState } from 'react'

import styles from './styles.module.css'
import { Message } from './Message'
import { findMessageWithHighestHeight } from '../../../../utils/findMessageWithHighestHeight'
import { CHAT_TYPES } from '../../../../context/Chat/types'
import { banners } from '../../../../utils/banners'

export function Messages () {
  const { messages, currentBanners, dispatch } = useChat()
  const messagesContainerRef = useRef(null)
  const lastMessageRef = useRef(null)

  const toggleBanners = newBanners => {
    if (newBanners?.length > 0) {
      dispatch({
        type: CHAT_TYPES.SET_CURRENT_BANNERS,
        payload: newBanners
      })
    }
  }

  const handleScroll = () => {
    const messagesContainer = messagesContainerRef.current

    if (messagesContainer) {
      const isAtTop = messagesContainer.scrollTop === 0
      const isAtBottom =
        messagesContainer.scrollTop + messagesContainer.clientHeight ===
        messagesContainer.scrollHeight

      if (isAtTop) {
        // Si está en la parte superior, establece los banners por defecto
        toggleBanners(banners)
        return
      }

      if (isAtBottom) {
        // Si está en la parte inferior, establece los banners por defecto para abajo
        const lastMessage = messages[messages.length - 1]
        toggleBanners(lastMessage.banners)
        return
      }

      const visibleMessages = getVisibleMessages(messagesContainer, messages)

      const highestMessage = findMessageWithHighestHeight(visibleMessages)

      if (currentBanners !== highestMessage.banners) {
        toggleBanners(highestMessage.banners)
      }
    }
  }

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      const lastMessage = lastMessageRef.current
      lastMessage.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getVisibleMessages = container => {
    const visibleMessages = []
    const containerRect = container.getBoundingClientRect()

    ;[...container.children].forEach(child => {
      const childRect = child.getBoundingClientRect()

      if (
        childRect.bottom > containerRect.top &&
        childRect.top < containerRect.bottom
      ) {
        const divText = child.children[1]
        const text = divText.innerText

        const messageFind = messages.find(msg => {
          return String(msg.text) === String(text)
        })

        const height =
          Math.min(childRect.bottom, containerRect.bottom) -
          Math.max(childRect.top, containerRect.top)

        const visibleMessage = {
          text: text,
          height,
          banners: messageFind?.banners
        }

        visibleMessages.push(visibleMessage)
      }
    })

    return visibleMessages
  }

  return (
    <div
      className={styles.messages}
      ref={messagesContainerRef}
      onScroll={handleScroll}
    >
      {messages?.map((message, index) => {
        const isLastMessage = index === messages.length - 1

        return (
          <Message
            key={index}
            message={message}
            isLastMessage={isLastMessage}
            lastMessageRef={isLastMessage ? lastMessageRef : null}
          />
        )
      })}
    </div>
  )
}
