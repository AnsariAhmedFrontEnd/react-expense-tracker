import {createSlice} from '@reduxjs/toolkit';

const initialState = {expensesArray: [] ,totalExpense : 0, isPremium: false, isEditing: false,  expenseToEdit: null,};

const expenseSlice = createSlice({
    name: 'expenses',
    initialState:initialState,
    reducers: {
        resetExpenseState(state) {
            state.expensesArray = [];
            state.totalExpense = 0;
            state.isPremium = false;
        },
        addExpense (state, action) {
            state.expensesArray = action.payload;
            const totalAmount = state.expensesArray.reduce((accumulator, expense) => {
                return accumulator + expense.amount;
            }, 0);
            state.totalExpense = totalAmount;
        },

        activatePremium (state) {
            state.isPremium = !state.isPremium;
        },

        deleteExpense (state, action) {
           
        },
        showModal (state) {
            state.isEditing = true;
        },
        closeModal (state) {
            state.isEditing = false;
        },
        setExpenseToEdit(state, action) {
            state.expenseToEdit = action.payload;
          },
    }
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;