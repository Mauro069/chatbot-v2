import { useChat } from '../../../../context/Chat/context'
import styles from './styles.module.css'

const iconUrl = `/assets/work.svg`

export function Banners ({ banners }) {
  return (
    <div className={styles.container}>
      <div className={styles.banners_container}>
        {banners?.map((banner, index) => {
          const isDark = banner.dark

          const bannerDescriptionContainerClass = `${
            styles.banner_description_container
          } ${isDark ? styles.dark : ''}`
          const bannerDescriptionTypeClass = `${
            styles.banner_description_type
          } ${isDark ? styles.dark : ''}`

          return (
            <a
              className={styles.banner}
              style={{
                background: banner.color
              }}
              key={index}
              href={banner.link}
              target='_blank'
            >
              <img src={iconUrl} alt={`Icon for ${banner.title}`} />

              {/* <span>{banner.title}</span>  */}

              <span>Services</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
