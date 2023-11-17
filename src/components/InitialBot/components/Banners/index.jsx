import { banners } from '../../../../utils/banners'
import styles from './styles.module.css'

export function Banners () {
  return (
    <div className={styles.banners_container}>
      {banners.map((banner, index) => {
        const iconUrl = `/assets/${banner.icon}.svg`
        const isDark = banner.dark

        const bannerDescriptionContainerClass = `${
          styles.banner_description_container
        } ${isDark ? styles.dark : ''}`
        const bannerDescriptionTypeClass = `${styles.banner_description_type} ${
          isDark ? styles.dark : ''
        }`

        return (
          <div
            key={index}
            className={`${styles.banner}`}
            style={{ background: banner.background }}
          >
            <img src={iconUrl} alt={`Icon for ${banner.title}`} />

            <div className={bannerDescriptionContainerClass}>
              <div className={styles.banner_texts}>
                <span className={styles.banner_description_title}>
                  {banner.title}
                </span>
              </div>
              <p className={bannerDescriptionTypeClass}>{banner.type}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
