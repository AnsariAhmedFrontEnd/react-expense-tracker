const ExpenseDetails = (props) => {
    const expenseList = props.expenses.map((expense) => {
        return(
            <div key={expense.id}>
                <div>{expense.amount}</div>
                <div>{expense.description}</div>
                <div>{expense.category}</div>
            </div>
        )
    });

    return(
        <div>
            {expenseList}
        </div>
    )
};

export default ExpenseDetails;