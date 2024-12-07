"use client"
import React from 'react'
import QuestionCard from '../Cards/questionCard';
import plusIcon from "@/public/icons/plus-svgrepo-com.svg"
import Image from 'next/image';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from '../Packages/Dnd-Sortable/SortableItemComponent';

function QuestionsList({ formDataState, setFormDataState, errorMessage }) {
  console.log("form data", formDataState);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setFormDataState((prevState) => {
        const oldIndex = prevState.questions.findIndex((q) => q.id === active.id);
        const newIndex = prevState.questions.findIndex((q) => q.id === over.id);
        const updatedQuestions = arrayMove(
          prevState.questions,
          oldIndex,
          newIndex
        ).map((question, index) => ({
          ...question,
          questionNo: index + 1, 
        }));
      
        return {
          ...prevState,
          questions: updatedQuestions,
        };
      });
    }
  }

  return (
    <div className='w-full mb-28'>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={formDataState?.questions}
          strategy={verticalListSortingStrategy}
        >
          {
            formDataState && formDataState?.questions.map((item, key) => {
              return (
                <SortableItem key={key} id={item?.id}>
                  <QuestionCard
                    addNewQuestion={addNewQuestion}
                    handleDeleteQuestion={handleDeleteQuestion}
                    questionId={item?.id}
                    handleChange={updateQuestionById}
                    questionText={item?.question}
                    questionNo={item?.questionNo}
                    questionScore={item?.questionScore}
                    errorMessage={errorMessage}
                  />
                </SortableItem>
              );
            })
          }
        </SortableContext>
      </DndContext>
      <div>
        <button
          onClick={(e) => addNewQuestion(e)}
          className='text-centerter w-full border border-[#5138ee] text-center flex justify-center items-center md:w-[764px] mx-auto'
        >
          <Image alt='plus-ıcon' src={plusIcon} width={24} height={24} />
        </button>
      </div>
    </div>
  )
}

export default QuestionsList