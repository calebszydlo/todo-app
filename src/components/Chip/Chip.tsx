import { ReactNode } from "react"
import styles from "./Chip.module.css"

type ChipProps = {
  children: ReactNode
}

const Chip = ({children} : ChipProps) => {
  return (
    <div className={styles.chip}>
      {children}
    </div>
  )
}

export default Chip