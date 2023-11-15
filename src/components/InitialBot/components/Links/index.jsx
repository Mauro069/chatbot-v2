import styles from './styles.module.css'

export function Links ({ links, setLastLinks }) {
  const handleClose = () => {
    setLastLinks(null)
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
