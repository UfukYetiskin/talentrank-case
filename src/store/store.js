import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import formDataReducer from "./slices/formDataSlice"
export const store = configureStore({
  reducer: {
    counter : counterReducer,
    formData : formDataReducer,
  },
})