import { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import { expenseActions } from "../store/expenseReducer";
import { useDispatch, useSelector } from "react-redux";

import "./Modal.css";
import axios from "axios";
import { useFetchExpenses } from "./fetchExpense";

const Backdrop = () => {
  const dispatch = useDispatch();
  const closeModalHandler = () => {
    dispatch(expenseActions.closeModal());
  };
  return <div className="backdrop" onClick={closeModalHandler} />;
};

const ModalOverlay = () => {
  const expenseToEdit = useSelector((state) => state.expnese.expenseToEdit);
  const uesrEmail = useSelector((state) => state.auth.email);
  const fetchExpenses = useFetchExpenses();


  const [amount, setAmount] = useState(expenseToEdit.amount || "");
  const [description, setDescription] = useState(
    expenseToEdit.description || ""
  );
  const [date, setDate] = useState(expenseToEdit.date || "");

  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(expenseActions.closeModal());
  };

  const amountChangeHandler = (event) => {
    setAmount(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setDate(event.target.value);
  };

const updateExpenseDateHandler = async (event) => {
    event.preventDefault();
    const ExpenesData = {
        amount: +amount,
        description,
        date
    };
   

    const expenesId = expenseToEdit.id;
    const sanitizedEmail = uesrEmail.replace(/[.@]/g, "_");
    const url = `https://expense-tracker-35591-default-rtdb.firebaseio.com/${sanitizedEmail}/${expenesId}.json`;

    try {
      await axios.put(url, ExpenesData);
      fetchExpenses(uesrEmail);
    } catch (error) {
      console.log(error);
    }
    setAmount('');
    setDescription('');
    setDate('');

    dispatch(expenseActions.closeModal());

};
  return (
    <div className="modal">
      <h2>Edit Expense</h2>
      <form onSubmit={updateExpenseDateHandler}>
        <div className="input-field">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={descriptionChangeHandler}
          />
        </div>
        <div className="input-field">
          <input type="date" value={date} onChange={dateChangeHandler} />
        </div>
        <div className="button-container">
          <button className="save-button" type="submit">Save</button>
          <button className="cancel-button" onClick={closeModalHandler}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const portalElement = document.getElementById("modal-root");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay></ModalOverlay>, portalElement)}
    </Fragment>
  );
};

export default Modal;
