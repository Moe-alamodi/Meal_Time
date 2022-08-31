import React from "react";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = ({ onDisplaycart }) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <a href="/" className={styles.logo}>
          <img src="/meals-logo.png" alt="logo" />
        </a>
        <HeaderCartButton onClick={onDisplaycart} />
      </header>
      <div className={styles["main-image"]}>
        <img src="/meals.jpg" alt="meals" />
      </div>
    </React.Fragment>
  );
};

export default Header;
