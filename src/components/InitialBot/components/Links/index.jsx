import { useChat } from '../../../../context/Chat/context'
import { CHAT_TYPES } from '../../../../context/Chat/types'
import styles from './styles.module.css'

export function Links () {
  const { links, dispatch } = useChat()

  const handleClose = () => {
    dispatch({ type: CHAT_TYPES.REMOVE_LINKS })
  }

  return (
    <div className={styles.links_container}>
      <img src='/assets/back.svg' onClick={handleClose} />
      <div className={styles.links}>
        {links?.map(({ title, link }, index) => (
          <a className={styles.link} key={index} href={link} target='_blank'>
            <h3>{title}</h3>
          </a>
        ))}
      </div>
    </div>
  )
}
