import styles from './styles.module.css'

export const Loader = ({ size = 30 }) => {
  return (
    <div style={{ width: size, height: size }} className={styles.spinner} />
  )
}
