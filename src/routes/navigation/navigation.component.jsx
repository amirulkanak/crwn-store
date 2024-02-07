import { Fragment, useContext } from "react";
// Routes
import { Outlet, Link } from "react-router-dom";
// user context
import { UserContext } from "../../contexts/user.context";
// Sign out
import { signOutUser } from "../../utils/firebase/firebase.utils";
// Logo
import { ReactComponent as CrwnLogo } from "../../assets/crown-logo.svg";
// Styles
import "./navigation.styles.scss";

const Navigation = () => {
  // user context
  const { currentUser } = useContext(UserContext);

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
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
