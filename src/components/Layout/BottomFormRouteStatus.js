import React from 'react'
import Link from 'next/link'
import styles from "./styles.module.css"
function BottomFormRouteStatus({currentStep}) {
  return (
    <div className={styles["bottomstatus-container"]}>
        <Link href="/" className={`${styles["text-styles"]} `} >
            {"<"} ADD INTERVIEW BACK
        </Link>
        <div className={styles["button-container"]}>
            <button className={styles["text-styles"]}>DRAFT</button>
            <button className={`${styles["text-styles"]} ${styles["button-bg"]} ml-4 `}>PROCEED</button>
        </div>
    </div>
  )
}

export default BottomFormRouteStatus