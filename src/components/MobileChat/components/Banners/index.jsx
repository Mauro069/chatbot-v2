import styles from './styles.module.css'

const iconUrl = `/assets/work.svg`

export function Banners ({ banners }) {
  return (
    <div className={styles.container}>
      <div className={styles.banners_container}>
        {banners?.slice(0, 6)?.map((banner, index) => {
          return (
            <a
              className={styles.banner}
              style={{
                background: banner.color
              }}
              key={index}
              href={banner.link}
            >
              <img src={iconUrl} alt={`Icon for ${banner.title}`} />

              <span>{banner.title}</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
