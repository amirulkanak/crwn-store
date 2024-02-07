import { Fragment, useContext } from "react";
// Routes
import { Outlet, Link } from "react-router-dom";
// user context
import { UserContext } from "../../contexts/user.context";
// Cart Context
import { CartContext } from "../../contexts/cart.context";
// Sign out
import { signOutUser } from "../../utils/firebase/firebase.utils";
// Logo
import { ReactComponent as CrwnLogo } from "../../assets/crown-logo.svg";
// Cart Icon
import CartIcon from "../../components/cart-icon/cart-icon.component";
// Cart DropDown
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
// Styles
import "./navigation.styles.scss";

const Navigation = () => {
  // user context
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {/* Sign in/out toggle based on user context */}
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
