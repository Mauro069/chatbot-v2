import React from 'react'
import { CHAT_TYPES } from '../../../../context/Chat/types'
import { useChat } from '../../../../context/Chat/context'
import styles from './styles.module.css'

export function RenderText ({ text }) {
  const { dispatch } = useChat()
  const buttonStartIndex = text.indexOf('<button')

  if (buttonStartIndex === -1) return <>{text}</>

  const buttonEndIndex = text.indexOf('</button>', buttonStartIndex)

  if (buttonEndIndex === -1) {
    return <>{text}</>
  }

  const buttonTag = text.substring(
    buttonStartIndex,
    buttonEndIndex + '</button>'.length
  )

  const buttonContent = buttonTag.replace(/<\/?button[^>]*>/g, '')

  const beforeButton = text.substring(0, buttonStartIndex)
  const afterButton = text.substring(buttonEndIndex + '</button>'.length)

  const handleHover = () => {
    dispatch({ type: CHAT_TYPES.SET_TYPE, payload: buttonContent })
  }

  const handleClick = () => {
    dispatch({ type: CHAT_TYPES.SET_LINKS, payload: buttonContent })
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
        onMouseLeave: handleMouseLeave,
        onClick: handleClick
      })}
      {afterButton}
    </>
  )
}
