import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import Spinner from "../UI/Spinner";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = ({ onRemoveCart }) => {
  const cartCxt = useContext(CartContext);
  const totalAmount = `$${cartCxt.totalAmount.toFixed(2)}`;
  const hasItem = cartCxt.items.length > 0;
  const [checkout, setCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const cartItemRemoveHandler = (id) => {
    cartCxt.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCxt.addItem({ ...item, amount: 1 });
  };
  const orderHandler = () => {
    setCheckout(true);
  };
  const orderConfirmHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://http-requests-app-9f745-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCxt.items,
        }),
      }
    );
    setIsSubmitting(false);
    setIsSubmitted(true);

    cartCxt.clearCart();
  };
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCxt.items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const cartModalContent = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkout && (
        <Checkout cancel={onRemoveCart} submit={orderConfirmHandler} />
      )}
      {/* Reneder only the form when order button checked! */}
      {!checkout && (
        <div className={styles.actions}>
          <button className={styles["button--alt"]} onClick={onRemoveCart}>
            Close
          </button>

          {/* Render the order button if the cart has items */}
          {hasItem && (
            <button className={styles.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  );
  const isSubmittingModalContent = (
    <>
      <p> Sending order data...</p>
      <Spinner />
    </>
  );
  const SubmittedModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={onRemoveCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal CartOnClick={onRemoveCart}>
      {!isSubmitting && !isSubmitted && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && isSubmitted && SubmittedModalContent}
    </Modal>
  );
};

export default Cart;
