import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authReducer';
import expenseReducer from './expenseReducer';


const store = configureStore({
    reducer: {auth: authReducer, expnese:expenseReducer }
});


export default store;