"use client"
import React from 'react'
import QuestionCard from '../Cards/questionCard';
import plusIcon from "@/public/icons/plus-svgrepo-com.svg"
import Image from 'next/image';

function QuestionsList({ formDataState, setFormDataState, errorMessage }) {
  console.log("form data", formDataState);

  const handleDeleteQuestion = (e, questionId) => {
    e.preventDefault();
    const filterQuestions = formDataState.questions.filter((item) => item.questionNo !== questionId); // questionNo kullanmak gerekebilir
    setFormDataState(prevState => ({
      ...prevState,
      questions: filterQuestions
    }));
  }

  const updateQuestionById = (questionId, key, value) => {
    setFormDataState((prevState) => {
      const questionIndex = prevState.questions.findIndex(
        (question) => question.id === questionId
      );

      if (questionIndex === -1) {
        console.error(`Question with ID ${questionId} not found.`);
        return prevState;
      }

      const updatedQuestions = [...prevState.questions];
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        [key]: value,
      };

      return {
        ...prevState,
        questions: updatedQuestions,
      };
    });
  };

  const addNewQuestion = (e) => {
    e.preventDefault();
    console.log(formDataState.questions.sort((a, b) => b?.questionId - a?.questionId))
    let lastId = formDataState.questions.sort((a, b) => b?.id - a?.id)[0]?.id;
    setFormDataState((prev) => ({
      ...prev,
      questions: [...prev.questions, {
        id: lastId + 1,
        questionNo: prev.questions.length + 1,
        question: "",
        questionScore: "",
      }]
    }))
  }

  return (
    <div className='w-full mb-28'>
      {
        formDataState && formDataState.questions.sort((a,b) =>a?.id - b?.id).map((item, key) => {
          return <div className='' key={key}>
            <QuestionCard 
              addNewQuestion={addNewQuestion} 
              handleDeleteQuestion={handleDeleteQuestion} 
              questionId={item?.id} 
              handleChange={updateQuestionById} 
              questionText={item?.question} 
              questionNo={item?.questionNo} 
              questionScore={item?.questionScore}
              errorMessage={errorMessage}  
            /></div>
        })
      }
      <div>
        <button 
          onClick={(e) => addNewQuestion(e)} 
          className='text-centerter w-full border border-[#5138ee] text-center flex justify-center items-center md:w-[764px] mx-auto' 
        >
          <Image src={plusIcon} width={24} height={24} />
        </button>
      </div>
    </div>
  )
}

export default QuestionsList