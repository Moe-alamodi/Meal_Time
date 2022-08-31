import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import CartProvider from "./store/CartProvider";

function App() {
  const [CartIsOn, setCartIsOn] = useState(false);
  const removeCart = () => {
    setCartIsOn(false);
  };
  const DisplayCart = () => {
    console.log("cart button pressed");
    setCartIsOn(true);
  };
  return (
    <CartProvider>
      {CartIsOn && <Cart onRemoveCart={removeCart} />}
      <Header onDisplaycart={DisplayCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
