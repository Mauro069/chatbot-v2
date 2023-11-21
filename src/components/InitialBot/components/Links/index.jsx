import { useChat } from '../../../../context/Chat/context'
import { CHAT_TYPES } from '../../../../context/Chat/types'
import styles from './styles.module.css'

export function Links () {
  const { links, dispatch, banners } = useChat()

  const handleClose = () => {
    dispatch({ type: CHAT_TYPES.REMOVE_LINKS })
  }

  const bannersFiltered = banners.filter(
    banner => banner.category.toLowerCase() === links
  )

  return (
    <div className={styles.links_container}>
      <img src='/assets/back.svg' onClick={handleClose} />
      <div className={styles.links}>
        {bannersFiltered?.map(({ title, link, color, excerpt }, index) => (
          <a
            style={{ background: color }}
            className={styles.link}
            key={index}
            href={link}
            target='_blank'
          >
            <h3>{title}</h3>
            <p>{excerpt}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
