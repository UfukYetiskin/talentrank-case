import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    title : "",
    description : "",
    interviewDuration : "",
    jobLocation : "",
    questions : [],
    step : 1,
}

export const formDataSlice = createSlice({
    name : "formData",
    initialState,
    reducers : {
        setFormData: (state, action) => {
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.interviewDuration = action.payload.interviewDuration;
            state.questions = [...action.payload.questions];
        },
        clearFormData : (state) => {
            state.title = "";
            state.description = "";
            state.interviewDuration = "",
            state.questions = [];
        },
        setNextStep : (state) => {
            state.step += 1;
        },
        setPrevStep : (state) => {
            state.step -= 1;
        }
    }
})

export const {setFormData, clearFormData} = formDataSlice.actions;
export default formDataSlice.reducer