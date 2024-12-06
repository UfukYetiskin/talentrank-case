import React, { useRef } from "react";
import { IconButton, TextField, Slider, Box, Card, Typography } from "@mui/material";
import styles from "./styles.module.scss"
import Image from "next/image";
import editIcon from "@/public/icons/edit-3-svgrepo-com.svg"
import dragIcon from "@/public/icons/drag-vertical-svgrepo-com.svg"
import deleteIcon from "@/public/icons/delete-svgrepo-com.svg"

function QuestionCard({
    questionNo,
    questionText,
    questionScore,
    handleChange,
    questionId,
    handleDeleteQuestion,
    addNewQuestion,
    errorMessage
}) {

    const inputRef = useRef();

    const handleEditClick = (e) => {
        e.preventDefault();
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    console.log("Question Key", questionId);
    return (
        <div key={questionId} className={styles["card-container"]}>
            <div className={styles["card-header-row"]}>
                <input 
                    value={questionNo}
                    ref={inputRef} 
                    placeholder="Question No"
                    onChange={(e) => {
                        handleChange(questionId, "questionNo", e.target.value)
                    }}
                />
                <button onClick={(e) => handleEditClick(e)}>
                    <Image 
                    src={editIcon}
                    alt="edit icon"
                    width={24} height={24}
                    />
                </button>
            </div>
            <div className={styles["textfield-row"]}>
                <button>
                <Image 
                    src={dragIcon}
                    alt="edit icon"
                    width={28} height={28}
                    />
                </button>
                <TextField
                    multiline
                    rows={10}
                    fullWidth
                    className='w-full'
                    placeholder="Start typing..."
                    sx={{ m: 1 }}
                    label="Question"
                    value={questionText}
                    onChange={(e) => {
                        handleChange(questionId, "question", e.target.value)
                    }}
                />
            </div>
            <div className={styles["footer-row"]}>
                <div className={styles["range-container"]}>
                    <span>Weightage Score</span>
                    <input 
                        value={questionScore} 
                        type="range" 
                        min="0" 
                        max="3" 
                        onChange={(e) => {
                            handleChange(questionId, "questionScore", e.target.value)
                        }}
                    /> 
                </div>
                <button onClick={(e) => handleDeleteQuestion(e, questionNo)}>
                    Remove
                </button>
            </div>
            {/* {
                errorMessage?.questions != "" ? <p className="absolute left-8 top-8 text-sm text-red-500 ml-4"><span className="rounded-full px-[8px] py-[2px] border border-red-500">!</span> {errorMessage?.questions}</p> : ""
            } */}
        </div>
    )
}

export default QuestionCard