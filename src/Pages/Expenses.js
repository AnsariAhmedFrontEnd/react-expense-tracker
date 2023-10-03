import { useState, Fragment, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Toggle from "../components/Toggle";
import ExpenseDetails from "../components/ExpenseDetails";
import { useFetchExpenses } from "../components/fetchExpense";
import "./Expenses.css";
import Premium from "../components/Premium";

const Expenses = () => {
  const isPremium = useSelector((state) => state.expnese.isPremium);
  const expenseArray = useSelector((state) => state.expnese.expensesArray);
  const uesrEmail = useSelector((state) => state.auth.email);
  const fetchExpenses = useFetchExpenses();

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const addExpenesHandler = async (event) => {
    event.preventDefault();

    const amountData = {
      amount: +amount,
      description,
      date,
    };

    const sanitizedEmail = uesrEmail.replace(/[.@]/g, "_");
    const url = `https://expense-tracker-35591-default-rtdb.firebaseio.com/${sanitizedEmail}.json`;

    try {
      await axios.post(url, amountData);
      fetchExpenses(uesrEmail);
    } catch (error) {
      console.log(error);
    }

    setAmount("");
    setDate("");
    setDescription("");
    fetchExpenses(uesrEmail);
  };

 
  const downloadFileHandler = () => {
    const csvData = generateCSV(expenseArray);

    const blob = new Blob([csvData], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "expenses.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const generateCSV = (data) => {
    const header = ["Date", "Description", "Amount"];

    const csvRows = data.map((item) => {
      const rowData = [
        item.date,

        `"${item.description.replace(/"/g, '""')}"`,

        item.amount,
      ];
      return rowData.join(",");
    });

    const csvContent = [header.join(","), ...csvRows].join("\n");

    return csvContent;
  };


  useEffect(() => {
    fetchExpenses(uesrEmail);
  }, [fetchExpenses, uesrEmail])

  return (
    <Fragment>
       {isPremium && <Toggle />}
      <button className="download-button" onClick={downloadFileHandler}>
        Downlaod Expenses
      </button>
      <div className="expense-container">
      <div>
     
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
        <input
          type="date"
          className="expense-category"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        ></input>
        <button className="add-button">Add Expenes</button>
      </form>
      
      <ExpenseDetails />
      </div>
      <div className="premium-left"><Premium /></div>
      </div>
      
      
    </Fragment>
  );
};

export default Expenses;
