import { useState, Fragment, useEffect } from "react";
import ExpenseDetails from "../components/ExpenseDetails";
import axios from "axios";
import './Expenses.css';

const Expenses = () => {
  const [expense, setExpense] = useState([]);

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Grocery");

  const addExpenesHandler = async (event) => {
    event.preventDefault();

    const amountData = {
      amount: +amount,
      description,
      category,
    };

    const url =
      "https://expense-tracker-35591-default-rtdb.firebaseio.com/expense.json";

    try {
      await axios.post(url, amountData);
      fetchExpenses();
    } catch (error) {
      console.log(error);
    }

    setAmount("");
    setCategory("Grocery");
    setDescription("");
  };

  const fetchExpenses = async () => {
    const url =
      "https://expense-tracker-35591-default-rtdb.firebaseio.com/expense.json";
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        const expenseData = response.data;

        const expenseArray = Object.keys(expenseData).map((key) => ({
          id: key,
          ...expenseData[key],
        }));

        setExpense(expenseArray);
      } else {
        console.log("failed to fetch");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleExpenseDeletion = (expenseId) => {
    const updatedExpenses = expense.filter(
      (expense) => expense.id !== expenseId
    );
    setExpense(updatedExpenses);
  };

  const handleExpenseEdit = () => {};
  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <Fragment>
      <form className="expenses-form" onSubmit={addExpenesHandler}>
        <input
        className="expense-amount"
          type="number"
          placeholder="Enter Expense Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
        className="expense-description"
          type="text"
          placeholder="Description of Expense"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select className="expense-category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Grocery">Grocery</option>
          <option value="Petrol">Petrol</option>
          <option value="Rent">Rent</option>
          <option value="Electricity">Electricity</option>
        </select>
        <button className="add-button">Add Expenes</button>
      </form>
      <ExpenseDetails onDelete={handleExpenseDeletion} onEdit={handleExpenseEdit} expenses={expense} />
    </Fragment>
  );
};

export default Expenses;
