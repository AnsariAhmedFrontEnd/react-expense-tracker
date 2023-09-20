import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authReducer';
import expenseReducer from './expenseReducer';
import themeReducer from './themeReducer';


const store = configureStore({
    reducer: {auth: authReducer, expnese:expenseReducer,
    theme: themeReducer }
});


export default store;