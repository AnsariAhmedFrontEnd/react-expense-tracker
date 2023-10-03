import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { expenseActions } from "../store/expenseReducer";
import "./Premium.css";

const Premium = () => {
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.expnese.totalExpense);

  const isPremium = useSelector((state) => state.expnese.isPremium);

  const activatePremiumHandler = () => {
    dispatch(expenseActions.activatePremium());
  };

  return (
    <Fragment>
      <div className="premium">
        <h2>Total Expenses</h2>
        <div className="amount">Rs. {totalAmount}</div>
        {totalAmount > 10000 && (
          <button className="premium-button" onClick={activatePremiumHandler}>
            {isPremium ? "Premium Activated" : "Activate Premium"}
          </button>
        )}
      </div>
    </Fragment>
  );
};

export default Premium;
