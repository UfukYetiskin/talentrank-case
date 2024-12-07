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
import { addDocument, updateDocById, updateDocument } from '@/services/firestoreServices'
import { addDoc, collection } from 'firebase/firestore'
import { storage } from '@/utils/firebase'
import { useRouter } from 'next/navigation'

function EditPageForm({data}) {
    const router = useRouter();
    const [formDataState, setFormDataState] = useState(data);
    const [currentStepStatus, setCurrentStepStatus] = useState(1);
    const [errorMessage, setErrorMessage] = useState({
        title: "",
        description: "",
        interviewDuration: "",
        jobLocation: "",
        questions: "",
    });

    const dispatch = useDispatch()

    const validateSteps = () => {
        console.log("Tıklandı!");
        const { title, description, interviewDuration, jobLocation, questions } = formDataState;
        let errors = {};
        let buttonDisabled = false;
    
        if (currentStepStatus === 1) {
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
            const emptyQuestions = questions.filter((item) => !item.question.trim());
            if (emptyQuestions.length > 0) {
                errors["questions"] = `Please fill in all question fields!`;
                buttonDisabled = true;
            }
        }
        setErrorMessage(errors);
    
        console.log("Validation Errors:", errors);
        console.log("Button Status:", buttonDisabled);
    
        return buttonDisabled;
    };
    
    const nextButtonHandleClick = () => {
        const isValidationFailed = validateSteps();
        if (isValidationFailed) return; 
        dispatch(setFormData(formDataState));
        setCurrentStepStatus((prev) => prev + 1);
    };

    const postRequestToFirebase = async () => {
        const isValidationFailed = validateSteps();
        if (isValidationFailed) {
          alert("Lütfen tüm zorunlu alanları doldurun.");
          return;
        }
      
        try {
          const doc = {
            title: formDataState?.title,
            description: formDataState?.description,
            interviewDuration: formDataState?.interviewDuration,
            jobLocation: formDataState?.jobLocation,
            questions: [...(formDataState?.questions || [])],
          };
      
          const response = await updateDocById(data?.id, doc);
          console.log("Document successfully added with ID: ", response);
          alert("Updated Success!")
          if(response){
            router.push("/")
          }
        } catch (error) {
          console.error("Error updating document:", error);
          alert("We have some problems sorry :(")
          throw new Error("Belge güncellenirken bir hata oluştu.");
        }
      };

    const updateData = async (id) => {
        const isValidationFailed = validateSteps();
        if (isValidationFailed) return; 
        try {
          const updatedData = {
            title: "Updated Title",
            content: "Updated content",
          };
          await updateDocument("myCollection", id, updatedData);
          console.log("Document updated successfully.");
        } catch (error) {
          console.error("Error updating data:", error);
        }
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
            <BottomFormRouteStatus postRequestToFirebase={postRequestToFirebase} updateData={updateData}   backButtonHandleClick={backButtonHandleClick} nextButtonHandleClick={nextButtonHandleClick} currentStep={currentStepStatus}  />
        </div>

    )
}

export default EditPageForm