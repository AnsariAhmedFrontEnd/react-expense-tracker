import { Fragment } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useFetchExpenses } from "./fetchExpense";
import { expenseActions } from "../store/expenseReducer";
import "./ExpenseDetails.css";

const ExpenseDetails = () => {
  const dispatch = useDispatch();
  const expenseArray = useSelector((state) => state.expnese.expensesArray);
  const uesrEmail = useSelector((state) => state.auth.email);
  const fetchExpense = useFetchExpenses();

  const handleExpenseDeletion = async (id) => {
    const sanitizedEmail = uesrEmail.replace(/[.@]/g, "_");

    const url = `https://expense-tracker-35591-default-rtdb.firebaseio.com/${sanitizedEmail}/${id}.json`;
    try {
      const response = await axios.delete(url);
      if (response.status === 200) {
        fetchExpense(uesrEmail);
      } else {
        console.log("failed to fetch");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editExpenseHandler = (expense) => {
    dispatch(expenseActions.showModal());
    dispatch(expenseActions.setExpenseToEdit(expense));
    console.log(expense);
  };

  const expenseList = expenseArray.map((expense) => {
    return (
      <div key={expense.id} className="expense-item">
        <div className="expense-info"><div>{expense.date}</div></div>
          <div>
          <div className="expense-info">
            Rs. {expense.amount} - {expense.description}
          </div>
        </div>
        <div className="expense-actions">
          <button
            className="edit-button"
            onClick={() => {
              editExpenseHandler(expense);
            }}
          >
            Edit
          </button>
          <button
            className="delete-button"
            onClick={() => handleExpenseDeletion(expense.id)}
          >
            X
          </button>
        </div>
      </div>
    );
  });

  return (
    <Fragment>
      <div>{expenseList}</div>
    </Fragment>
  );
};

export default ExpenseDetails;
