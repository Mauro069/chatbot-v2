import { useChat } from '../../../../context/Chat/context'
import styles from './styles.module.css'

const iconUrl = `/assets/work.svg`

export function Banners () {
  const { banners, isHidden } = useChat()

  const showBanner = type => {
    const bannerType = isHidden(type.toLowerCase())
    return styles[bannerType]
  }

  return (
    <div className={styles.container}>
      <div className={styles.banners_container}>
        {banners.map((banner, index) => {
          const isDark = banner.dark

          const bannerDescriptionContainerClass = `${
            styles.banner_description_container
          } ${isDark ? styles.dark : ''}`
          const bannerDescriptionTypeClass = `${
            styles.banner_description_type
          } ${isDark ? styles.dark : ''}`

          return (
            <div
              key={index}
              className={`${styles.banner} ${showBanner(banner.category)}`}
              style={{
                background: banner.color
              }}
            >
              <img src={iconUrl} alt={`Icon for ${banner.title}`} />

              <div className={bannerDescriptionContainerClass}>
                <div className={styles.banner_texts}>
                  <span className={styles.banner_description_title}>
                    {banner.title}
                  </span>
                  <p className={styles.description}>{banner.excerpt}</p>
                </div>
                <p className={bannerDescriptionTypeClass}>{banner.category}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
