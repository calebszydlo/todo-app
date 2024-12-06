import styles from "./Loader.module.css"

const Loader = () => {
  return (
    <div className={styles.loader}>
      <em>Loading</em>
      <span className={styles.loaderIcon}></span>
    </div>
  )
}

export const MiniLoader = () => {
  return (
    <div className={styles.miniLoader}>
      <span className={styles.loaderIcon}></span>
    </div>
  )
}

export default Loader