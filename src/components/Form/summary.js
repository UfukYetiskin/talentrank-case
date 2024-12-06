import React from 'react'
import { useSelector } from 'react-redux'
import styles from "./styles.module.scss"
import editIcon from "@/public/icons/edit-3-svgrepo-com.svg"
import Image from 'next/image';
function Summary({setCurrentStepStatus}) {
    const formData = useSelector(state => state.formData);
    console.log("Form Data with redux toolkit",formData);
  return (
    <div className={styles["container"]}>
        <h1>{formData?.title}</h1>
        <div className={styles["first-step-details"]}>
            <h1>Job Details</h1>
            <h2>Jop Title</h2>
            <p>{formData?.title}</p>
            <h2>Job Description</h2>
            <p className={styles["description"]}>{formData?.description}</p>
        </div>
        <div className={styles["questions-list"]}>
            <h2>Questions</h2>
            <button
                onClick={() => setCurrentStepStatus(2)}
            >
                <Image 
                    src={editIcon}
                    width={24}
                    height={24}
                    alt='Edit Icon'
                />
            </button>
            {
                formData?.questions && formData?.questions.map((item, key) => {
                    return <div className={styles["question"]} key={key}>
                        <h2>{item?.questionNo}</h2>
                        <p>{item?.question}</p>
                        <div>
                            <span>Weightage Score</span>
                            <input 
                                type='range'
                                readOnly
                                min={0}
                                max={3}
                                value={item?.questionScore}
                            />
                        </div>
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default Summary