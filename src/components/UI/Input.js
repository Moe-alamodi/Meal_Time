import React from "react";
import styles from "./Input.module.css";

const Input = React.forwardRef(({ label, input }, ref) => {
  return (
    <div className={styles.input}>
      <label htmlFor={label}>{label}</label>
      <input ref={ref} {...input} />
    </div>
  );
});

export default Input;
