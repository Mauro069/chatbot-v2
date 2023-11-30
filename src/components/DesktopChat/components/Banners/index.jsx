import { useChat } from '../../../../context/Chat/context'
import styles from './styles.module.css'

const iconUrl = `/assets/work.svg`

export function Banners () {
  const { currentBanners, isHidden } = useChat()

  const showBanner = type => {
    return isHidden(type?.toLowerCase())
  }

  return (
    <div className={styles.container}>
      <div className={styles.banners_container}>
        {currentBanners?.map((banner, index) => {
          const isDark = banner.dark

          const bannerDescriptionContainerClass = `${
            styles.banner_description_container
          } ${isDark ? styles.dark : ''}`
          const bannerDescriptionTypeClass = `${
            styles.banner_description_type
          } ${isDark ? styles.dark : ''}`

          return (
            <a
              className={`${styles.banner} ${
                styles[showBanner(banner.category)]
              }`}
              style={{
                opacity:
                  showBanner(banner.category) === 'hidden' ? '0.25' : '1',
                background: banner.color
              }}
              key={index}
              href={banner.link}
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
            </a>
          )
        })}
      </div>
    </div>
  )
}
