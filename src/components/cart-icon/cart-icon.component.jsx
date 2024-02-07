import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

// Styles
import "./cart-icon.styles.scss";
// Shopping cart icon
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag-icon.svg";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
  const toggleIscartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container" onClick={toggleIscartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};

export default CartIcon;
