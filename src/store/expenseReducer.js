import {createSlice} from '@reduxjs/toolkit';

const initialState = {totalExpense : 0};

const expenseSlice = createSlice({
    name: 'expenses',
    initialState:initialState,
    reducers: {
        addExpense (state, action) {
            state.totalExpense = state.totalExpense + action.payload
        }
    }
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;