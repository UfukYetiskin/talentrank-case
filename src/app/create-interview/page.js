"use client"
import React, { useState } from 'react'
import styles from "./styles.module.scss"
import { useDispatch, useSelector } from 'react-redux'
import BottomFormRouteStatus from '@/components/Layout/BottomFormRouteStatus'
import TopFormStepStatus from '@/components/Layout/TopFormStepStatus'
import JobDetail from '@/components/Form/jobDetail'
import QuestionsList from '@/components/Form/questionsList'
import { setFormData } from '@/store/slices/formDataSlice'
import Summary from '@/components/Form/summary'

function Page() {
    const [formDataState, setFormDataState] = useState({
        title: "",
        description: "",
        interviewDuration: "",
        jobLocation: "",
        questions: [
            {
                id:1,
                questionNo: 1,
                question: "How has your education prepared you for this position?",
                questionScore: "0"
            },
            {
                id:2,
                questionNo: 2,
                question: "What single project or task would you consider the most significant accomplishment in your career so far?",
                questionScore: "0"
            },
            {
                id:3,
                questionNo: 3,
                question: "Tell me about a problem you faced recently where you were unsure of the answer. How did you research the problem and find a correct solution?",
                questionScore: "0"
            },
            {
                id:4,
                questionNo: 4,
                question: "What area of engineering do you find most challenging?",
                questionScore: "0"
            },
            {
                id:5,
                questionNo: 5,
                question: "Describe the most significant written technical report or presentation that you had to complete.",
                questionScore: "0"
            },
            {
                id:6,
                questionNo: 6,
                question: "Tell me about the most challenging engineering project that you have been involved with during the past year.",
                questionScore: "0"
            }
        ]
    });
    const [currentStepStatus, setCurrentStepStatus] = useState(1);
    const [errorMessage, setErrorMessage] = useState({
        title: "",
        description: "",
        interviewDuration: "",
        jobLocation: "",
        questions: "",
    });

    const formData = useSelector((state) => state.formData);
    const dispatch = useDispatch()

    const validateSteps = () => {
        console.log("Tıklandı!");
        const { title, description, interviewDuration, jobLocation, questions } = formDataState;
    
        // Hata mesajları için başlangıç durumunu belirle
        let errors = {};
        let buttonDisabled = false;
    
        if (currentStepStatus === 1) {
            // İlk adımda doldurulması gereken alanları kontrol et
            const requiredFields = {
                "Title": title,
                "Description": description,
                "Interview Duration": interviewDuration,
                "Job Location": jobLocation,
            };
    
            Object.entries(requiredFields).forEach(([key, value]) => {
                if (!value.trim()) {
                    errors[key] = `Please fill in the ${key} field!`;
                    buttonDisabled = true;
                }
            });
        } else if (currentStepStatus === 2) {
            // İkinci adımda questions alanını kontrol et
            const emptyQuestions = questions.filter((item) => !item.question.trim());
            if (emptyQuestions.length > 0) {
                errors["questions"] = `Please fill in all question fields!`;
                buttonDisabled = true;
            }
        }
    
        // Hata mesajlarını güncelle
        setErrorMessage(errors);
    
        console.log("Validation Errors:", errors);
        console.log("Button Status:", buttonDisabled);
    
        return buttonDisabled;
    };
    
    const nextButtonHandleClick = () => {
        // Adım geçişi öncesi validasyon kontrolü
        const isValidationFailed = validateSteps();
        if (isValidationFailed) return; // Hata varsa sonraki adıma geçme
    
        // Geçerli adımı arttır
        dispatch(setFormData(formDataState));
        setCurrentStepStatus((prev) => prev + 1);
    };
    
    const backButtonHandleClick = () => {
        console.log("Tıklandı!");
        // Eğer ilk adımdayız, geri dönmeye izin verme
        if (currentStepStatus === 1) return;
    
        // Adımı azalt
        setCurrentStepStatus((prev) => prev - 1);
    };

    const handleChange = (e, key) => {
        setFormDataState((prev) => ({
            ...prev,
            [key]: e.target.value
        }));
    };
    
    
    return (
        <div className='relative'>
            <TopFormStepStatus currentStep={currentStepStatus} setCurrentStepStatus={setCurrentStepStatus} />
            <form className={styles["form-container"]}>
                {
                    currentStepStatus == 1  
                        ? <JobDetail formDataState={formDataState} setFormDataState={setFormDataState} errorMessage={errorMessage} handleChange={handleChange} />
                        : currentStepStatus == 2
                        ? <QuestionsList formDataState={formDataState} setFormDataState={setFormDataState} errorMessage={errorMessage}/> 
                        : <Summary setCurrentStepStatus={setCurrentStepStatus} formData={formDataState}/>
                }
                
            </form>
            <BottomFormRouteStatus backButtonHandleClick={backButtonHandleClick} nextButtonHandleClick={nextButtonHandleClick} currentStep={currentStepStatus}  />
        </div>

    )
}

export default Page