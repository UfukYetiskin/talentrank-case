import React from 'react'
import styles from "./styles.module.scss"
import Link from 'next/link'


function TopFormStepStatus({ currentStep, setCurrentStepStatus }) {
    const steps = [
        {
            step: 1,
            label: "Job Details",
            desc: "Detail Desc"
        },
        {
            step: 2,
            label: "Configure Skillset",
            desc: "Detail Desc",
        },
        {
            step: 3,
            label: "Summary And Review",
            desc: "Detail Desc"
        }
    ]
    return (
        <div className={styles["topstatus-container"]}>
            <span></span>
            <Link href="/" className={styles["text-styles"]}>
                {"<"}BACK
            </Link>
            {steps &&
                steps.map((item, key) => (
                    <div
                        key={key}
                        className={
                            item?.step === currentStep
                                ? styles["stepCard-current"]
                                : item?.step < currentStep
                                    ? styles["stepCard-prev"]
                                    : styles["stepCard-next"]
                        }
                    >
                        <h6>{item?.label}</h6>
                        <p>{item?.desc}</p>
                    </div>
                ))}
        </div>

    )
}

export default TopFormStepStatus