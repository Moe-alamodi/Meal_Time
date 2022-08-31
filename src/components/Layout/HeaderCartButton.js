import React, { useContext, useEffect, useState } from "react";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = ({ onClick }) => {
  const [btnIsPumped, setBtnIsPumped] = useState(false);
  const carCtx = useContext(CartContext);
  const { items } = carCtx;

  const numberOfCartItems = carCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${styles.button} ${btnIsPumped ? styles.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) return;
    setBtnIsPumped(true);

    // Remove the bump class every 300 ms.
    const timer = setTimeout(() => {
      setBtnIsPumped(false);
    }, 300);
    console.log("remove class");

    // Clean-Up function
    return () => {
      console.log("clean-up");
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnClasses} onClick={onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span className={styles.text}>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
