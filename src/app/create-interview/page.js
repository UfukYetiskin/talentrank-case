"use client"
import React, { useState } from 'react'
import styles from "./styles.module.css"
import { useDispatch, useSelector } from 'react-redux'
import BottomFormRouteStatus from '@/components/Layout/BottomFormRouteStatus'
import TopFormStepStatus from '@/components/Layout/TopFormStepStatus'
import JobDetail from '@/components/Form/jobDetail'

function Page() {
    const [formDataState, setFormDataState] = useState({
        title: "",
        description: "",
        interviewDuration: "",
        questions: [
            {
                questionNo: 1,
                question: "Kendinizi birkaç cümleyle tanıtabilir misiniz?",
                questionScore: ""
            },
            {
                questionNo: 2,
                question: "Bugüne kadar üstlendiğiniz en zor projeden bahseder misiniz?",
                questionScore: ""
            },
            {
                questionNo: 3,
                question: "Bir takım çalışmasında nasıl bir rol üstlenirsiniz?",
                questionScore: ""
            },
            {
                questionNo: 4,
                question: "Stresli bir durumda karar alırken nasıl bir yol izlersiniz?",
                questionScore: ""
            },
            {
                questionNo: 5,
                question: "Geliştirmek istediğiniz bir teknik beceri var mı? Varsa nedir?",
                questionScore: ""
            },
            {
                questionNo: 6,
                question: "Kariyer hedefleriniz nelerdir?",
                questionScore: ""
            }
        ]
    });
    const [currentStepStatus, setCurrentStepStatus] = useState(1);

    const formData = useSelector((state) => state.formData);
    console.log("formData", formData);
    return (
        <div className='relative'>
            <TopFormStepStatus />
            <div className={styles["body-container"]}>
                <JobDetail />
            </div>
            <BottomFormRouteStatus />
        </div>

    )
}

export default Page