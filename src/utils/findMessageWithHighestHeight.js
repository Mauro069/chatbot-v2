export function findMessageWithHighestHeight (messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    return null
  }

  let maxHeight = -1
  let messageWithHighestHeight = null

  messages.forEach(message => {
    if (message.height && message.height > maxHeight) {
      maxHeight = message.height
      messageWithHighestHeight = message
    }
  })

  return messageWithHighestHeight
}
