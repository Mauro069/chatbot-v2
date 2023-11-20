import { useChat } from '../../../../context/Chat/context'
import { CHAT_TYPES } from '../../../../context/Chat/types'
import styles from './styles.module.css'

const iconUrl = `/assets/work.svg`

export function Banners () {
  const { hoverType, banners, isDefaultBanners, dispatch } = useChat()

  const handleClose = () => {
    dispatch({ type: CHAT_TYPES.DEFAULT_BANNERS })
  }

  const isHidden = type => {
    if (type !== hoverType && hoverType) {
      return styles.hidden
    }

    if (hoverType === type) return styles.active

    return ''
  }

  return (
    <div className={styles.container}>
      {!isDefaultBanners && (
        <img src='/assets/back.svg' onClick={handleClose} />
      )}
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
              className={`${styles.banner} ${isHidden(banner.type)}`}
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
