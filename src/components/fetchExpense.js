import { useCallback } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { expenseActions } from "../store/expenseReducer";

const useFetchExpenses = () => {
  const dispatch = useDispatch();

  return useCallback(async (userEmail) => {
    const sanitizedEmail = userEmail.replace(/[.@]/g, '_');

    const url = `https://expense-tracker-35591-default-rtdb.firebaseio.com/${sanitizedEmail}.json`;
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        const expenseData = response.data;

        if(expenseData) {
            const expenseArray = Object.keys(expenseData).map((key) => ({
                id: key,
                ...expenseData[key],
                
              }));
              dispatch(expenseActions.addExpense(expenseArray));

        }else{
            const expenseArray = [];
            dispatch(expenseActions.addExpense(expenseArray));
        }

       

      } else {
        console.log("Failed to fetch expenses");
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
};

export { useFetchExpenses };
