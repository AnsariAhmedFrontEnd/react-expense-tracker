import axios from "axios";
import { Fragment } from "react";
import './ExpenseDetails.css'

const ExpenseDetails = (props) => {
    const expenseList = props.expenses.map((expense) => {

        const deleteExpenesHandler = async() => {
            const url = `https://expense-tracker-35591-default-rtdb.firebaseio.com/expense/${expense.id}.json`
            try {
                await axios.delete(url);
                props.onDelete(expense.id);
                
            } catch (error) {
                console.log(error)
            }
        };

        const editExpenesHandler = () => {}
        return(
            <div key={expense.id} className="expense-item">
        <div className="expense-info">
          <div className="expense-amount">Rs. {expense.amount}</div>
          <div className="expense-description">{expense.description}</div>
          <div className="expense-category">{expense.category}</div>
        </div>
        <div className="expense-actions">
          <button className="delete-button" onClick={deleteExpenesHandler}>
            Delete
          </button>
          <button className="edit-button" onClick={editExpenesHandler}>Edit</button>
        </div>
      </div>
        );
    });

    

    return(
        <Fragment>
        <div>
            {expenseList}
            
        </div>
        
        </Fragment>
    )
};

export default ExpenseDetails;