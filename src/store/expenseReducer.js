import {createSlice} from '@reduxjs/toolkit';

const initialState = {totalExpense : 0, isPremium: false};

const expenseSlice = createSlice({
    name: 'expenses',
    initialState:initialState,
    reducers: {
        addExpense (state, action) {
            state.totalExpense = state.totalExpense + action.payload
        },
        activatePremium (state) {
            state.isPremium = true;
        },
    }
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;