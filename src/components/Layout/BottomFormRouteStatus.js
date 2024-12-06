import React from 'react'
import styles from "./styles.module.scss"

function BottomFormRouteStatus({ currentStep, nextButtonHandleClick, backButtonHandleClick }) {
  return (
    <div className={styles["bottomstatus-container"]}>
      <button onClick={() => backButtonHandleClick()} disabled={currentStep > 1 ? false : true}  className={styles["text-styles"]}>
        {"<"} BACK
      </button>
      <div className={styles["button-container"]}>
        <button className={styles["text-styles"]}>DRAFT</button>
        <button onClick={() => nextButtonHandleClick()} className={`${styles["text-styles"]} ${styles["button-bg"]} ml-4`}>
          PROCEED
        </button>
      </div>
    </div>
  )
}

export default BottomFormRouteStatus