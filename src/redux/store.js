import { configureStore } from '@reduxjs/toolkit'
import tableReducer from './tableReducer'
export const store = configureStore({
  reducer: tableReducer,
})