import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
const MealItem = ({ meal }) => {
  const cartCxt = useContext(CartContext);
  const price = `$${meal.price}`;
  const addCartHandler = (amount) => {
    cartCxt.addItem({
      id: meal.id,
      name: meal.name,
      amount: amount,
      price: meal.price,
    });
  };
  return (
    <li className={styles.meal}>
      <div>
        <h3>{meal.name}</h3>
        <div className={styles.description}>{meal.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div className={styles["meal-form"]}>
        <MealItemForm id={meal.id} onAddToCart={addCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
