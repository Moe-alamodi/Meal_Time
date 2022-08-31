import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";
const MealItemForm = ({ id, onAddToCart }) => {
  const [amoutIsValid, setAmoutIsValid] = useState(true);
  const amountInputRef = useRef();
  const sumithandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount; // + converts the entered amout from string to number
    // Validate the input
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      return setAmoutIsValid(false);
    }
    onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={styles.form} onSubmit={sumithandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + id,
          min: "1",
          max: "5",
          step: "1",
          type: "number",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
      {!amoutIsValid && <p>Please enter an amount between 1 and 5</p>}
    </form>
  );
};

export default MealItemForm;
